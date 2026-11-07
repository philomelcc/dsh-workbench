/**
 * 迅雷下载 worker：在独立子进程里加载 native dll，避免 dll 崩溃带走 DSH Host。
 *
 * 用法：由插件 spawn，环境变量传参：
 *   XL_APP_ID      控制台应用 ID
 *   XL_API_KEY     开发者 API Key（demo 阶段可内置）
 *   XL_CFG_DIR     SDK 配置/任务目录（必须存在可写）
 *   XL_URL         下载地址
 *   XL_SAVE_PATH   保存目录
 *   XL_SAVE_NAME   保存文件名
 *
 * stdout 每行一个 JSON：
 *   {"type":"init","code":0}
 *   {"type":"login","code":0}
 *   {"type":"started","taskId":"..."}
 *   {"type":"state","stateCode":2,"downloaded":1,"total":2,"speed":3,"tokenError":0}
 *   {"type":"done","stateCode":8}
 *   {"type":"failed","code":123,"detail":"..."}
 */
import dlsdk from "@xunlei-open/dlsdk";

// @xunlei-open/dlsdk 是 CJS 包，ESM 下只能走 default 再解构。
const {
  XLDownloadAPI,
  ERROR_SUCCESS,
  ERROR_ALREADY_INIT,
  TASK_STATUS_SUCCEEDED,
  TASK_STATUS_FAILED,
} = dlsdk;

function send(payload) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

function env(name) {
  const value = process.env[name];
  return value === undefined ? "" : value;
}

const appId = env("XL_APP_ID");
const apiKey = env("XL_API_KEY");
const cfgDir = env("XL_CFG_DIR");
const url = env("XL_URL");
const savePath = env("XL_SAVE_PATH");
const saveName = env("XL_SAVE_NAME");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const sdk = new XLDownloadAPI();

  const initCode = sdk.init({
    appId,
    appVersion: "1.0.0",
    configPath: cfgDir,
    saveTasks: true,
  });
  send({ type: "init", code: initCode });
  if (initCode !== ERROR_SUCCESS && initCode !== ERROR_ALREADY_INIT) {
    send({ type: "failed", code: initCode, detail: "init failed" });
    return 2;
  }

  const tokenResult = await sdk.getLoginToken(apiKey);
  if (tokenResult.code !== 0 || !tokenResult.token) {
    send({
      type: "failed",
      code: tokenResult.code,
      detail: `getLoginToken failed: ${tokenResult.message}`,
    });
    sdk.uninit();
    return 3;
  }
  const login = sdk.login(tokenResult.token);
  send({ type: "login", code: login.result });
  if (login.result !== ERROR_SUCCESS) {
    send({ type: "failed", code: login.result, detail: "login failed" });
    sdk.uninit();
    return 4;
  }

  const task = sdk.createP2spTask({ url, savePath, saveName });
  if (task.result !== ERROR_SUCCESS) {
    send({ type: "failed", code: task.result, detail: "createP2spTask failed" });
    sdk.uninit();
    return 5;
  }
  const started = sdk.startTask(task.taskId);
  send({ type: "started", code: started, taskId: String(task.taskId) });
  if (started !== ERROR_SUCCESS) {
    send({ type: "failed", code: started, detail: "startTask failed" });
    sdk.uninit();
    return 6;
  }

  // 轮询：每秒一次，直到成功/失败/被父进程杀掉。
  for (;;) {
    const snapshot = sdk.getTaskState(task.taskId);
    if (snapshot.result !== ERROR_SUCCESS) {
      send({ type: "failed", code: snapshot.result, detail: "getTaskState failed" });
      break;
    }
    const s = snapshot.state;
    const total = Number(s.totalSize);
    // stateCode 4 = 连接中，此时还不知道文件大小，别发 0B/0B 的空进度。
    if (s.stateCode === 4 || total === 0) {
      send({ type: "connecting" });
      await sleep(500);
      continue;
    }
    send({
      type: "state",
      stateCode: s.stateCode,
      downloaded: Number(s.downloadedSize),
      total,
      speed: Number(s.speed),
      tokenError: s.taskTokenError,
    });
    if (s.stateCode === TASK_STATUS_SUCCEEDED) {
      send({ type: "done", stateCode: s.stateCode });
      break;
    }
    if (s.stateCode === TASK_STATUS_FAILED) {
      send({ type: "failed", code: s.taskErrorCode, detail: "task failed" });
      break;
    }
    await sleep(1000);
  }

  sdk.uninit();
  return 0;
}

main()
  .then((code) => process.exit(code ?? 0))
  .catch((error) => {
    send({ type: "failed", code: -1, detail: error instanceof Error ? error.message : String(error) });
    process.exit(1);
  });
