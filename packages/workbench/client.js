window.__ModuleLoader__.load({
  id: '@philomelcc/dsh-workbench',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    // 大肥鱼剪影（半身）：形象来自 ZipPipe 的「大肥鱼」，CC BY-NC-SA 4.0，非商业用途。
var GHOST_PATHS = ["M298 2 L280 13 L269 24 L252 50 L248 61 L247 73 L249 79 L254 85 L259 87 L267 86 L267 83 L261 82 L256 77 L256 58 L264 38 L282 20 L303 11 L320 10 L333 15 L343 25 L340 28 L336 28 L324 36 L314 40 L304 52 L297 55 L293 64 L290 65 L280 76 L277 86 L277 93 L269 102 L267 109 L267 127 L264 132 L268 159 L262 173 L261 183 L259 187 L251 193 L259 196 L263 213 L249 234 L237 246 L222 257 L222 262 L227 264 L245 262 L250 259 L263 259 L267 263 L253 282 L232 303 L200 317 L190 317 L178 314 L154 302 L159 309 L178 321 L178 323 L165 330 L157 338 L154 348 L135 365 L124 362 L119 356 L113 357 L110 351 L106 351 L96 340 L94 334 L94 318 L99 307 L102 305 L99 304 L91 315 L89 329 L91 339 L96 350 L104 360 L104 364 L102 366 L75 367 L62 371 L49 378 L39 388 L34 398 L34 407 L36 411 L49 419 L52 430 L62 445 L36 464 L21 482 L13 495 L5 516 L6 540 L16 552 L22 555 L31 555 L36 553 L41 548 L41 544 L35 548 L24 547 L14 538 L11 530 L13 513 L20 499 L25 493 L28 492 L31 494 L34 501 L44 512 L44 514 L56 525 L57 542 L62 555 L68 564 L80 571 L97 573 L100 576 L96 583 L80 590 L65 590 L58 587 L58 589 L65 592 L81 593 L95 590 L103 585 L106 587 L110 596 L111 606 L110 609 L102 615 L101 619 L104 622 L109 622 L112 627 L107 634 L97 636 L87 632 L83 628 L81 620 L79 620 L78 624 L84 637 L96 648 L92 652 L85 655 L70 656 L53 651 L45 641 L42 633 L41 624 L44 613 L50 606 L60 605 L61 603 L57 600 L46 600 L33 608 L28 617 L27 633 L25 635 L18 634 L15 631 L19 617 L23 612 L22 610 L18 611 L7 624 L5 631 L5 660 L10 671 L18 681 L17 685 L10 692 L8 697 L8 705 L13 717 L20 726 L31 732 L44 734 L50 737 L62 737 L72 734 L75 738 L15 856 L2 885 L2 892 L5 899 L613 899 L592 792 L592 782 L597 767 L597 755 L594 752 L591 734 L594 729 L596 719 L596 710 L592 702 L595 690 L595 676 L592 666 L587 660 L587 638 L584 630 L572 619 L571 599 L566 589 L566 585 L579 571 L589 551 L586 547 L577 549 L569 548 L566 545 L559 543 L555 538 L563 527 L576 522 L589 512 L597 501 L600 494 L601 483 L603 481 L607 482 L613 489 L616 506 L612 517 L604 524 L598 524 L597 527 L610 527 L618 520 L623 510 L621 490 L613 473 L597 451 L597 444 L603 439 L617 440 L626 432 L634 430 L640 422 L652 417 L655 398 L654 387 L649 381 L650 375 L669 369 L674 369 L683 362 L686 356 L695 348 L727 335 L731 335 L735 332 L735 330 L732 327 L718 325 L716 323 L723 310 L720 306 L710 309 L695 327 L691 324 L681 301 L668 302 L650 319 L632 330 L623 339 L619 346 L605 346 L597 360 L593 373 L586 379 L583 377 L579 370 L563 353 L563 349 L574 343 L581 334 L581 324 L579 319 L571 309 L554 294 L547 275 L518 233 L512 217 L519 212 L529 212 L534 209 L549 210 L557 206 L568 206 L577 202 L576 196 L562 191 L544 181 L516 157 L516 134 L513 128 L502 129 L498 125 L492 108 L484 97 L482 91 L472 80 L469 71 L458 63 L458 60 L453 52 L444 47 L437 47 L433 39 L428 34 L412 27 L406 28 L403 31 L396 28 L391 28 L384 20 L372 20 L366 23 L360 22 L352 27 L349 24 L348 18 L343 10 L330 2 L324 0 L306 0 L303 2 Z", "M798 695 L793 695 L785 710 L764 732 L723 755 L712 766 L707 778 L703 781 L699 777 L694 765 L685 755 L673 747 L640 736 L626 725 L618 708 L613 708 L611 710 L609 720 L610 751 L615 771 L623 788 L631 800 L647 816 L677 837 L686 849 L686 868 L673 899 L715 899 L715 857 L719 848 L729 837 L764 813 L783 791 L791 776 L799 750 L801 737 L801 705 Z", "M18 692 L22 688 L27 688 L44 695 L81 695 L93 692 L96 695 L96 698 L91 707 L82 716 L70 724 L54 729 L40 729 L28 719 L21 709 L18 702 Z", "M50 388 L52 393 L49 398 L48 410 L44 414 L39 408 L39 400 L44 391 Z"];
    var GHOST_VIEWBOX = "0 0 802 900";

    // ══════════ 推理档位滑条（移植自 dsh-codex-effort-slider）══════════
    // 上游：https://github.com/Microqian2th/dsh-codex-effort-slider
    // MIT License, Copyright (c) Microqian2th —— 原样保留其协议与署名。
    // 仅做接线改造：由工作台的功能开关控制挂载，apply 返回可卸载的 disposable。
    function createEffortSliderModule(require) {
var module = { exports: {} };
    var exports = module.exports;

    var React = require("react");
    var ReactDOM = require("react-dom");

    var PACKAGE_ID = "dsh-codex-effort-slider";
    /** 仍然注册一个（不可见的）插槽条目：它是**每会话**拿到 sessionId 与 ctx 的立足点。 */
    var SLOT_NAME = "conversation.input.right";
    var ENTRY_ID = "codex-effort-slider";
    var ENTRY_ORDER = 40;
    /** 「加高那一栏的上下距离」。 */
    var ROW_PADDING_BLOCK = "10px";
    /** 官方那一行的中文/英文文案（形状锚点之一；认不出就按官方固定顺序取第 2 个 menuitem）。 */
    var EFFORT_ROW_LABELS = ["推理等级", "Effort"];
    /** 拖动期间的写回降频窗口（毫秒）。松手一律立即落地。 */
    var COMMIT_THROTTLE_MS = 120;
    /** 提交后等宿主真实回报的上限；超时回滚并提示，不继续假装已生效。 */
    var COMMIT_DEADLINE_MS = 10000;
    /** 目录解析失败时的退避重试序列（毫秒，累计约 9 秒）。 */
    var RETRY_DELAYS = [60, 240, 540, 960, 1500, 3000, 3000];
    var STYLE_MARKER = PACKAGE_ID;

    /* ── 尺寸与速率常量：**必须声明在 CSS 数组之前**，因为样式表要插值它们 ──
       （踩过一次：CSS 数组先于常量求值，样式里写进去的是 `height:undefinedpx`，
       真机上轨道会塌成 0 高。测试里对轨道高/旋钮直径的断言就是为这个加的。） */
    /** 轨道高度（px）。旋钮直径与它相同 —— 一个"管子里的球"，圆永远是完整的圆。 */
    var TRACK_HEIGHT = 28;
    var KNOB_SIZE = TRACK_HEIGHT;
    /** 旋钮半径。圆心在两端各留出这个半径，圆圈才不会顶出轨道被菜单裁掉。 */
    var KNOB_RADIUS = KNOB_SIZE / 2;
    /** 全局速率倍数（用户要求：所有速度 ×4）。粒子时长 = 基准时长 ÷ (本值 × speedFor)。 */
    var BASE_SPEEDUP = 4;
    /**
     * 星空的**基准横穿时长**（秒，越大越慢）与各星时长浮动（± 这个比例）。
     * 基准对应"位置速率最快的那一档"（speedFor 的上限 `MAX_SPEED_FACTOR = 2`）：MAX 档 1.5s，
     * high 档（1×）3s，左端（0.35×）约 8.6s —— 速度随位置变化这条一直保留。
     * 浮动压到 ±8%（速度差 1.16×）：原来用 0.95~2.05s（速度差 2.16×）时快星会追上慢星成团。
     */
    var STARFIELD_DURATION_MEAN = 1.5;
    var STARFIELD_DURATION_SPREAD = 0.08;
    /** MAX 档星空的亮度/大小下限（1 = 现在的大小与亮度，即上限）。 */
    var STARFIELD_MIN = 0.5;
    /** 黄金比：把 22 颗星的高度与相位按低差异序列铺开（见 buildParticles / starDelayFor）。 */
    var GOLDEN_RATIO = 0.6180339887498949;
    /** 位置速率的上限（= speedFor 的封顶值），用来把"最快那一档"和基准时长对齐。 */
    var MAX_SPEED_FACTOR = 2;
    /** 系统开启「减少动态效果」时，星星时长乘这个倍数（放缓而不是冻住）。 */
    var REDUCED_MOTION_SLOWDOWN = 2.6;
    /** 相位相邻的两颗星，高度至少差这么多"槽"（1 槽 = 4% 轨道高）——防止并成一坨。 */
    var MIN_HEIGHT_SLOTS = 3;
    /** 能量段起点：第二档的刻度位置（4 档模型 → 1/3）。这一段以前是纯蓝，之后才渐入紫色。 */
    var ENERGY_START = 1 / 3;
    /** 颜色锚点：紫出现在这里（4 档模型 → high 档）。 */
    var ENERGY_END = 2 / 3;

    /** 蓝 → 紫 → 深紫（"第一档到第二档为蓝色，再往右逐渐变紫变深"）。 */
    var COLOR_BLUE = [77, 147, 248];
    var COLOR_VIOLET = [147, 51, 234];
    var COLOR_DEEP = [76, 29, 149];
    /**
     * 数值文字（"Max"）用的亮紫终点。
     * 文字不能像填充那样收到深紫（`COLOR_DEEP` 在深色底上几乎看不见），所以另给一个亮端；
     * 但也不能太亮 —— 实测 `#c084fc` 在**浅色主题**下对比度只有 2.6:1（发虚），
     * 所以取中档紫罗兰 `#8b5cf6`：对白底 ≈4.2:1、对深色底（#1b1c20）≈4.0:1，两种主题都读得清。
     */
    var COLOR_TEXT_VIOLET = [139, 92, 246];

    /* ════════════════════════════ 样式 ════════════════════════════ */

    /*
     * 颜色一律走 DSH 自己的设计令牌（`--dsw-*`），浅色/深色自动跟随。
     * 蓝色强调色用 `--dsw-alias-state-business-primary`（深色下 = deepseek-400 #7aaaff），
     * 回退到 blue-450 #4d93f8 —— 也就是参考图里那条轨道的蓝。
     */
    var FILL_RADIUS = "border-radius:" + KNOB_RADIUS + "px 0 0 " + KNOB_RADIUS + "px";
    var CSS = [
      /* 注入进官方那一行的容器：折行到第二行并铺满整行 */
      ".ces-inline{--ces-accent:var(--dsw-alias-state-business-primary,var(--dsw-static-blue-450,#4d93f8));box-sizing:border-box;flex-basis:100%;width:100%;min-width:0}",
      ".ces-track{position:relative;box-sizing:border-box;height:" + TRACK_HEIGHT + "px;margin-top:2px;border-radius:999px;background:var(--dsw-alias-border-l1,rgba(15,17,21,.08));cursor:pointer;touch-action:none;user-select:none;-webkit-user-select:none}",
      ".ces-track:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--ces-accent));outline-offset:2px}",
      ".ces-fill{position:absolute;top:0;bottom:0;left:0;" + FILL_RADIUS + ";pointer-events:none}",
      ".ces-tick{position:absolute;top:50%;width:3px;height:3px;margin:-1.5px 0 0 -1.5px;border-radius:50%;background:rgba(128,128,128,.30);background:color-mix(in srgb,var(--dsw-alias-label-primary,#0f1115) 26%,transparent);pointer-events:none}",
      ".ces-tick[data-on='1']{background:rgba(255,255,255,.5)}",
      /* 旋钮直径 = 轨道高度（"与滑条同宽"）：圆完整地填满管口，不会出现被裁出的平边。 */
      ".ces-knob{position:absolute;top:50%;width:" + KNOB_SIZE + "px;height:" + KNOB_SIZE + "px;margin:" + (-KNOB_RADIUS) + "px 0 0 " + (-KNOB_RADIUS) + "px;border-radius:50%;background:#fff;box-shadow:0 1px 5px rgba(0,0,0,.34),0 0 0 .5px rgba(0,0,0,.06);pointer-events:none}",
      ".ces-error{margin-top:6px;font-size:11px;line-height:16px;color:var(--dsw-alias-state-error-primary,#e5484d)}",
      /* ── 最高档能量层（纯视觉：紫色星云 + 星尘粒子 + 扫光）─────────────────
         强度由 `--ces-energy`(0..1) 一个变量驱动：外层只做 opacity/box-shadow，
         所以"渐入"是浏览器合成的颜色插值，不需要 JS 逐帧改样式。
         关掉时把粒子动画 `animation-play-state: paused`，不让 22 个隐形元素白烧 GPU。 */
      ".ces-inline[data-energy='1'] .ces-track{box-shadow:0 0 calc(var(--ces-energy,0) * 16px) rgba(168,85,247,.5)}",
      ".ces-inline[data-energy='0'] .ces-star,.ces-inline[data-energy='0'] .ces-energy__sweep{animation-play-state:paused}",
      /* 能量层只覆盖**已填充那一段**（宽度与填充相同）：档位右边没到的部分不显示能量条。
         左端从 0 起、宽度由内联样式给（= 到旋钮圆心），所以它跟着旋钮一起长。 */
      ".ces-energy{position:absolute;top:0;bottom:0;left:0;" + FILL_RADIUS + ";overflow:hidden;pointer-events:none;opacity:var(--ces-energy,0);transition:opacity .2s ease;background:linear-gradient(90deg,#3b1178 0%,#6d28d9 30%,#9333ea 62%,#c084fc 100%)}",
      /* 星星单独一层：**不跟着星云淡入**（否则 high 档会被星云的 0.5 透明度压得看不见）。
         几何与星云层相同（贴着已填充段、圆角裁切），透明度由内联样式给。 */
      ".ces-stars{position:absolute;top:0;bottom:0;left:0;" + FILL_RADIUS + ";overflow:hidden;pointer-events:none;transition:opacity .2s ease}",
      /* 星空（**所有出现粒子的档位都用这一套**）：外层是**整轨宽度**的轨道
         （它自己在做 -100% 的连续横穿），内层圆点的亮度/大小由 --ces-b 决定（越亮越大）。
         残影只在两端淡出，而那两端在可视区外，所以看起来粒子"从不消失"。

         ⚠️ 时长与相位**直接内联**写在元素上（见组件的 animationDuration / animationDelay），
         不走 CSS 变量：实测把 `animation-delay:var(--ces-delay)` 写在样式表里时，
         真宿主里负相位不生效 —— 结果是"一打开所有星星挤在起点，十几秒后才靠速度差散开"。
         `--ces-b`（亮度/大小）只是不参与动画计时的普通变量，留着没问题。 */
      ".ces-star{position:absolute;left:0;right:0;height:3px;margin-top:-1.5px;pointer-events:none;animation-name:ces-star-sweep;animation-timing-function:linear;animation-iteration-count:infinite}",
      ".ces-star__dot{position:absolute;left:100%;top:0;width:3px;height:3px;margin-left:-1.5px;border-radius:50%;background:#fff;box-shadow:0 0 4px rgba(255,255,255,.85);opacity:var(--ces-b,1);transform:scale(var(--ces-b,1))}",
      "@keyframes ces-star-sweep{0%{transform:translate3d(0,0,0);opacity:0}6%{opacity:1}94%{opacity:1}100%{transform:translate3d(-100%,0,0);opacity:0}}",
      ".ces-energy__sweep{position:absolute;inset:0;background:linear-gradient(100deg,transparent 18%,rgba(255,255,255,.30) 50%,transparent 82%);transform:translateX(100%);animation:ces-sweep var(--ces-sweep-dur, 2.4s) linear infinite}",
      "@keyframes ces-sweep{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}",
      "body[data-ds-dark-theme] .ces-star__dot{background:#f5f3ff;box-shadow:0 0 5px rgba(216,180,254,.95)}",
      /* 系统要求「减少动态效果」时**放缓**而不是冻住：收起扫光。
         星星的放缓在 JS 里算（时长 × REDUCED_MOTION_SLOWDOWN）—— 不走 CSS 媒体查询，
         因为时长现在是内联的，也免得再引入"变量参与动画计时"这类坑。 */
      "@media (prefers-reduced-motion: reduce){.ces-energy{transition:none}.ces-energy__sweep{display:none}}",
      /* 设置面板（挂在 body 上，样式必须是全局的） */
      ".ces-set{position:fixed;z-index:2147483000;min-width:252px;max-width:340px;padding:10px 12px;border-radius:10px;box-sizing:border-box;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-pri,#1b1c20);border:1px solid rgba(127,127,127,.28);box-shadow:0 12px 32px rgba(0,0,0,.24);font:13px/1.5 system-ui,-apple-system,'Segoe UI',sans-serif}",
      ".ces-set__title{font-weight:600;margin:0 0 6px 0}",
      ".ces-set__row{font-size:12px;opacity:.72;margin-bottom:8px}",
      ".ces-set__group{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}",
      ".ces-set__group label{display:flex;gap:6px;align-items:center;cursor:pointer}",
      ".ces-set__actions{display:flex;justify-content:space-between;gap:8px}",
      ".ces-set button{cursor:pointer;font:inherit;color:inherit;padding:4px 10px;border-radius:6px;border:1px solid rgba(127,127,127,.35);background:transparent}",
      ".ces-set button:hover{background:rgba(127,127,127,.14)}",
      "body[data-ds-dark-theme] .ces-set{background:var(--dsw-alias-bg-base,#24262c);color:var(--dsw-alias-label-pri,#e8e9ec)}",
      /* 「已到达档位的刻度点」：dim = 与未到达同色；hidden = 隐藏 */
      ".ces-inline[data-reached-ticks='dim'] .ces-tick[data-on='1']{background:rgba(128,128,128,.30);background:color-mix(in srgb,var(--dsw-alias-label-primary,#0f1115) 26%,transparent)}",
      ".ces-inline[data-reached-ticks='hidden'] .ces-tick[data-on='1']{display:none}",
    ].join("\n");

    /** 把样式挂进文档。加载器会把它认领为「本插件产出的 style」（HMR 卸载时一并清理）。 */
    // 大肥鱼剪影（半身）：形象来自 ZipPipe 的「大肥鱼」，CC BY-NC-SA 4.0，非商业用途。
    // 矢量为作者原图（B站 1152x2048 透明底立绘）轮廓提取，随主题染色。
    CSS = CSS + "\n" + [
      '[data-ces-part="track"]{position:relative;overflow:visible}',
      '.ces-ghost{position:fixed;transform:translate(-50%,-50%);pointer-events:none;opacity:0}',
      '.ces-ghost svg{width:100%;height:100%;display:block;fill:var(--ces-ghost-color,#cfe3ff);fill-rule:evenodd}',
      '.ces-ghost[data-on="1"]{animation:ces-ghost-flash 380ms cubic-bezier(.18,.62,.24,1) both}',
      '@keyframes ces-ghost-flash{0%{opacity:0;transform:translate(-50%,-50%) scale(1.02)}18%{opacity:.30;transform:translate(-50%,-50%) scale(1.06)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.09)}}',
            '.ces-knob{transition:transform 90ms cubic-bezier(.2,.7,.3,1), box-shadow 120ms ease}',
      '.ces-track[data-dragging="1"] .ces-knob{transform:scale(.86);box-shadow:0 0 0 3px rgba(120,150,255,.28),0 2px 10px rgba(0,0,0,.45)}',
      '.ces-track[data-shake="1"] .ces-knob{animation:ces-knob-shake 70ms ease-in-out infinite}',
      '@keyframes ces-knob-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(calc(var(--ces-shake,0px) * -1))}75%{transform:translateX(var(--ces-shake,0px))}}',
      '.ces-spark{position:fixed;width:4px;height:4px;border-radius:50%;background:#cfe3ff;box-shadow:0 0 6px #9ec8ff;pointer-events:none;z-index:2147482998;animation:ces-spark 560ms ease-out forwards}',
      '@keyframes ces-spark{0%{transform:translate(-50%,-50%) scale(1);opacity:.95}100%{transform:translate(calc(-50% + var(--ces-dx,0px)), calc(-50% + var(--ces-dy,0px))) scale(.15);opacity:0}}',
      'body[data-wb-paper] .ces-spark{background:#8a6a45;box-shadow:0 0 6px #a8875c}',
      '.ces-dragging, .ces-dragging *{cursor:none !important}',
      '@keyframes ces-roll-up{0%{transform:translateY(0)}100%{transform:translateY(-105%)}}',
      '@keyframes ces-roll-in{0%{transform:translateY(105%)}100%{transform:translateY(0)}}',
      '.ces-roll-out{pointer-events:none;animation:ces-value-roll-out 240ms ease-in forwards}',
      '@keyframes ces-value-roll-out{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-11px);opacity:0}}',
      '.ces-roll{display:inline-block;animation:ces-value-roll 260ms cubic-bezier(.2,.7,.3,1)}',
      '@keyframes ces-value-roll{0%{transform:translateY(9px);opacity:0}45%{transform:translateY(0);opacity:1}100%{transform:translateY(0);opacity:1}}',
'body[data-wb-paper] .ces-ghost{--ces-ghost-color:#8a6a45}',].join("\n");

    function installStyles() {
      try {
        installSettingsUi();
        if (typeof document === "undefined" || !document.head) return null;
        var existing = document.querySelector('style[data-plugin-css="' + STYLE_MARKER + '"]');
        if (existing) return existing;
        var style = document.createElement("style");
        style.setAttribute("data-plugin-css", STYLE_MARKER);
        style.textContent = CSS;
        document.head.appendChild(style);
        return style;
      } catch (error) {
        /* 样式失败只影响观感，绝不影响功能 */
        return null;
      }
    }

    /* ════════════════ 设置（schema 驱动，加新设置只需加一行）════════════════ *
     *
     * 目标（用户明确要求）：
     *   1. 三种动画：「简洁动画」(quick)、「完整动画」(full)、「快速动画」(fast)
     *   2. **完全不受系统「减少动态效果」影响** —— 三种模式都由插件自己决定
     *   3. 简洁动画 = 我们之前的方案（MOTION_REDUCED 紧参数）
     *   4. 完整动画 = 作者原本的方案（MOTION 松参数）
     *   5. 快速动画 = 复刻 Codex 桌面版（不跟手 + 一档一格 + 约 70~85ms 吸附，见 MOTION_FAST）
     *
     * 设计要点：
     *   · 所有设置都在 SETTINGS_SCHEMA 里声明；面板按 schema 自动渲染/回填/校验
     *   · 加设置 = 加一行表项（若是新控件类型，再加一个 renderKind 分支）
     *
     * ⚠️ 这些函数会被预览生成器**原样抽取**到另一个作用域，所以模块级变量一律
     *    用 `typeof x === "undefined"` 兜底，绝不裸引用。
     */
    /** 诊断用：本模块被加载了几次、每个组件实例的编号（排查"两个实例互相搅乱拖动状态"）。 */
    var __cesInstanceSeq = 0;
    /** 本份模块加载的身份令牌（每次 load 一份新的）。 */
    var __cesOwnerToken = {};
    /** 本份加载是否"已判定过""是否是 owner"——只判定一次，保证实例的 Hook 数量恒定。 */
    var __cesDecided = false;
    var __cesIsOwner = false;

    /**
     * 档位列表的「抗瞬时为空」缓存（键 = 模型身份 `provider\0model`）。
     *
     * 为什么需要：宿主在**模型切换 / 目录刷新 / 模型版本更新**时会瞬时丢掉
     * `model.reasoning.efforts`。实测（2026-10-17，模型更新到 DeepSeek-V4.1-Flash-1017 之后）：
     *   松手那一刻 `levelCount` 变 0 → `release-abort` → 不写回 →
     *   显示交还旧档位 `eff` → 用户看到"点一下顿一下 / 跳一格"。
     * 档位列表是"同一模型的静态配置"，瞬时空一下不该改变用户意图，所以兜一份缓存。
     * 键不匹配（模型真的换了）就不复用缓存，避免拿旧模型的档位去写新模型。
     */
    var __levelsCache = { key: null, levels: [] };
    var __levelsCacheHit = false;
    var SETTINGS_KEY = "dsh-codex-effort-slider.settings";
    var SETTINGS_EVENT = "dsh-codex-effort-slider:settings";
    var SETTINGS_VERSION = 3;

    var SETTINGS_SCHEMA = [
      {
        key: "motion",
        kind: "radio",
        group: "动画效果",
        label: "动画效果",
        default: "full",
        options: [
          { value: "fast", label: "快速动画" },
          { value: "quick", label: "简洁动画" },
          { value: "full", label: "完整动画" },
        ],
      },
      {
        key: "reachedTicks",
        kind: "radio",
        group: "已到达档位的刻度点",
        label: "刻度点",
        default: "hidden",
        options: [
          { value: "highlight", label: "亮白显示" },
          { value: "dim", label: "与未到达同色" },
          { value: "hidden", label: "隐藏" },
        ],
      },
    ];

    function schemaDefaults() {
      var schema = (typeof SETTINGS_SCHEMA === "undefined") ? [] : SETTINGS_SCHEMA;
      var out = {};
      for (var i = 0; i < schema.length; i += 1) {
        var item = schema[i];
        if (item.default !== undefined) { out[item.key] = item.default; continue; }
        if (item.kind === "radio") out[item.key] = item.options[0].value;
        else if (item.kind === "switch") out[item.key] = true;
        else if (item.kind === "range") out[item.key] = (item.scale || 1);
        else out[item.key] = null;
      }
      return out;
    }

    /** schema 驱动的校验：非法/缺失值回退默认，永远返回完整设置。 */
    function normalizeSettings(raw) {
      var schema = (typeof SETTINGS_SCHEMA === "undefined") ? [] : SETTINGS_SCHEMA;
      var out = schemaDefaults();
      var source = (raw && typeof raw === "object") ? raw : {};
      for (var i = 0; i < schema.length; i += 1) {
        var item = schema[i];
        var value = source[item.key];
        if (value === undefined) continue;
        if (item.kind === "radio") {
          for (var j = 0; j < item.options.length; j += 1) {
            if (item.options[j].value === value) { out[item.key] = value; break; }
          }
        } else if (item.kind === "switch") {
          if (typeof value === "boolean") out[item.key] = value;
        } else if (item.kind === "range") {
          var n = typeof value === "number" ? value : parseFloat(value);
          var scale = item.scale || 1;
          if (isFinite(n)) {
            var lo = item.min / scale, hi = item.max / scale;
            out[item.key] = n < lo ? lo : (n > hi ? hi : n);
          }
        }
      }
      return out;
    }

    var settingsCache = null;
    var settingsUiState = {
      installed: false, panel: null, longPressTimer: null, longPressOrigin: null,
      anchorEl: null, cacheListenerInstalled: false,
    };

    function settingsKey() { return (typeof SETTINGS_KEY === "undefined") ? "dsh-codex-effort-slider.settings" : SETTINGS_KEY; }
    function settingsEventName() { return (typeof SETTINGS_EVENT === "undefined") ? "dsh-codex-effort-slider:settings" : SETTINGS_EVENT; }
    function cacheGet() { return (typeof settingsCache === "undefined") ? null : settingsCache; }
    function cacheSet(value) { if (typeof settingsCache !== "undefined") settingsCache = value; }

    function readSettings() {
      var cached = cacheGet();
      if (cached !== null) return cached;
      var raw = null;
      try {
        if (typeof localStorage !== "undefined" && localStorage) raw = localStorage.getItem(settingsKey());
      } catch (error) { /* 读不到用默认 */ }
      var parsed = null;
      try { parsed = raw ? JSON.parse(raw) : null; } catch (error) { parsed = null; }
      var expected = (typeof SETTINGS_VERSION === "undefined") ? 3 : SETTINGS_VERSION;
      // 版本不符 → **不丢弃值**，只按当前 schema 规范化（保留仍合法的项）并盖上版本号。
      var out = normalizeSettings(parsed);
      out.v = expected;
      if (parsed && typeof parsed === "object" && parsed.v !== expected) {
        try {
          if (typeof localStorage !== "undefined" && localStorage) localStorage.setItem(settingsKey(), JSON.stringify(out));
        } catch (error) { /* 写盘失败也无妨：值已保住 */ }
      }
      cacheSet(out);
      return out;
    }

    function writeSettings(patch) {
      var cur = readSettings();
      var merged = {};
      for (var k in cur) if (Object.prototype.hasOwnProperty.call(cur, k)) merged[k] = cur[k];
      if (patch && typeof patch === "object") {
        for (var k2 in patch) if (Object.prototype.hasOwnProperty.call(patch, k2)) merged[k2] = patch[k2];
      }
      var next = normalizeSettings(merged);
      next.v = (typeof SETTINGS_VERSION === "undefined") ? 3 : SETTINGS_VERSION;
      cacheSet(next);
      try {
        if (typeof localStorage !== "undefined" && localStorage) localStorage.setItem(settingsKey(), JSON.stringify(next));
      } catch (error) { /* 存不下只影响"下次还记不记得" */ }
      try {
        if (typeof window !== "undefined" && typeof window.dispatchEvent === "function" && typeof CustomEvent === "function") {
          window.dispatchEvent(new CustomEvent(settingsEventName()));
        }
      } catch (error) { /* 广播失败无妨 */ }
      return next;
    }

    /** 当前动画模式：'quick' 简洁 / 'full' 完整 / 'fast' 快速（Codex 手感）。**与系统设置无关**。 */
    function motionMode() {
      var mode = readSettings().motion;
      return mode === "quick" || mode === "fast" ? mode : "full";
    }

    /** 当前模式对应的运动参数组（不读取任何系统偏好）。 */
    function motionParamsForMode() {
      var mode = motionMode();
      if (mode === "quick") return MOTION_REDUCED;
      if (mode === "fast") return MOTION_FAST;
      return MOTION;
    }

    /** 系统是否要求「减少动态效果」——**仅用于面板提示**，不影响任何行为。 */
    function systemReducedMotion() {
      try {
        return typeof window !== "undefined" && typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches === true;
      } catch (error) { return false; }
    }

    /* ───────────── 诊断记录（排查"松手抽搐"这类真机时序问题）───────────── *
     * 推理到极限时的办法：把每一帧的"显示值 / 已生效档位 / 草稿"记下来，
     * 复现后一键复制，就能直接看到**到底是哪一帧、哪个值跳了**。
     */
    var traceBuf = [];
    function tracePush(entry) {
      try {
        traceBuf.push(entry);
        if (traceBuf.length > 400) traceBuf.splice(0, traceBuf.length - 400);
      } catch (error) { /* 诊断失败绝不影响功能 */ }
    }
    function traceClear() {
      try { traceBuf.length = 0; } catch (error) { /* 忽略 */ }
    }
    /** 生成可直接粘贴的诊断文本：突出"单帧跳变"与"松手事件"。 */
    function dumpTrace() {
      try {
        var buf = traceBuf.slice();
        if (buf.length === 0) return "（还没有记录：请先在滑条上拖动/松手几次，再点这里）";
        var samples = buf.filter(function (e) { return e && e.k === "s"; });
        var jumps = [];
        for (var i = 1; i < samples.length; i += 1) {
          var d = Math.abs((samples[i].shown || 0) - (samples[i - 1].shown || 0));
          if (d > 0.02) jumps.push({ at: i, d: Math.round(d * 1000) / 10, from: samples[i - 1], to: samples[i] });
        }
        jumps.sort(function (a, b) { return b.d - a.d; });
        var lines = [];
        lines.push("=== 滑条诊断 " + new Date().toISOString() + " ===");
        lines.push("记录 " + buf.length + " 条（采样 " + samples.length + "）");
        lines.push("动画模式 = " + readSettings().motion + " ; 系统减少动态 = " + systemReducedMotion());
        lines.push("单帧跳变(>2%) 次数: " + jumps.length);
        for (var j = 0; j < Math.min(8, jumps.length); j += 1) {
          var x = jumps[j];
          lines.push("  跳 " + x.d + "%  " + JSON.stringify({ from: x.from, to: x.to }));
        }
        var rel = buf.filter(function (e) { return e && e.k === "release"; });
        lines.push("松手事件 " + rel.length + " 次，最后 3 次:");
        for (var r = Math.max(0, rel.length - 3); r < rel.length; r += 1) lines.push("  " + JSON.stringify(rel[r]));
        // 事件计数：一眼看出 endDrag / settle-clear / release 各发生了几次
        var evCounts = {};
        for (var ci = 0; ci < buf.length; ci += 1) { var kk = buf[ci] && buf[ci].k; if (kk) evCounts[kk] = (evCounts[kk] || 0) + 1; }
        lines.push("事件计数: " + JSON.stringify(evCounts));
        // 每个非采样事件的上下文（前 2 条 + 后 6 条）
        var marks = [];
        for (var mi = 0; mi < buf.length; mi += 1) { if (buf[mi] && buf[mi].k && buf[mi].k !== "s") marks.push(mi); }
        for (var mj = Math.max(0, marks.length - 5); mj < marks.length; mj += 1) {
          var mIdx = marks[mj];
          lines.push("=== 事件 " + JSON.stringify(buf[mIdx]));
          for (var mb = Math.max(0, mIdx - 2); mb < mIdx; mb += 1) lines.push("  前 " + JSON.stringify(buf[mb]));
          for (var ma = mIdx + 1; ma < Math.min(buf.length, mIdx + 7); ma += 1) lines.push("  后 " + JSON.stringify(buf[ma]));
        }
        lines.push("--- 最后 120 条原始记录 ---");
        var tail = buf.slice(-120);
        for (var k = 0; k < tail.length; k += 1) lines.push(JSON.stringify(tail[k]));
        return lines.join("\n");
      } catch (error) {
        return "诊断生成失败: " + String(error && error.message ? error.message : error);
      }
    }

    /* ───────────── 面板：全部由 SETTINGS_SCHEMA 生成 ───────────── */

    function renderKind(item, value, esc) {
      var key = item.key;
      if (item.kind === "radio") {
        var opts = "";
        for (var i = 0; i < item.options.length; i += 1) {
          var o = item.options[i];
          opts += '<label><input type="radio" name="ces-' + esc(key) + '" data-ces-key="' + esc(key) + '" value="' + esc(o.value) + '"' +
            (value === o.value ? " checked" : "") + '> ' + esc(o.label) + '</label>';
        }
        return '<div class="ces-set__group" role="radiogroup" aria-label="' + esc(item.group || item.label) + '">' +
          (item.group ? '<div class="ces-set__row">' + esc(item.group) + '</div>' : "") + opts + '</div>';
      }
      if (item.kind === "switch") {
        return '<div class="ces-set__group"><label><input type="checkbox" data-ces-key="' + esc(key) + '"' +
          (value === true ? " checked" : "") + '> ' + esc(item.label) + '</label></div>';
      }
      if (item.kind === "range") {
        var shown = Math.round((value || 0) * (item.scale || 1));
        return '<div class="ces-set__group"><label class="ces-set__range">' + esc(item.label) +
          ' <input type="range" data-ces-key="' + esc(key) + '" data-ces-scale="' + esc(item.scale || 1) + '"' +
          ' min="' + esc(item.min) + '" max="' + esc(item.max) + '" step="' + esc(item.step || 1) + '" value="' + esc(shown) + '">' +
          ' <span data-ces-val="' + esc(key) + '"></span></label></div>';
      }
      return "";   // 未知 kind：安静跳过（旧版本遇到新控件不崩）
    }

    function disposeSettingsPanel() {
      try {
        if (typeof document === "undefined") return;
        var stale = document.querySelectorAll(".ces-set");
        for (var i = 0; i < stale.length; i += 1) {
          if (stale[i].parentNode) stale[i].parentNode.removeChild(stale[i]);
        }
      } catch (error) { /* 清理失败不致命 */ }
      settingsUiState.panel = null;
    }

    function buildSettingsPanel() {
      disposeSettingsPanel();   // 插件可能被加载多次：每次清掉旧面板再建，保证唯一且最新
      var esc = function (v) {
        return String(v === undefined || v === null ? "" : v)
          .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      };
      var s = readSettings();
      var schema = (typeof SETTINGS_SCHEMA === "undefined") ? [] : SETTINGS_SCHEMA;
      var body = "";
      for (var i = 0; i < schema.length; i += 1) body += renderKind(schema[i], s[schema[i].key], esc);

      var panel = document.createElement("div");
      panel.className = "ces-set";
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-label", "推理等级滑条 · 设置");
      panel.setAttribute("tabindex", "-1");
      panel.style.display = "none";
      panel.innerHTML =
        '<div class="ces-set__title">滑条设置</div>' +
        '<div class="ces-set__row" data-ces-system></div>' +
        body +
        '<div class="ces-set__actions">' +
        '<button type="button" data-ces-trace>复制诊断</button>' +
        '<button type="button" data-ces-reset>恢复默认</button>' +
        '<button type="button" data-ces-close>关闭</button>' +
        '</div>';

      // 事件完全由 data-ces-key 驱动：加新设置不用改这里；只监听 input（挂 change 会写两次）
      var applyFromInput = function (input) {
        var key = input.getAttribute("data-ces-key");
        if (!key) return;
        var schema = (typeof SETTINGS_SCHEMA === "undefined") ? [] : SETTINGS_SCHEMA;
        var item = null;
        for (var i = 0; i < schema.length; i += 1) if (schema[i].key === key) { item = schema[i]; break; }
        if (item === null) return;
        var patch = {};
        if (item.kind === "switch") patch[key] = input.checked === true;
        else if (item.kind === "range") patch[key] = parseFloat(input.value) / (item.scale || 1);
        else patch[key] = input.value;
        writeSettings(patch);
        syncSettingsPanel();   // 任何改动都刷新：让依赖联动立刻生效
      };
      panel.addEventListener("input", function (event) { applyFromInput(event.target); });
      panel.addEventListener("click", function (event) {
        var el = event.target;
        if (!el || typeof el.hasAttribute !== "function") return;
        if (el.hasAttribute("data-ces-trace")) {
          var txt = dumpTrace();
          var btn = el;
          try {
            if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(txt);
              btn.textContent = "已复制 ✓";
            } else {
              btn.textContent = "无法复制";
            }
          } catch (error) { btn.textContent = "无法复制"; }
          setTimeout(function () { btn.textContent = "复制诊断"; }, 1500);
        }
        if (el.hasAttribute("data-ces-reset")) { writeSettings(schemaDefaults()); syncSettingsPanel(); }
        if (el.hasAttribute("data-ces-close")) closeSettingsPanel();
      });
      panel.addEventListener("mousedown", function (event) { event.stopPropagation(); });

      document.body.appendChild(panel);
      settingsUiState.panel = panel;
      return panel;
    }

    function syncSettingsPanel() {
      var panel = settingsUiState.panel;
      if (!panel) return;
      var s = readSettings();
      var schema = (typeof SETTINGS_SCHEMA === "undefined") ? [] : SETTINGS_SCHEMA;
      for (var i = 0; i < schema.length; i += 1) {
        var item = schema[i];
        var input = panel.querySelector('[data-ces-key="' + item.key + '"]');
        if (item.kind === "radio") {
          var radios = panel.querySelectorAll('[data-ces-key="' + item.key + '"]');
          for (var r = 0; r < radios.length; r += 1) radios[r].checked = (radios[r].value === s[item.key]);
        } else if (item.kind === "switch" && input) {
          input.checked = s[item.key] === true;
        } else if (item.kind === "range" && input) {
          var shown = String(Math.round((s[item.key] || 0) * (item.scale || 1)));
          if (input.value !== shown) input.value = shown;
          input.disabled = item.dependsOn ? (s[item.dependsOn] !== true) : false;
          var label = panel.querySelector('[data-ces-val="' + item.key + '"]');
          if (label) label.textContent = input.disabled ? "已关闭" : (shown + (item.unit || ""));
        }
      }
      var sys = panel.querySelector("[data-ces-system]");
      if (sys) sys.textContent = "三种动画都不受系统「减少动态效果」影响";
    }

    function closeSettingsPanel() {
      var panel = settingsUiState.panel;
      if (!panel || panel.style.display === "none") return;
      panel.style.display = "none";
      try {
        if (settingsUiState.anchorEl && typeof settingsUiState.anchorEl.focus === "function") settingsUiState.anchorEl.focus();
      } catch (error) { /* 忽略 */ }
    }

    function openSettingsPanel(rect, anchorEl) {
      try {
        if (typeof document === "undefined" || !document.body) return;
        var panel = buildSettingsPanel();
        syncSettingsPanel();
        panel.style.display = "block";
        settingsUiState.anchorEl = anchorEl || null;
        var width = panel.offsetWidth || 280;
        var height = panel.offsetHeight || 200;
        var x = rect ? rect.left : 40;
        var y = rect ? rect.bottom + 6 : 80;
        var maxX = (window.innerWidth || 1024) - width - 8;
        var maxY = (window.innerHeight || 768) - height - 8;
        panel.style.left = Math.max(8, Math.min(x, maxX)) + "px";
        panel.style.top = Math.max(8, Math.min(y, maxY)) + "px";
        try { panel.focus(); } catch (error) { /* 无所谓 */ }
      } catch (error) { /* 面板失败不影响滑条 */ }
    }

    function isOurSlider(node) {
      return !!(node && typeof node.closest === "function" && node.closest(".ces-inline"));
    }

    /** 安装全局交互。分两段：① 每个模块实例都要挂"清缓存"；② 全局交互只装一套。 */
    function installSettingsUi() {
      // 工作台已接管设置（功能开关），不再注入原仓库的右键设置面板
      return;
      if (typeof document === "undefined" || !document.addEventListener) return;
      settingsUiState.installed = true;

      if (settingsUiState.cacheListenerInstalled !== true) {
        settingsUiState.cacheListenerInstalled = true;
        try {
          if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
            window.addEventListener(settingsEventName(), function () { cacheSet(null); });
          }
        } catch (error) { /* 忽略 */ }
      }
      if (document.__cesSettingsUiInstalled === true) return;
      document.__cesSettingsUiInstalled = true;

      // 1) 右键
      document.addEventListener("contextmenu", function (event) {
        if (!isOurSlider(event.target)) return;
        event.preventDefault();
        event.stopPropagation();
        var host = event.target.closest(".ces-inline");
        openSettingsPanel(host.getBoundingClientRect(), host);
      }, true);

      // 2) 长按 600ms（必须"按住不动"：拖动时指针一直在动，绝不能弹面板）
      document.addEventListener("pointerdown", function (event) {
        if (!isOurSlider(event.target)) return;
        var host = event.target.closest(".ces-inline");
        clearTimeout(settingsUiState.longPressTimer);
        settingsUiState.longPressOrigin = { x: event.clientX, y: event.clientY };
        settingsUiState.longPressTimer = setTimeout(function () {
          settingsUiState.longPressTimer = null;
          openSettingsPanel(host.getBoundingClientRect(), host);
        }, 600);
      }, true);
      var cancelLongPress = function () {
        if (!settingsUiState.longPressTimer) return;
        clearTimeout(settingsUiState.longPressTimer);
        settingsUiState.longPressTimer = null;
      };
      document.addEventListener("pointermove", function (event) {
        var origin = settingsUiState.longPressOrigin;
        if (!origin) return;
        if (Math.abs((event.clientX || 0) - origin.x) > 6 || Math.abs((event.clientY || 0) - origin.y) > 6) cancelLongPress();
      }, true);
      document.addEventListener("pointerup", cancelLongPress, true);
      document.addEventListener("pointercancel", cancelLongPress, true);

      // 3) 键盘等效键（右键是键盘用户够不到的）
      document.addEventListener("keydown", function (event) {
        var isMenuKey = (event.shiftKey && event.key === "F10") || event.key === "ContextMenu";
        if (!isMenuKey) return;
        var active = document.activeElement;
        if (!isOurSlider(active)) return;
        event.preventDefault();
        openSettingsPanel(active.getBoundingClientRect(), active);
      }, true);

      // 4) Esc / 点外部关闭
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeSettingsPanel();
      }, true);
      document.addEventListener("mousedown", function (event) {
        var panel = settingsUiState.panel;
        if (!panel || panel.style.display === "none") return;
        if (panel.contains(event.target)) return;
        if (isOurSlider(event.target)) return;   // 右键/长按紧接着会重新打开
        closeSettingsPanel();
      }, true);
    }

    /* ════════════════════════ 纯函数（可离线单测）════════════════════════ */

    var EMPTY_SNAPSHOT = Object.freeze({
      current: null,
      groups: [],
      failures: [],
      status: "idle",
      pending: null,
      error: null,
      retainedEffort: undefined,
    });

    /** 在目录快照里找到当前模型条目（groups[].models[]）。 */
    function modelOf(state) {
      var current = state && state.current;
      if (!current || typeof current.provider !== "string" || typeof current.model !== "string") return null;
      var groups = state && Array.isArray(state.groups) ? state.groups : [];
      for (var i = 0; i < groups.length; i += 1) {
        var group = groups[i];
        if (!group || group.id !== current.provider) continue;
        var models = Array.isArray(group.models) ? group.models : [];
        for (var j = 0; j < models.length; j += 1) {
          if (models[j] && models[j].id === current.model) return models[j];
        }
      }
      return null;
    }

    /** 当前模型真实可用的档位列表（官方 id + 官方显示名，按目录顺序）。 */
    function levelsOf(state) {
      var model = modelOf(state);
      var efforts = model && model.reasoning && Array.isArray(model.reasoning.efforts) ? model.reasoning.efforts : [];
      var out = [];
      for (var i = 0; i < efforts.length; i += 1) {
        var effort = efforts[i];
        if (!effort || typeof effort.id !== "string" || effort.id.length === 0) continue;
        out.push({
          id: effort.id,
          name: typeof effort.name === "string" && effort.name.length > 0 ? effort.name : effort.id,
        });
      }
      return out;
    }

    /**
     * 解析"本次渲染真正可用的档位列表"：
     *   活列表非空 → 更新缓存并返回它；
     *   活列表为空 → 若缓存属于同一模型（或身份未知），用缓存兜底；否则返回空。
     * 纯函数 + 显式传入缓存，便于单测（见 test/client.test.mjs 第 49 节）。
     */
    function resolveLevels(liveLevels, liveKey, cache) {
      if (liveLevels.length > 0) {
        cache.key = liveKey;
        cache.levels = liveLevels;
        return liveLevels;
      }
      var sameModel = liveKey === null || cache.key === null || liveKey === cache.key;
      if (cache.levels.length > 0 && sameModel) return cache.levels;
      return liveLevels;
    }

    /**
     * 当前**生效**的档位 id：显式设置优先；没设置过就是模型的默认档
     * （与官方 `syncInputs()` 的 `effort = intended.reasoningEffort ?? reasoning.defaultEffort` 同款）。
     */
    function effectiveEffortId(state) {
      var current = state && state.current;
      if (current && typeof current.reasoningEffort === "string" && current.reasoningEffort.length > 0) {
        return current.reasoningEffort;
      }
      var model = modelOf(state);
      var fallback = model && model.reasoning && model.reasoning.defaultEffort;
      return typeof fallback === "string" && fallback.length > 0 ? fallback : null;
    }

    function indexOfLevel(levels, id) {
      if (typeof id !== "string") return -1;
      for (var i = 0; i < levels.length; i += 1) if (levels[i].id === id) return i;
      return -1;
    }

    function clamp01(value) {
      if (!(value > 0)) return 0; // 同时挡住 NaN
      return value > 1 ? 1 : value;
    }

    /** 百分比 → 最近档位下标（滑条连续，档位离散，所以必须吸附）。 */
    function indexFromPct(pct, count) {
      if (count <= 1) return 0;
      return Math.max(0, Math.min(count - 1, Math.round(clamp01(pct) * (count - 1))));
    }

    /** 档位下标 → 该档位在轨道上的百分比（刻度点与旋钮永远对齐）。 */
    function pctFromIndex(index, count) {
      // ⚠️ 只有一档时**直接拉满**（issue #7）：那一档就是"最大"，不是"最左/off"。
      //    count === 0（档位还没就绪）仍返回 0 —— 否则空列表会把旋钮甩到最右。
      if (count <= 0) return 0;
      if (count === 1) return 1;
      var safe = Math.max(0, Math.min(count - 1, index));
      return safe / (count - 1);
    }

    /** 「一档一格」的判定阈值：向前只越过 1/3 档距，向后要退回 2/3（滞回，防抖）。 */
    var DETENT_THIRD = 1 / 3;

    /**
     * 快速动画（Codex 手感）的档位判定（纯函数，便于单测）：
     *   pos   —— 指针在「档位坐标」上的连续位置，0 … count-1（不是百分比）
     *   cur   —— 当前停在第几格
     *   count —— 档位数
     * 规则：pos ≥ cur + 1/3 才向上（拖得快可一次跨多格）；pos ≤ cur − 2/3 才向下；否则不动。
     */
    /**
     * 档位门槛（detent gate）：把指针位置映射成滑条目标位置。
     * 每个档位边界前后各有一段"阻力带"，指针要在带内多走一段才跨得过去；
     * 门槛随档位递增，**最高档最大**（超频前最后一道坎）。
     */
    var DETENT_GATES = [0.026, 0.038, 0.062, 0.085, 0.11];
    var DETENT_GATE_MAX = 0.1;

    function detentGate(i, count) {
      var g = DETENT_GATES[Math.min(DETENT_GATES.length - 1, i - 1)];
      if (i === count - 1) g = Math.max(g, DETENT_GATE_MAX);
      return g;
    }

    /**
     * 用户定制的「卡扣」手感（非快速模式）：
     * 档位格点 g_i = i/(count-1)（4 档 = 0·1/3·2/3·1）。
     *   · 第一段 [0, g_1]：正常跟手；
     *   · 之后每段 [g_i, g_{i+1})：指针移动**没有反应**，显示钉在 g_i，
     *     指针到 g_{i+1} 才"啪"地弹到下一格；
     *   · 越过最高档格点后（指针位置 1 … 2）：显示钉在 g_{n-1}，
     *     滑块轻微颤动（幅度 0 … 4px，随超出量增长）；
     *   · 指针位置 ≥ 2：才真正冲进 max（配合粒子 + 虚影）。
     * 返回 { target, shake }，shake 单位 px。
     */
    /**
     * 拖动映射（非快速模式）：分段卡扣。
     * 单位：指针位移以轨道宽度为 1。
     * 每段（i = 0..n-1）：
     *   · 段内指针移动时滑块钉在格点 i/n 不动（光标/旋钮就显示在那里）；
     *   · 段末最后 1 个单位内滑块快速跳到下一格，光标一起跳。
     * 段长 = (1/n) × 基础倍率 × 行程倍率：low 段 1、high 段 1.5、max 段 3；行程倍率 2。
     * （4 档实测行程：0–66 不动 → 66–67 到 Low → 67–166 不动 → 166–167 到 High
     *   → 167–267 不动 → 267–367 颤动 → 367–368 冲进 Max。）
     * max 段后半开始颤动（最多 2px）。
     */
    var STAGE_TRAVEL_RATE = 3;

    function stageRateFor(i, n) {
      if (i === n - 1) return 4.5;
      if (i === 0) return 1;
      return 1.5;
    }

    function stagedTarget(pointerPct, count) {
      var n = count - 1;
      if (!(n > 0)) {
        var only = pointerPct > 1 ? 1 : (pointerPct < 0 ? 0 : pointerPct);
        return { target: only, shake: 0 };
      }
      var p = pointerPct < 0 ? 0 : pointerPct;
      var base = 1 / n;
      var cursor = 0;
      for (var i = 0; i < n; i += 1) {
        var len = base * stageRateFor(i, n) * STAGE_TRAVEL_RATE;
        if (p < cursor + len) {
          var shake = 0;
          if (i === n - 1 && p >= cursor + len * 0.5) {
            shake = Math.min(2, ((p - (cursor + len * 0.5)) / (len * 0.5)) * 2);
          }
          return { target: i / n, shake: shake };
        }
        // 切换带：1 个百分单位（轨道宽的 1%），一越过就快速弹到下一格
        if (p < cursor + len + 0.01) {
          return { target: (i + 1) / n, shake: 0 };
        }
        cursor += len;
      }
      return { target: 1, shake: 0 };
    }

    function detentPct(pct, count) {
      if (!(count > 1)) return pct;
      var n = count - 1;
      var shift = 0;
      for (var i = 1; i <= n; i += 1) {
        // 档位切换边界在相邻档位中心之间：(i - 0.5) / (count - 1)
        var b = (i - 0.5) / n;
        var g = detentGate(i, count);
        var lo = b - g;
        var hi = b + g;
        if (pct < lo) break;
        if (pct <= hi) {
          var t = (pct - lo) / (2 * g);
          return Math.max(0, Math.min(1, lo - shift + g * t * t));
        }
        shift += g;
      }
      return Math.max(0, Math.min(1, pct - shift));
    }

    function detentTargetIndex(pos, cur, count, third) {
      if (count <= 1) return 0;
      var th = (typeof third === "number" && third > 0 && third < 0.5) ? third : 1 / 3;
      var lo = Math.max(0, Math.min(count - 1, typeof cur === "number" ? cur : 0));
      var p = Math.max(0, Math.min(count - 1, pos));
      if (p >= lo + th) return Math.min(count - 1, Math.max(lo + 1, Math.round(p)));
      if (p <= lo - (1 - th)) return Math.max(0, Math.min(lo - 1, Math.round(p)));
      return lo;
    }

    /* ══════════════ 连续运动引擎（刹车预测 + 速度跟踪）══════════════
     *
     * 核心不变量：**目标可以突变，运动状态（位置 x / 速度 v / 加速度 a）不可以。**
     * 用户操作（按下 / 拖动 / 松手 / 键盘）只改 `m.target`，**绝不碰 x / v / a**。
     *
     * 早先几版都在"时长 + 缓动曲线"里打转（200ms ease-in-out → 80ms ease-out →
     * 追赶窗口），怎么调都不对。根因是：CSS transition 在目标变化时**必然重播
     * 一条固定曲线**，做不到"只换目标、不换运动状态"，于是永远在"取消旧动画 →
     * 播新动画"之间切换，视觉上就是"本来在减速突然又开始加速"的割裂感。
     *
     * ── 运动律：两步 ──
     *
     *   第 1 步：**由位置误差算出"期望速度"**（两个映射取小）
     *       v期望 = sign(e) · min( K·|e| , √(2·A·|e|) , vmax )
     *
     *   第 2 步：**由速度差算出加速度**（连续跟踪，不是 bang-bang）
     *       a = clamp(k · (v期望 − v), ±amax)
     *       v = clamp(v + a·dt, ±vmax);   x = x + v·dt
     *
     * ⚠️ **必须同时有那两项，只留刹车曲线会抖振**（实测定论，别重犯）：
     *   `√(2A|e|)` 是 **bang-bang 的切换曲线**，含义是"在**恒力 A 减速**下还能
     *   刹停的速度上限"，它和 `a = ±A` 是**一对**。一旦力律换成连续的
     *   `a = k(v期望 − v)`，就丢掉了"力恒定为 A"这个前提：
     *     · v期望 自身随 e→0 而下降，v 永远追不上一条持续下降的曲线
     *     · 到目标时仍有残速 → 冲过去 → e 变号 → v期望 反向 → 又冲回来
     *   实测只留 `√(2Ae)` 当速度目标：目标 0.5 时 **v 符号翻转 973 次、永不收敛**。
     *
     *   所以 `K·|e|` 才是**为连续力律设计的**位置→速度映射；`√(2A|e|)` 降级为
     *   **上限**（"别快过刹得住的速度"）。两者取小后实测零抖振、全部精确落点。
     *
     * ── 参数（四个旋钮）──
     *   K    = 位置→速度映射增益（1/s）。决定"离目标多远时想跑多快"。
     *   A    = 刹车斜率，只作速度上限。同时决定反向滑行距离 ≈ v²/(2A)。
     *   k    = 速度跟踪增益（1/s）。越大越接近 bang-bang（力陡），越小越柔和。
     *   vmax = 速度上限。
     *
     * 实测标定（真实事件率 125Hz + 帧 60Hz，行程 = 1.0）—— K=20 A=120 k=40 vmax=6：
     *
     *     指标                        本版      弹簧阻尼版   纯 bang-bang
     *     小幅动 10px 后的"弹"        0.28px    7.11px      0.00px
     *     召唤到 1%                   ~200ms    333ms       217ms
     *     过冲（各距离）              ≤0.2px    0.00px      0.00px
     *     各距离精确落点              全部 ✓    全部 ✓      全部 ✓
     *     抖振（v 符号翻转）          0         0           需要 16 子步抑制
     *
     * ⚠️ 两个实测确认"别加"的东西：
     *   1) **不要加加加速度(jmax)限幅**：会拖慢力对"预测切换时机"的响应，
     *      反而把弹从小到大（在 bang-bang 版上实测 0.32 → 1.40px）。
     *   2) **不要加指针速度前馈**：本律只看 x 与 v；叠前馈会把拖动领先放大
     *      （在 bang-bang 版上实测 1.0 → 4.6px）。
     *
     * ⚠️ 边界处理：位置夹住时必须同时把朝外的速度停住，否则会在端点"顶住"抖动。
     */
    var MOTION = {
      K: 20,       // 位置→速度映射增益（1/s）
      A: 120,      // 刹车斜率（pct/s²）：只作速度上限；反向滑行 ≈ v²/(2A)
      k: 40,       // 速度跟踪增益（1/s）
      amax: 240,   // 加速度上限（pct/s²，安全阀）
      vmax: 6,     // 速度上限（pct/s）
      epsX: 0.0015, // 到位判定：位置误差阈值
      epsV: 0.02,   // 到位判定：速度阈值
    };
    /** 「简洁动画」：比完整更干脆，但**必须稳定**（见下方警告）。 */
    var MOTION_REDUCED = {
      K: 40, A: 300, k: 40, amax: 200, vmax: 7,
      epsX: 0.0015, epsV: 0.02,
    };
    /* ⚠️⚠️ 参数稳定性硬约束（issue #12 的真因，别再犯）：
     *
     *   旧参数 { K:120, A:600, k:200, amax:1200, vmax:20 } 会**自激振荡** ✗：
     *   `amax × 每帧时长 = 1200 ÷ 60 = 20`，**正好等于 vmax** →
     *   速度能在一帧内从 +20 翻到 -20 → 位置每帧摆动 ±20/60 = **±0.333** ✗
     *   → 实测就是 issue #12 里"33.6% 前后跳、215 次单帧跳变" ✓（eff 却恒为 0.5 ✗）。
     *
     *   判据：**`amax × (1/60) ≤ 0.5 × vmax`**（60fps 下速度一帧最多变半档），
     *   否则控制器退化成 bang-bang（全速正反打），小幅调整也会抖。
     *   下面三组都满足：
     *     MOTION        amax 240 / 60 = 4    ≤ 0.5 × 6  = 3   ≈ 临界（够用）
     *     MOTION_REDUCED amax 200 / 60 = 3.3 ≤ 0.5 × 7  = 3.5 ✓
     *     MOTION_FAST   amax 300 / 60 = 5    ≤ 0.5 × 10 = 5   ✓
     */
    /**
     * 「快速动画」(fast) —— 复刻 Codex 桌面版的手感（2026-10-17 从 60fps 录屏逐帧量得）：
     *   · **不跟手**：旋钮停在档位格上，不随指针连续移动（见 moveTo 的 fast 分支）；
     *   · 越过「当前格 + 1/3」才切下一格、越过「当前格 − 2/3」才回上一格（滞回，见 detentTargetIndex）；
     *   · 吸附**很快**：实测半条轨道约 67ms（≈4 帧 @60fps）；
     *   · **无回弹**：落点后只留极小残差（视频实测 ≈±1%）。
     * 参数是手算+测试校出来的：vmax 10 / A 500 的刹车距离刚好覆盖，k·amax 让速度一帧最多变 5，
     * 所以小幅移动（0.2→1/3）3 帧到位、半条轨道 4~5 帧到位，**都不过冲**。
     * ⚠️ 别再把 amax/k 调大：a·dt 会接近 vmax，变成 bang-bang → 小幅移动会来回振荡（实测过）。
     */
    var MOTION_FAST = {
      K: 60, A: 500, k: 60, amax: 300, vmax: 10,
      epsX: 0.0015, epsV: 0.02,
    };
    /** 松手落点外推时长（秒）：带着动量滑向它正要去的档位（"快滑跳过中间点"）。
     *  实测：这是指针速度的**连续函数**（v→0 时外推量→0），所以**不需要任何门槛**；
     *  1489 组样本中外推改变落点时 100% 顺着运动方向。速度抖动用 EMA 平滑即可。 */
    /** 松手外推时长（秒）。
     *  ⚠️ 实测诊断结论（两份 trace）：**任何非零外推都可能把落点推到另一档** ——
     *    指针可以停在档位区间内的任何位置（例如 31.3% 属于档位 1），
     *    而 0.04s × 最大指针速度(6/s) = 0.24，远大于"到区间边界的距离"，
     *    于是 releaseIndexFor 落到**档位 0**：滑条滑到 0% 后再跳回本体的 33.3% = 抽搐。
     *    预览页手感好，正是因为它的 vPtr 基本为 0（= 不外推）。
     *    故置 0（灵敏度关闭）；要重新启用惯性，必须先解决"外推不得跨档"。 */
    var RELEASE_PROJECT_S = 0;
    /** 指针速度 EMA 系数：防抖（松手瞬间鼠标微抖会让 vPtr 跳变）。非门槛。 */
    var POINTER_SPEED_EMA = 0.4;
    /**
     * 指针速度的"保鲜期"（秒）：超过这段时间没有新的 pointermove，就认为指针已停。
     * 2 帧 ≈ 33ms —— 足够容忍 60Hz 的 pointermove 间隔，又能及时判定"停住"。
     */
    var POINTER_STALE_S = 2 / 60;
    /** 指针速度陈旧后的衰减时间常数（秒）。30ms 实测：停住后偏移从 13.33% 降到 0.08%。 */
    var POINTER_SPEED_TAU = 0.03;
    /** 单帧 dt 上限（秒）：切标签/卡顿后回来时不要一帧跳一大段。 */
    var MAX_FRAME_DT = 0.05;

    function clampAbs(value, limit) {
      if (value > limit) return limit;
      return value < -limit ? -limit : value;
    }

    /**
     * 运动引擎单步演化（纯函数，原地修改 m，返回 m）。
     * 抽成纯函数是为了让测试能**注入固定 dt 精确断言**（零过冲/精确落点/收敛），
     * 不依赖真实时钟。
     *
     * @param m  { x, v, a, target } —— a 只是"本帧算出的加速度"，便于断言与调试
     * @param dt 秒
     * @param p  参数组（MOTION / MOTION_REDUCED）
     */
    function motionStep(m, dt, p) {
      // 1) 由**位置误差**算出「期望速度」——两个映射取小：
      //    · K·|e|        ：线性"位置→速度"映射，**这是为连续力律设计的**
      //    · √(2·A·|e|)   ：刹车预测上限（"以当前距离最多还能多快"）
      //    · vmax         ：硬上限
      var e = m.target - m.x;
      var vAbs = p.K * Math.abs(e);
      var brake = Math.sqrt(2 * p.A * Math.abs(e));
      if (brake < vAbs) vAbs = brake;
      if (vAbs > p.vmax) vAbs = p.vmax;
      var vDesired = e > 0 ? vAbs : (e < 0 ? -vAbs : 0);
      // 2) 由**速度差**算出加速度（连续跟踪）
      m.a = clampAbs(p.k * (vDesired - m.v), p.amax);
      // 3) 积分
      m.v = clampAbs(m.v + m.a * dt, p.vmax);
      // 3b) **防过冲**（issue #12 的另一半）：这一帧按速度要走出的位移如果已经 ≥ 剩余距离，
      //     说明目标就在这一帧之内 —— 直接精确落在目标上。
      //     否则帧量化会让人冲到目标外侧再弹回来（实测快速档回弹 3.33%，视频里只有 ±1%）。
      if (e !== 0 && Math.abs(m.v * dt) >= Math.abs(e)) {
        m.x = m.target;
        m.v = 0;
        m.a = 0;
        return m;
      }
      var xRaw = m.x + m.v * dt;
      var xClamped = xRaw < 0 ? 0 : (xRaw > 1 ? 1 : xRaw);
      // 4) 边界：位置夹住时**必须同时停住朝外的速度**，否则会在端点顶住抖动
      if (xClamped !== xRaw && ((xClamped === 0 && m.v < 0) || (xClamped === 1 && m.v > 0))) {
        m.v = 0;
        m.a = 0;
      }
      m.x = xClamped;
      // 5) 收口：到位时对齐目标（消除浮点残差，否则帧循环会为 1e-6 一直转）
      if (motionSettled(m, p)) { m.x = m.target; m.v = 0; m.a = 0; }
      return m;
    }

    /** 是否已到位（位置与速度都足够小）→ 可以停掉帧循环，不空转。 */
    function motionSettled(m, p) {
      return Math.abs(m.target - m.x) < p.epsX && Math.abs(m.v) < p.epsV;
    }

    /**
     * 指针速度的**陈旧衰减**（纯函数）。
     *
     * 为什么还需要它：`vPtr` 只在 `pointermove` 里更新，而**指针停下后不再有事件** ——
     * 它会永久冻结在最后一个速度值上。`vPtr` 现在**不参与运动演化**
     * （本版运动律只看 x 与 v，没有前馈项），但**松手落点外推**仍在用它：
     *
     *     落点 = 松手位置 + vPtr × 0.08s
     *
     * 若 vPtr 陈旧，指针明明已经停住，松手却会按旧速度多推一段（实测残留 vPtr=2
     * 会多推 16% 行程、vPtr=3 多推 24%）—— 4 档模型间距 33%，足以**落错档**。
     *
     * 修法：距上次 pointermove 超过 `staleS` 后按 `tau` 指数衰减到 0。
     *
     * ⚠️ 历史：在更早的"弹簧阻尼 + 前馈"版里，陈旧的 vPtr 危害**大得多** ——
     * 前馈项 `2ζω(vPtr − v)` 会变成一个**恒定的力**，把滑块永久推到鼠标一侧
     * （实测停在右侧 13.33%），而且让到位判定永不成立、帧循环空转烧 CPU
     * （实测 2 万帧仍未收敛）。本版运动律不含前馈项，那一整类问题从机理上消失。
     *
     * @param vPtr    上次算出的指针速度
     * @param sinceS  距上次 pointermove 的秒数
     */
    function decayPointerSpeed(vPtr, sinceS, staleS, tau) {
      if (!(sinceS > staleS)) return vPtr;
      return vPtr * Math.exp(-(sinceS - staleS) / tau);
    }

    /**
     * 松手落点：目标位置 + 指针速度 × 外推时长 → 最近档位。
     * 无门槛 —— 外推量随速度连续趋于 0，慢拖天然不受影响。
     */
    function releaseIndexFor(targetPct, vPtr, count) {
      return indexFromPct(clamp01(targetPct + vPtr * RELEASE_PROJECT_S), count);
    }

    /** rAF 适配：真机走 requestAnimationFrame；测试台/无 rAF 环境降级到 setTimeout。
     *  ⚠️ 降级**必须用裸 setTimeout**：实测测试台的 window 桩里没有 setTimeout
     *  （写 window.setTimeout 会 TypeError）；也不能写裸 requestAnimationFrame
     *  （Node 没有这个全局，直接 ReferenceError 让整包挂掉）。 */
    function scheduleFrame(cb) {
      if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
        return { raf: true, id: window.requestAnimationFrame(cb) };
      }
      return { raf: false, id: setTimeout(function () { cb(nowMs()); }, 16) };
    }
    function cancelFrame(handle) {
      if (!handle) return;
      if (handle.raf) {
        if (typeof window !== "undefined" && typeof window.cancelAnimationFrame === "function") {
          window.cancelAnimationFrame(handle.id);
        }
      } else {
        clearTimeout(handle.id);
      }
    }
    /** 单调时钟（performance.now 在真机与测试台都可用；退回 Date.now）。 */
    function nowMs() {
      return (typeof performance !== "undefined" && typeof performance.now === "function")
        ? performance.now() : Date.now();
    }

    function errorText(error) {
      if (error === null || error === undefined) return "档位切换失败";
      if (typeof error === "string") return error;
      if (typeof error.message === "string" && error.message.length > 0) return error.message;
      if (typeof error.code === "string" && error.code.length > 0) return error.code;
      return String(error);
    }

    /* ─────────────────── 最高档能量层：参数与强度曲线 ─────────────────── */

    /**
     * 星尘粒子（星星）：**全部由下标算出，不用随机数** —— 每次渲染完全一致、可离线断言。
     *
     * 形态 = 3px 圆点；运动 = 横穿整条轨道（右 → 左），**不消失**、没有上下飘动。
     *
     * 高度与相位**必须用两条互不相关的分配**：
     *   · 相位 = 黄金比低差异序列（任意前缀都铺得开，拖动时逐渐加星也不会挤）；
     *   · 高度 = **随机排列**的等距槽位（哈希排序，确定性），并与相位排名解耦。
     * 早期版本这两者取自同一个数 `frac((i+1)×φ)`，结果"越靠右的星越高"，22 颗排成
     * 一条斜线（用户实测反馈"太规整，再随机一点"；相关系数实测 0.999）。
     * 再挑一个满足最小间隔的盐值：**相位相邻**（会在轨道上一直并排走）的两颗
     * 高度至少差 `MIN_HEIGHT_SLOTS` 槽，避免并成一坨。
     */
    var PARTICLES = (function buildParticles() {
      var count = 22;
      var out = [];
      var i;
      for (i = 0; i < count; i += 1) {
        out.push({ y: 0, phase: (i + 1) * GOLDEN_RATIO % 1 });
      }
      // 相位排名：黄金比序列里排名相邻 = 在轨道上位置相邻
      var byPhase = [];
      for (i = 0; i < count; i += 1) byPhase.push(i);
      byPhase.sort(function (a, b) {
        return out[a].phase - out[b].phase;
      });
      // 高度槽：找一个满足"相位相邻至少差 MIN_HEIGHT_SLOTS 槽"的确定性随机排列
      var slots = null;
      for (var salt = 71; salt < 4000 && slots === null; salt += 1) {
        var candidate = [];
        for (i = 0; i < count; i += 1) candidate.push(i);
        candidate.sort(function (a, b) {
          var ha = starHash01(a, salt);
          var hb = starHash01(b, salt);
          return ha === hb ? a - b : ha - hb;
        });
        var ok = true;
        for (var k = 1; k < count && ok; k += 1) {
          if (Math.abs(candidate[k] - candidate[k - 1]) < MIN_HEIGHT_SLOTS) ok = false;
        }
        if (ok) slots = candidate;
      }
      if (slots === null) {
        // 兜底：步长 5 与 22 互质 → 一定是排列，且相邻槽恒差 5（≥ MIN_HEIGHT_SLOTS）
        slots = [];
        for (i = 0; i < count; i += 1) slots.push(i * 5 % count);
      }
      for (var rank = 0; rank < count; rank += 1) {
        out[byPhase[rank]].y = 8 + (slots[rank] / (count - 1)) * 84;
      }
      return out;
    })();

    /* 颜色常量与 ENERGY_* 都声明在文件上部的「尺寸与速率常量」块里（供 CSS 插值用），
       这里只放纯函数 —— 不要再重复声明，否则会出现"改一处漏一处"的双份真相。 */

    function mixColor(from, to, t) {
      var k = clamp01(t);
      return [
        Math.round(from[0] + (to[0] - from[0]) * k),
        Math.round(from[1] + (to[1] - from[1]) * k),
        Math.round(from[2] + (to[2] - from[2]) * k),
      ];
    }

    function rgbOf(color) {
      return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
    }

    /** 位置 → 填充色（当前点的颜色，也就是渐变右端的颜色）。 */
    function fillColorFor(pct) {
      var t = clamp01(pct);
      if (t <= ENERGY_START) return rgbOf(COLOR_BLUE);
      if (t <= ENERGY_END) return rgbOf(mixColor(COLOR_BLUE, COLOR_VIOLET, (t - ENERGY_START) / (ENERGY_END - ENERGY_START)));
      return rgbOf(mixColor(COLOR_VIOLET, COLOR_DEEP, (t - ENERGY_END) / (1 - ENERGY_END)));
    }

    /**
     * 位置 → 填充层的背景：**左端恒为蓝，右端（旋钮处）是当前位置的颜色**。
     * 于是 high 档自然呈现"左蓝右紫"的渐变，越往右右端越深。
     */
    function fillBackgroundFor(pct) {
      return "linear-gradient(90deg, " + rgbOf(COLOR_BLUE) + ", " + fillColorFor(pct) + ")";
    }

    /**
     * 位置 → **官方那一行数值文字**（"Max"）的颜色。
     *
     * 与能量同源：蓝 → 紫罗兰，越往右越紫（用户要求"Max 的字体颜色能不能改变"）。
     * 刻意**不跟填充末尾的深紫走** —— `COLOR_DEEP` 当文字在深色底上几乎看不见；
     * 文字需要一个亮端，所以终点用 `COLOR_TEXT_VIOLET`。
     *
     * **Off 档返回空串**：不写内联色 = 官方原本的灰（用户要求"off 档两个界面都是灰的"）。
     * 调用方直接 `style.color = valueColorFor(...)`，空串在浏览器里就是"清掉内联色"。
     */
    function valueColorFor(pct, level) {
      if (isOffLevel(level)) return "";
      return rgbOf(mixColor(COLOR_BLUE, COLOR_TEXT_VIOLET, energyFor(pct)));
    }

    /**
     * 是不是"关闭推理"那一档。
     *
     * DeepSeek 的档位表是 id `off` / name `Off`（见 `dsh-llm-deepseek/lib/index.js` 的
     * `REASONING_EFFORTS`），但 id 是 provider 自己的字符串，所以 id 和 name 都认一遍，
     * 并额外接受几个同义写法。认不出就是普通档位（照常着色）。
     */
    function isOffLevel(level) {
      if (!level) return false;
      var candidates = [level.id, level.name];
      for (var i = 0; i < candidates.length; i += 1) {
        if (typeof candidates[i] !== "string") continue;
        var flat = candidates[i].replace(/\s+/g, "").toLowerCase();
        if (flat === "off" || flat === "none" || flat === "关闭" || flat === "无") return true;
      }
      return false;
    }

    /**
     * 位置 → 能量强度 0..1（紫色星云 + 粒子的总强度）。
     * **纯位置驱动，与档位数无关**：第二档以前为 0（保持干净的蓝），之后线性渐入到最高档的 1。
     * 锚点：pct=1/3 → 0；pct=2/3（4 档模型的 high）→ 0.5；pct=1（max）→ 1。
     */
    function energyFor(pct) {
      return clamp01((clamp01(pct) - ENERGY_START) / (1 - ENERGY_START));
    }

    /**
     * 位置 → 粒子速率倍数。
     * 锚点来自实测反馈：**high 档（4 档模型的 2/3 处）= 1×（也就是现在这个速度刚刚好）**，
     * 最高档 = 2×。再往左按同一斜率降速，但设 0.35× 下限，免得左端变成静止。
     */
    function speedFor(pct) {
      // ⚠️ 2026-11-11：下限从 0.35 提到 0.55 ✓ —— 左侧不再"慢得像停住"，最高仍 2× ✓。
      //    （用户反馈"速度偏慢"✓：0.35 时 2s 基准会被拉到 ~5.7s ✗）
      return Math.min(2, Math.max(0.55, 3 * clamp01(pct) - 1));
    }

    /** 位置 → 可见粒子数（"粒子效果逐渐出现、变密集"）。 */
    function particleCountFor(pct) {
      return Math.round(energyFor(pct) * PARTICLES.length);
    }

    /* ── 星空：所有出现粒子的档位都用这一套（统一的动画）────────────────────

       运动模型：外层是一条**整轨宽度**的轨道，自己在做 `translate3d(-100%)` 的连续横穿；
       圆点在最右端出生、向左穿出，残影只在两端淡出（而那两端在可视区外）→ **从不消失**。
       每颗的亮度/大小由确定性伪随机给出（越亮越大，0.5~1），速率随**位置**变化（速度变化保留）。 */

    /** 确定性伪随机 [0,1)：不用 Math.random（可离线断言、重渲染不跳变），但看起来是随机的。 */
    function starHash01(index, salt) {
      var value = (index + 1) * salt * 2654435761 % 4294967296;
      return ((value >>> 8) % 1000) / 1000;
    }

    /** 第 index 颗粒子的亮度/大小系数，落在 [STARFIELD_MIN, 1]（越亮越大）。 */
    function starBrightnessFor(index) {
      return STARFIELD_MIN + (1 - STARFIELD_MIN) * starHash01(index, 61);
    }

    /**
     * 「横穿」动画的**固定时长**（秒）。
     * ⚠️ 2026-11-11 关键结论（用户实测"粒子回退"✗）：
     *   CSS 动画进度 = `(t − delay) / duration` = `t/duration + f` ✓ ——
     *   所以**只要 duration 随位置变**，`t/duration` 这一项就会跳 ✗：
     *     往左拖 → duration 变长 → t/duration 变小 → **粒子往回退** ✗✓
     *   （把 delay 按比例缩放只固定了 `f` ✓，固定不了 `t/duration` ✗。）
     *   → 正确做法：**duration 固定** ✓，速度用 `playbackRate` 缩放 ✓
     *     （playbackRate 是缩放 `t` ✓，不动 delay/duration ✓ → 相位连续 ✓ 绝不回退 ✓）。
     */
    var STARFIELD_DURATION_FIXED = 2;
    function starDurationFor(index, speedFactor) {
      // 各星之间只差 ±8%（错峰，避免整齐划一地一起跑 ✓）
      var spread = 1 - STARFIELD_DURATION_SPREAD + 2 * STARFIELD_DURATION_SPREAD * starHash01(index, 29);
      return STARFIELD_DURATION_FIXED * spread;
    }

    /**
     * 第 index 颗粒子的相位（负延迟，单位 s）。
     *
     * 相位用**黄金比低差异序列**铺开，而且**只跟 index 有关、跟当前显示几颗无关** ——
     * 这一点很关键：如果按 `i / 当前数量` 算，拖动过程中粒子数变化会让每颗已挂载动画的
     * `animation-delay` 被改写，按规范当前进度会按新起始时间重算，整片星空就会抖一下/重排一次。
     * 低差异序列还有个好处：**任意前缀**（前 N 颗）本身就是均匀铺开的。
     */
    function starDelayFor(index, duration) {
      var particle = PARTICLES[index];
      var phase = particle && typeof particle.phase === "number" ? particle.phase : 0;
      var jitter = starHash01(index, 53) * 0.03; // 一点点抖动，避免看起来像整齐的队列
      return -((phase + jitter) % 1) * duration;
    }

    /** 位置 → 可见星星数（"逐渐出现、变密集"）。 */
    function starCountFor(pct) {
      return particleCountFor(pct);
    }

    /**
     * 位置 → **星星层**的不透明度。
     *
     * 星星不能跟着星云一起淡入：星云层的透明度 = 能量强度，high 档只有 0.5，
     * 那么每颗星的实际不透明度会被压到 0.25~0.5，在紫色底上几乎看不见
     * （用户实测反馈："high 档一打开几乎没粒子"）。所以星星层单独给一个下限，
     * 只随能量轻微变化：high 档 0.8、MAX 档 1.0 —— "逐渐出现"交给**粒子数**去表达。
     */
    function starLayerOpacityFor(pct) {
      return 0.6 + 0.4 * energyFor(pct);
    }

    /**
     * 旋钮中心 / 填充终点 / 刻度的水平位置：`半径 + pct × (100% − 直径)`。
     * 这样 pct=0 时圆心正好落在左端圆角内、pct=1 时落在右端圆角内 —— 圆圈永远是完整的圆。
     */
    function knobOffsetOf(pct) {
      var t = Math.round(clamp01(pct) * 10000) / 10000;
      return "calc(" + KNOB_RADIUS + "px + " + t + " * (100% - " + KNOB_RADIUS * 2 + "px))";
    }

    /* ═════════════════ 官方目录访问（每会话一个，永不抛错）═════════════════ */

    /**
     * 每个会话一个访问器。它解决两件真实存在的事：
     *  1. `directoryFor(sessionId)` 在会话作用域/绑定尚未就绪时**按设计抛错**；
     *  2. 目录实例可能被重建（换模型代、连接重置），"抓一次揣着用"会变成永久坏的控件。
     * 所以每次读写都重新解析，解析失败就退避重试；订阅在一次成功解析后建立。
     */
    function createDirectoryAccess(ctx, sessionId, timers) {
      var listeners = new Set();
      var directory = null;
      var unsubscribe = null;
      var last = EMPTY_SNAPSHOT;
      var retryIndex = 0;
      var retryTimer = null;
      var closed = false;
      var lastLoadAt = 0;

      function notify() {
        var current = [];
        listeners.forEach(function (listener) { current.push(listener); });
        for (var i = 0; i < current.length; i += 1) {
          try { current[i](); } catch (error) { /* 单个订阅者抛错不影响其它订阅者 */ }
        }
      }

      function scheduleRetry() {
        if (closed || retryTimer !== null || retryIndex >= RETRY_DELAYS.length) return;
        var delay = RETRY_DELAYS[retryIndex];
        retryIndex += 1;
        retryTimer = timers.set(function () {
          retryTimer = null;
          // 解析成功后要主动通知一次：调用方（uSES）正等着 store 出现。
          if (resolve() !== null) {
            notify();
            return;
          }
          // 还没就绪就继续退避 —— 少了这一句，第一次重试失败后自愈链就永久断掉，
          // 控件会静默失效（这正是要防的那种"一次启动期抖动变成永久坏控件"）。
          scheduleRetry();
        }, delay);
      }

      /** 重新解析一次目录；实例变化时重挂订阅。返回当前目录（可能为 null）。 */
      function resolve() {
        if (closed) return null;
        var fresh = null;
        try {
          fresh = ctx.modelDirectories.directoryFor(sessionId);
        } catch (error) {
          fresh = null;
        }
        if (!fresh || !fresh.store || typeof fresh.store.getSnapshot !== "function") fresh = null;
        if (fresh === directory) return directory;
        if (unsubscribe !== null) {
          try { unsubscribe(); } catch (error) { /* 退订失败不影响新订阅 */ }
          unsubscribe = null;
        }
        directory = fresh;
        if (directory !== null) {
          retryIndex = 0;
          try {
            unsubscribe = typeof directory.store.subscribe === "function" ? directory.store.subscribe(notify) : null;
          } catch (error) {
            unsubscribe = null;
          }
          kickLoad();
        }
        return directory;
      }

      /** 主动拉一次目录（不 load 的话 store 停在 idle，档位列表是空的）。 */
      function kickLoad() {
        if (closed || directory === null || typeof directory.load !== "function") return;
        var now = Date.now();
        if (now - lastLoadAt < 400) return;
        lastLoadAt = now;
        var target = directory;
        try {
          Promise.resolve(target.load()).catch(function () { /* 失败原因由 store 的 error 字段呈现 */ });
        } catch (error) {
          /* load 同步抛：同样交给 store 状态 */
        }
      }

      return {
        getSnapshot: function () {
          if (closed) return EMPTY_SNAPSHOT;
          if (directory === null) {
            resolve();
            if (directory === null) scheduleRetry();
          }
          if (directory !== null) {
            try {
              var value = directory.store.getSnapshot();
              if (value && typeof value === "object") last = value;
            } catch (error) {
              /* 保留上一次快照，绝不把渲染打崩 */
            }
          }
          return last;
        },
        subscribe: function (listener) {
          if (closed) return function () {};
          listeners.add(listener);
          if (directory === null) {
            resolve();
            if (directory === null) scheduleRetry();
          }
          // StrictMode 会订阅/退订各跑一次；退订只清订阅，不永久关闭访问器。
          return function () {
            listeners.delete(listener);
          };
        },
        /** 取当前真正可写的目录（load/select 在调用时重新解析，避免用失效实例）。 */
        directory: function () {
          var fresh = resolve();
          return fresh !== null ? fresh : directory;
        },
        load: kickLoad,
        dispose: function () {
          closed = true;
          listeners.clear();
          if (retryTimer !== null) {
            try { timers.clear(retryTimer); } catch (error) { /* 忽略 */ }
            retryTimer = null;
          }
          if (unsubscribe !== null) {
            try { unsubscribe(); } catch (error) { /* 忽略 */ }
            unsubscribe = null;
          }
          directory = null;
        },
      };
    }

    /* ══════════ 官方菜单那一行的 DOM 桥（只动那一行，fail-open）══════════ */

    function firstSpanText(row) {
      try {
        var spans = row.querySelectorAll("span");
        for (var i = 0; i < spans.length; i += 1) {
          var text = spans[i].textContent;
          if (typeof text === "string" && text.length > 0) return text;
        }
      } catch (error) {
        /* 认不出就算了，调用方会退到结构判定 */
      }
      return "";
    }

    /**
     * 官方那一行右侧的**数值文字**（"Max" / "High"）—— 就是 `.cellValue` 那个 span。
     * 找不到 class 时退到结构：行内最后一个非空文字的 span（数值在标签之后、箭头之前）。
     * 只改它的颜色，文字内容一律不碰。
     */
    function findValueElement(row) {
      if (!row || typeof row.querySelectorAll !== "function") return null;
      try {
        var byClass = row.querySelectorAll("span[class*='cellValue']");
        if (byClass.length > 0) return byClass[byClass.length - 1];
        var spans = row.querySelectorAll("span");
        var found = null;
        for (var i = 0; i < spans.length; i += 1) {
          var text = spans[i].textContent;
          if (typeof text === "string" && text.replace(/\s+/g, "").length > 0) found = spans[i];
        }
        return found;
      } catch (error) {
        return null;
      }
    }

    /**
     * **收起的模型席按钮**（"DeepSeek-V41-Flash  High  ⌄"）里只显示档位名的那一小段文字。
     *
     * 官方渲染它用的是哈希 class（`wq12jW_triggerEffort`，前缀随构建变），靠 class 认迟早会失效，
     * 所以按**文字**认：官方 trigger 里的档位文字就是档位的 `name`，和我们从目录读到的是同一份数据。
     *
     * 传**全部档位名**（而不是只要当前那个）：档位刚切换、官方还没重渲染席按钮时，
     * 文字还是旧档位名 —— 只认当前名字会在那一瞬间"放手"，颜色闪一下。
     * 认不出任何已知档位名就返回 null（fail-open，绝不动别的文字）。
     */
    function findSeatEffort(doc, composer, expectedLabels) {
      if (!doc || !composer || typeof doc.querySelectorAll !== "function") return null;
      var list = typeof expectedLabels === "string" ? [expectedLabels] : expectedLabels;
      if (Object.prototype.toString.call(list) !== "[object Array]") return null;
      var wanted = [];
      for (var n = 0; n < list.length; n += 1) {
        var name = typeof list[n] === "string" ? list[n].replace(/\s+/g, "") : "";
        if (name.length > 0 && wanted.indexOf(name) < 0) wanted.push(name);
      }
      if (wanted.length === 0) return null;
      try {
        var seats = doc.querySelectorAll('button[aria-haspopup="menu"]');
        for (var i = 0; i < seats.length; i += 1) {
          if (!composer.contains(seats[i])) continue;
          var spans = seats[i].querySelectorAll("span");
          for (var j = 0; j < spans.length; j += 1) {
            var text = spans[j].textContent;
            if (typeof text === "string" && wanted.indexOf(text.replace(/\s+/g, "")) >= 0) return spans[j];
          }
        }
      } catch (error) {
        return null;
      }
      return null;
    }

    /**
     * 在自己所属的 composer 里，找到"打开的那颗官方模型席"对应的菜单，再找到推理等级那一行。
     * 全部用官方**语义属性**（aria-haspopup / aria-expanded / aria-controls / role）定位，
     * 不依赖哈希 class —— 官方改样式不会影响这里，改语义才会（那种改动会先在我的测试里炸掉）。
     */
    function findEffortRow(doc, composer) {
      if (!doc || !composer || typeof doc.querySelectorAll !== "function") return null;
      var seats = doc.querySelectorAll('button[aria-haspopup="menu"][aria-expanded="true"]');
      var seat = null;
      for (var i = 0; i < seats.length; i += 1) {
        if (composer.contains(seats[i])) { seat = seats[i]; break; }
      }
      if (seat === null) return null;

      var menuId = typeof seat.getAttribute === "function" ? seat.getAttribute("aria-controls") : null;
      var menu = menuId && typeof doc.getElementById === "function" ? doc.getElementById(menuId) : null;
      if (!menu) return null;

      var items = menu.querySelectorAll('button[role="menuitem"]');
      if (items.length !== 2) return null; // 根面板恰好两行；子面板用的是 menuitemradio
      for (var j = 0; j < items.length; j += 1) {
        var label = firstSpanText(items[j]);
        for (var k = 0; k < EFFORT_ROW_LABELS.length; k += 1) {
          if (label === EFFORT_ROW_LABELS[k]) return items[j];
        }
      }
      // 文案认不出（官方改了措辞/别的语言）就按官方固定顺序：第 2 个 menuitem 是推理等级。
      return items[1];
    }

    /**
     * 监听文档，把滑条容器挂进官方那一行。
     *
     * @param options.doc      宿主 document
     * @param options.win       宿主 window（派发 resize 让官方重测菜单位置）
     * @param options.anchor    () => 本会话在 composer 里的锚点元素（用来判定"哪颗席是我的"）
     * @param options.active    () => boolean，当前是否值得注入（没有档位就不注入，免得白加高）
     * @param options.onChange  (host | null) => void
     */
    function createMenuBridge(options) {
      var doc = options.doc;
      var win = options.win;
      var anchor = options.anchor;
      var active = options.active;
      var onChange = options.onChange;
      if (!doc || typeof doc.createElement !== "function") return null;

      var current = null;
      var seat = null; // 收起态那一行里的档位文字（菜单没打开时也要着色）
      var seatColor = ""; // 组件给的当前颜色：重新抓到元素时立刻补上，不必等下一次渲染
      var observer = null;
      var timer = null;
      var disposed = false;
      var seatLabels = options.seatLabels; // () => string[]，全部已知档位名

      /** 本会话的 composer 容器：从锚点往上找官方给 composer 卡片打的标记。 */
      function composerOf() {
        var node = anchor();
        if (!node) return null;
        var el = node;
        while (el && el.nodeType === 1) {
          if (typeof el.getAttribute === "function" && el.getAttribute("data-composer-card") !== null) return el;
          el = el.parentNode;
        }
        return null;
      }

      function detach() {
        if (current === null) return;
        var row = current.row;
        var container = current.container;
        try {
          if (container && container.parentNode) container.parentNode.removeChild(container);
        } catch (error) { /* 行可能已经被官方卸载 */ }
        try {
          var previous = current.previous;
          if (row && row.style) {
            row.style.height = previous.height;
            row.style.flexWrap = previous.flexWrap;
            row.style.paddingTop = previous.paddingTop;
            row.style.paddingBottom = previous.paddingBottom;
            row.style.boxShadow = previous.boxShadow;
          }
          // 数值文字（"Max"）的颜色也是我们改的，退出时一并还原
          if (current.value && current.value.style) current.value.style.color = previous.valueColor;
        } catch (error) { /* 还原失败不影响官方菜单自身 */ }
        current = null;
        onChange(null);
      }

      /** 收起的档位文字：还原本来的颜色并忘掉它。 */
      function releaseSeat() {
        if (seat === null) return;
        try {
          if (seat.el && seat.el.style) seat.el.style.color = seat.previousColor;
        } catch (error) { /* 元素可能已被官方卸载 */ }
        seat = null;
      }

      /**
       * 同步收起态的档位文字。
       * 只在**元素换了**（官方重渲染换了节点）或还没抓到时重新抓 —— 文字变了不换元素，
       * 所以档位切换不会造成"还原→再上色"的闪动。
       */
      function syncSeat() {
        var composer = composerOf();
        if (composer === null || active() !== true) { releaseSeat(); return; }
        if (seat !== null && seat.el && doc.documentElement && doc.documentElement.contains(seat.el)) {
          if (seatColor && seat.el.style) seat.el.style.color = seatColor; // 官方清过内联样式就补回来
          return;
        }
        releaseSeat();
        var wanted = typeof seatLabels === "function" ? seatLabels() : null;
        var el = findSeatEffort(doc, composer, wanted);
        if (el === null || !el.style) return;
        seat = { el: el, previousColor: el.style.color || "" };
        if (seatColor) el.style.color = seatColor;
      }

      function scan() {
        if (disposed) return;
        // 收起态的档位文字：跟菜单那一行互相独立，任一处失败都不该拖垮另一处
        try { syncSeat(); } catch (error) { /* 忽略 */ }
        try {
          var composer = composerOf();
          if (composer === null || active() !== true) { detach(); return; }
          // 已经挂好且那一行还在 → 什么都不做
          if (current !== null && current.row && doc.documentElement && doc.documentElement.contains(current.row)) return;

          var row = findEffortRow(doc, composer);
          if (row === null) { detach(); return; }
          detach();

          var value = findValueElement(row);
          var previous = {
            // 真实 DOM 里未设置的内联属性读作 ""，这里统一成同样的语义，还原时才不会写回
            // 字面量 "undefined"（那在浏览器里是无效值，会把我们的加高留在原地）。
            height: row.style.height || "",
            flexWrap: row.style.flexWrap || "",
            paddingTop: row.style.paddingTop || "",
            paddingBottom: row.style.paddingBottom || "",
            boxShadow: row.style.boxShadow || "",
            // 数值文字原来的内联颜色（通常没设过，读作 ""）
            valueColor: value && value.style ? value.style.color || "" : "",
          };
          // 「加高那一栏的上下距离」+ 允许折行，让滑条落到第二行并铺满整行宽度。
          row.style.height = "auto";
          row.style.flexWrap = "wrap";
          row.style.paddingTop = ROW_PADDING_BLOCK;
          row.style.paddingBottom = ROW_PADDING_BLOCK;

          var container = doc.createElement("div");
          container.className = "ces-inline";
          container.setAttribute("data-ces-part", "host");
          row.appendChild(container);

          current = { row: row, container: container, value: value, previous: previous };
          onChange(current);

          // 官方菜单是"测量后固定定位"的，加高后让它重测一次（官方自己在 resize 里重测并夹取）。
          try {
            win.dispatchEvent(new win.Event("resize"));
          } catch (error) { /* 宿主没有 Event 构造器就算了，官方也会在状态变化时重测 */ }
        } catch (error) {
          try { detach(); } catch (inner) { /* 兜到底 */ }
        }
      }

      function start() {
        scan();
        var MO = win && (win.MutationObserver || (typeof MutationObserver === "function" ? MutationObserver : null));
        if (typeof MO === "function") {
          try {
            observer = new MO(function () { scan(); });
            observer.observe(doc.body || doc.documentElement, { childList: true, subtree: true });
            return;
          } catch (error) {
            observer = null;
          }
        }
        // 没有 MutationObserver 时退化成低频轮询；反正每轮都很便宜。
        if (win && typeof win.setInterval === "function") timer = win.setInterval(scan, 400);
      }

      return {
        scan: scan,
        start: start,
        /** 组件把当前该用的颜色给进来；桥负责在（重新）抓到元素时立刻应用。 */
        setSeatColor: function (color) {
          seatColor = typeof color === "string" ? color : "";
          if (seat !== null && seat.el && seat.el.style) {
            try { seat.el.style.color = seatColor; } catch (error) { /* 忽略 */ }
          }
        },
        dispose: function () {
          disposed = true;
          if (observer !== null) {
            try { observer.disconnect(); } catch (error) { /* 忽略 */ }
            observer = null;
          }
          if (timer !== null) {
            try { win.clearInterval(timer); } catch (error) { /* 忽略 */ }
            timer = null;
          }
          releaseSeat();
          detach();
        },
        host: function () { return current; },
      };
    }

    /* ════════════════════════════ 组件 ════════════════════════════ */

    /**
     * 单组件设计：锚点 + 桥 + 滑条（portal 进官方那一行）都在同一个函数里，
     * 所有 hook 都在同一个实例上，展开/收起不会改变 hook 顺序。
     */
    function CodexEffortSlider(props) {
      var sessionId = typeof props.sessionId === "string" && props.sessionId.length > 0 ? props.sessionId : null;
      var locked = props.locked === true;
      var ctx = props.__ctx;

      /* ⚠️⚠️ 本插件的三种动画**完全不受系统「减少动态效果」影响**（用户明确要求）。
         所以：reducedMotion 恒为 false —— 作者原本的"减少动态 → jumpTo"分支全部成为死代码；
         动画强度只由设置里的 motion 决定（quick = 简洁 / full = 完整 / fast = 快速·Codex 手感）。 */
      /* ⚠️⚠️ 唯一实例守卫 —— 实测这个插件会被**加载两次**（两份模块、两个滑条组件），
         两份引擎的 draft 会渲染进官方同一行、互相打架 → 视觉上"松手乱跳"，
         而且只在**重启**后出现（热重载时只有一份，所以手感正常）。
         只允许第一份活着的实例渲染；其余返回 null。
         ⚠️ Hooks 顺序：判定只做一次且永不改变（__cesDecided），所以每个实例的 Hook 数量恒定。 */
      var __slotWin = (typeof window !== "undefined") ? window : null;
      if (!__cesDecided && __slotWin) {
        __cesDecided = true;
        if (__slotWin.__cesActiveSliderOwner == null) {
          __slotWin.__cesActiveSliderOwner = __cesOwnerToken;
          __cesIsOwner = true;
        }
      } else if (!__slotWin) {
        __cesDecided = true;
        __cesIsOwner = true;
      }
      if (__cesIsOwner) {
        // 只有 owner 会调用这个 effect（非 owner 在下面直接 return null，不调用任何 Hook）
        React.useEffect(function () {
          return function () {
            if (typeof window !== "undefined" && window.__cesActiveSliderOwner === __cesOwnerToken) {
              window.__cesActiveSliderOwner = null;   // 释放，让后来的一份还能接管
            }
          };
        }, []);
      } else {
        return null;
      }

      /** 本组件实例的编号（诊断）。 */
      var __cesInstanceId = (window.__cesInstanceSeq = (window.__cesInstanceSeq || 0) + 1);
      var reducedMotion = false;
      /** 只用于观感（星尘放缓 / 提示文案 / data-motion），取值来自设置。 */
      var effectiveReducedMotion = motionMode() === "quick";

      var settingsTick = React.useState(0);

      React.useEffect(function () {
        installSettingsUi();
        var bump = function () { settingsTick[1](function (n) { return n + 1; }); };
        if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
          window.addEventListener(settingsEventName(), bump);
        }
        return function () {
          if (typeof window !== "undefined" && typeof window.removeEventListener === "function") {
            window.removeEventListener(settingsEventName(), bump);
          }
        };
      }, []);

      /** 拖动安全网用的按键状态（pointerup 只挂在轨道上，轨道外松开时会丢事件）。 */
      var buttonDownRef = React.useRef(false);
      /** 当前渲染下的"已生效档位"百分比（循环闭包要读最新值，不能用闭包变量）。 */
      var effectivePctRef = React.useRef(0);
      /** 吸附完成后为等提交追上而多持有显示的帧数（兜底上限）。 */
      var holdFramesRef = React.useRef(0);
      /** 上一次"已写回宿主"的档位下标：拖动时只在**跨过档位边界**的那一刻写一次。 */
      var lastCommittedIndexRef = React.useRef(-1);
      /** 松手提交重试的代次：每次按下拖动就 +1，旧重试立即作废（绝不能覆盖新操作）。 */
      var releaseGenRef = React.useRef(0);
      /** 最近一次**有效**档位下标：档位列表暂时为空时的显示兜底（绝不用 0）。 */
      var lastValidIndexRef = React.useRef(0);
      /** 本次渲染解析出的档位列表：`endDrag` 这类"长寿闭包"必须读 ref，不能读闭包变量。 */
      var levelsRef = React.useRef([]);
      /**
       * 最新一版的 `endDrag`。
       * 窗口级 pointerup 安全网只在**挂载时**绑定一次；如果它直接调用闭包里的 `endDrag`，
       * 用的就永远是**首次渲染**的那份闭包 —— 而首渲染时 `levelCount` 还是 0 ✗，
       * 于是每次松手都走 `release-abort` → 不写回 → 显示交还旧档位 = 用户说的"点一下顿一下"。
       * 诊断证据：`{"k":"endDrag-enter","inst":1,…}` 后面紧跟 `release-abort levelCount=0`。
       */
      var endDragRef = React.useRef(null);
      /** 快速动画的"当前停在第几格"（-1 = 还没对齐过）。 */
      var detentIndexRef = React.useRef(-1);
      React.useEffect(function () {
        if (typeof window === "undefined" || typeof window.addEventListener !== "function") return undefined;
        var stopDrag = function () {
          buttonDownRef.current = false;
          // ⚠️ 必须调用**最新**的 endDrag：这个监听只绑定一次，闭包里的 endDrag 是首渲染的旧版本。
          if (draggingRef.current && typeof endDragRef.current === "function") endDragRef.current();
        };
        window.addEventListener("pointerup", stopDrag, true);
        window.addEventListener("pointercancel", stopDrag, true);
        return function () {
          window.removeEventListener("pointerup", stopDrag, true);
          window.removeEventListener("pointercancel", stopDrag, true);
        };
      }, []);

      var access = React.useMemo(
        function () {
          if (sessionId === null || !ctx) return null;
          return createDirectoryAccess(ctx, sessionId, {
            set: function (fn, delay) { return setTimeout(fn, delay); },
            clear: function (handle) { clearTimeout(handle); },
          });
        },
        [ctx, sessionId],
      );

      React.useEffect(function () {
        return function () {
          if (access !== null) access.dispose();
        };
      }, [access]);

      var subscribe = React.useCallback(
        function (onChange) { return access === null ? function () {} : access.subscribe(onChange); },
        [access],
      );
      var getSnapshot = React.useCallback(
        function () { return access === null ? EMPTY_SNAPSHOT : access.getSnapshot(); },
        [access],
      );
      var state = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

      var liveLevels = levelsOf(state);
      // 模型身份：缓存的有效性判断（provider + model 变了就不复用缓存）。
      var liveLevelKey = (state && state.current && typeof state.current.provider === "string" && typeof state.current.model === "string")
        ? state.current.provider + "\u0000" + state.current.model
        : null;
      var levels = resolveLevels(liveLevels, liveLevelKey, __levelsCache);
      // 只在"活列表为空、靠缓存兜底"时记一笔（正常渲染不刷屏）
      var levelsCacheUsed = liveLevels.length === 0 && levels.length > 0;
      if (levelsCacheUsed !== __levelsCacheHit) {
        __levelsCacheHit = levelsCacheUsed;
        tracePush({ k: "levels-cache", hit: levelsCacheUsed, n: levels.length, emptyLive: liveLevels.length === 0 });
      }
      var effectiveId = effectiveEffortId(state);
      var committedIndex = indexOfLevel(levels, effectiveId);
      var levelCount = levels.length;

      var draftState = React.useState(null);
      var draft = draftState[0];
      var setDraft = draftState[1];
      var optimisticState = React.useState(null);
      var optimistic = optimisticState[0];
      var setOptimistic = optimisticState[1];
      var errorState = React.useState(null);
      var errorText_ = errorState[0];
      var setError = errorState[1];
      var busyState = React.useState(false);
      var busy = busyState[0];
      var setBusy = busyState[1];
      var hostState = React.useState(null);
      var host = hostState[0];
      var setHost = hostState[1];

      var anchorRef = React.useRef(null);
      var trackRef = React.useRef(null);
      var optimisticIdRef = React.useRef(null);
      /** 拖动的"最新位置"放 ref：React 会把同一 tick 的多次 setState 合并，
       *  松手那一帧若从 state 读位置，可能读到上一次渲染的旧值，从而写错档位。 */
      var draftRef = React.useRef(null);
      var commitRef = React.useRef({ timer: null, inFlight: false, queued: null, safetyTimer: null });
      var draggingRef = React.useRef(false);
      var levelCountRef = React.useRef(0);
      var seatNamesRef = React.useRef([]); // 全部已知档位名（认官方席按钮上的那段文字用）
      var bridgeRef = React.useRef(null);
      levelCountRef.current = levelCount;
      // 每次渲染都把"最新"的档位列表与 endDrag 放进 ref（供窗口安全网等长寿闭包读取）
      levelsRef.current = levels;
      endDragRef.current = endDrag;

      /* 桥：找到官方菜单那一行，把滑条容器挂进去 */
      React.useEffect(function () {
        if (sessionId === null || !ctx) return undefined;
        var bridge = createMenuBridge({
          doc: typeof document === "undefined" ? null : document,
          win: typeof window === "undefined" ? null : window,
          anchor: function () { return anchorRef.current; },
          active: function () { return levelCountRef.current > 0; },
          onChange: function (next) { setHost(next); },
          // 收起态那一行显示的档位名（官方 trigger 里的文字就是它）；给全部名字更抗"官方还没重渲染"
          seatLabels: function () { return seatNamesRef.current; },
        });
        if (bridge === null) return undefined;
        bridgeRef.current = bridge;
        bridge.start();
        return function () {
          bridgeRef.current = null;
          bridge.dispose();
        };
      }, [ctx, sessionId]);

      /**
       * 档位是**后到**的（目录 load 完才有 efforts）。那时 DOM 没有任何变化，
       * MutationObserver 不会响，所以这里在档位数变化时主动重扫一次 ——
       * 少了这一句，"目录晚到"会让滑条永远挂不上去（起步期抖动变永久失效）。
       */
      React.useEffect(function () {
        if (bridgeRef.current !== null) bridgeRef.current.scan();
      }, [levelCount]);

      // 乐观值：提交后先按用户选的那一档显示，直到宿主真实回报（或超时回滚）。
      var optimisticId = optimistic !== null && typeof optimistic.id === "string" ? optimistic.id : null;
      var optimisticIndex = optimisticId === null ? -1 : indexOfLevel(levels, optimisticId);

      // **已生效**的档位（乐观值优先，其次真实值）：收起态那一行显示的是它，不是拖动中的草稿。
      // ⚠️ 兜底**绝不能用 0**：档位列表暂时为空/未就绪时，用"最近一次有效档位"。
      //    用 0 会让显示瞬间跳到最左（实测就是"闪回最左边"那一下）。
      if (committedIndex >= 0) lastValidIndexRef.current = committedIndex;
      // 兜底优先级：①最近一次有效档位（且仍落在当前列表范围内）②当前档位数的正中（issue #6 的约定）。
      // 绝不默认 0（0 = 最左 / off，看起来就是"显示错档位"）。
      var midIndex = Math.max(0, Math.min(Math.max(0, levelCount - 1), Math.floor((levelCount - 1) / 2)));
      var lastIdx = lastValidIndexRef.current;
      var fallbackIndex = (typeof lastIdx === "number" && lastIdx >= 0 && lastIdx < levelCount) ? lastIdx : midIndex;
      var effectiveIndex = committedIndex >= 0 ? committedIndex : fallbackIndex;
      if (optimisticIndex >= 0) effectiveIndex = optimisticIndex;
      var effectivePct = pctFromIndex(effectiveIndex, levelCount);
      effectivePctRef.current = effectivePct;
      var effectiveLevel = levels[effectiveIndex] || null;
      // 席按钮上可能出现的是**任意一个档位名**（档位刚切换时官方还没重渲染）
      var seatNames = [];
      for (var n = 0; n < levels.length; n += 1) {
        if (levels[n] && typeof levels[n].name === "string" && levels[n].name.length > 0) seatNames.push(levels[n].name);
      }
      seatNamesRef.current = seatNames;

      // 显示用的档位：拖动中跟着草稿，否则就是已生效那一档。
      var shownIndex = draft !== null ? draft.index : effectiveIndex;
      var shownPct = draft !== null && typeof draft.pct === "number" ? draft.pct : effectivePct;
      // 诊断：万一出现"松手抽搐"，用它一眼看出哪一帧、哪个值跳了
      // `w` = 轨道实际宽度 ✓（用户反馈"拉动时整个滑条像被拉伸"✗ —— 若 w 在拖动中变化 ✓，
      //        说明官方那一行在重排 ✗（例如右侧数值文字变宽 ✗），这就是"拉伸"的量化证据 ✓）
      var __diagTrackWidth = (function () {
        try {
          var tr = trackRef.current;
          return tr && typeof tr.getBoundingClientRect === "function" ? Math.round(tr.getBoundingClientRect().width) : -1;
        } catch (error) { return -1; }
      })();
      tracePush({ k: "s", inst: __cesInstanceId, t: (typeof performance !== "undefined" ? Math.round(performance.now()) : 0), shown: Math.round(shownPct * 10000) / 10000, eff: Math.round(effectivePct * 10000) / 10000, draft: draft === null ? null : Math.round(draft.pct * 10000) / 10000, w: __diagTrackWidth, mode: motionMode() });
      var shownLevel = levels[shownIndex] || null;

      // 三个由**位置**连续驱动的量：填充色（蓝→紫→深紫）、能量强度（星云+星星渐入）、位置速率。
      var energy = energyFor(shownPct);
      var energyOn = energy > 0;
      var fillBackground = fillBackgroundFor(shownPct);
      var knobOffset = knobOffsetOf(shownPct);

      // 官方那一行在最高档时描一圈紫边，强度跟着能量走（写内联样式，退出时由桥还原）。
      React.useEffect(function () {
        if (host === null || !host.row || !host.row.style) return;
        host.row.style.boxShadow = energyOn
          ? "inset 0 0 0 1px rgba(168,85,247," + (0.16 + 0.34 * energy).toFixed(2) + ")"
          : "";
      }, [host, energyOn, energy]);

      // 官方那一行的**数值文字**（"Max"）也跟着位置变色：蓝 → 亮紫（用户要求）。
      // 同样写内联、退出时由桥还原；**只改颜色，文字内容一个字都不碰**。
      React.useEffect(function () {
        if (host === null || !host.value || !host.value.style) return;
        host.value.style.color = valueColorFor(shownPct, shownLevel);
      }, [host, shownPct, shownLevel]);

      // **收起态**那一行的档位文字（模型席按钮上的 "High"，菜单没打开时就看得见）也跟着变色。
      // 颜色交给桥保管：官方重渲染换了节点时，桥会在重新抓到的那一刻补上，不必等 React。
      // 注意这里用**已生效**的档位（不是拖动中的草稿）—— 收起态显示的是真实档位。
      React.useEffect(function () {
        if (bridgeRef.current === null) return;
        bridgeRef.current.setSeatColor(valueColorFor(effectivePct, effectiveLevel));
      }, [levelCount, effectivePct, effectiveLevel]);

      // 宿主追上乐观值 → 撤掉乐观态（此后以真实目录为准）。
      React.useEffect(function () {
        if (optimisticId !== null && effectiveId === optimisticId) setOptimistic(null);
      }, [effectiveId, optimisticId]);

      // 超时兜底：宿主迟迟不回报就回滚并说明，不继续假装已生效。
      React.useEffect(function () {
        if (optimisticId === null) return undefined;
        var handle = setTimeout(function () {
          if (optimisticIdRef.current === optimisticId) {
            optimisticIdRef.current = null;
            setOptimistic(null);
            setError("档位切换超时，宿主未回报结果（已回滚显示）");
          }
        }, COMMIT_DEADLINE_MS);
        return function () { clearTimeout(handle); };
      }, [optimisticId]);

      // 组件卸载：清掉降频定时器（否则会在卸载后写一次宿主）。
      React.useEffect(function () {
        return function () {
          var pending = commitRef.current;
          if (pending.timer !== null) {
            clearTimeout(pending.timer);
            pending.timer = null;
          }
          pending.queued = null;
        };
      }, []);

      function currentState() {
        return access === null ? EMPTY_SNAPSHOT : access.getSnapshot();
      }

      function flush() {
        var pending = commitRef.current;
        if (pending.timer !== null) {
          clearTimeout(pending.timer);
          pending.timer = null;
        }
        var levelId = pending.queued;
        pending.queued = null;
        if (pending.safetyTimer !== null) { clearTimeout(pending.safetyTimer); pending.safetyTimer = null; }
        tracePush({ k: "flush", id: levelId });
        if (levelId === null || levelId === undefined || access === null) return;

        var snapshot = currentState();
        var current = snapshot && snapshot.current;
        if (!current || typeof current.provider !== "string" || typeof current.model !== "string") {
          setError("模型目录尚未就绪，无法写入档位");
          return;
        }
        // 发送前再判一次：可能宿主已经把这个档位写好了（去重的第二道闸）。
        if (effectiveEffortId(snapshot) === levelId) { tracePush({ k: "flush-skip", id: levelId, why: "dedupe" }); return; }

        var directory = access.directory();
        if (directory === null || typeof directory.select !== "function") {
          setError("模型目录不可用，档位未写入");
          return;
        }

        pending.inFlight = true;
        optimisticIdRef.current = levelId;
        setOptimistic({ id: levelId });
        setError(null);
        setBusy(true);

        var result;
        try {
          result = directory.select({
            provider: current.provider,
            model: current.model,
            reasoningEffort: levelId,
          });
        } catch (error) {
          result = Promise.reject(error);
        }

        Promise.resolve(result).then(
          function (outcome) {
            pending.inFlight = false;
            tracePush({ k: outcome && outcome.ok === false ? "commit-fail" : "commit-ok" });
            if (outcome && outcome.ok === false) {
              optimisticIdRef.current = null;
              setOptimistic(null);
              setError(errorText(outcome.error));
            }
          },
          function (error) {
            pending.inFlight = false;
            optimisticIdRef.current = null;
            setOptimistic(null);
            setError(errorText(error));
          },
        ).then(function () {
          setBusy(false);
          // 在途合并：拖动期间攒下的最新值在这里补发。
          tracePush({ k: "commit-settle", inFlight: pending.inFlight, queued: pending.queued });
          if (pending.queued !== null) flush();
        });
      }

      /** 请求写回某一档：同档位去重 + 在途合并 + 降频；immediate 用于松手/键盘。 */
      function requestCommit(levelId, immediate) {
        if (levelId === null || levelId === undefined) return;
        var pending = commitRef.current;
        var snapshot = currentState();
        if (effectiveEffortId(snapshot) === levelId && pending.queued === null && !pending.inFlight) return;
        pending.queued = levelId;
        tracePush({ k: "req", id: levelId, imm: immediate === true, inFlight: pending.inFlight, queued: pending.queued });
        if (pending.inFlight) {
          // ⚠️ 不能直接 return：那次在途的收尾可能**已经**跑完了（微任务早于本次同步调用），
          //    排队值就会永远躺在 queued 里没人发 —— 实测 eff 长期不更新就是这么来的。
          //    这里加一个**有界轮询**，直到在途结束并把它发出去。
          if (pending.safetyTimer === null) {
            var armSafety = function () {
              pending.safetyTimer = setTimeout(function () {
                pending.safetyTimer = null;
                if (pending.queued === null) return;
                if (pending.inFlight) { armSafety(); return; }
                tracePush({ k: "safety-flush", id: pending.queued });
                flush();
              }, 50);
            };
            armSafety();
          }
          return;
        }
        if (immediate === true) {
          flush();
          return;
        }
        if (pending.timer !== null) return;
        pending.timer = setTimeout(function () {
          pending.timer = null;
          flush();
        }, COMMIT_THROTTLE_MS);
      }

      /*
       * ── 引擎接线 ──
       * 四个入口（按下 / 拖动 / 松手 / 键盘）**只改 m.target 与 m.vPtr**，
       * 绝不写 m.x / m.v / m.a —— 这是整套模型的命门：
       * 一旦谁重置了运动状态，就退化成"取消旧动画播新动画"，割裂感立刻回来。
       */
      var motionRef = React.useRef(null);
      var frameRef = React.useRef(null);
      var lastTsRef = React.useRef(0);
      var lastPtrPctRef = React.useRef(null);
      /** 上一次的**指针原始位置**（未过卡扣映射），用来判断拖动方向（往回拖不震）。 */
      var rawPtrRef = React.useRef(null);
      /**
       * **上次 pointermove 的时刻**。单独用一个 ref，不能复用 lastTsRef ——
       * 后者是"上一帧的时刻"（帧循环每帧都改它），拿它算指针速度会得到错的 dt；
       * 而衰减判定要的正是"距上次真实指针事件过了多久"。
       */
      var lastPointerAtRef = React.useRef(0);
      /** 松手后"决定的档位"：吸附过程中档位标签要冻结在它上面，不能跟着中间位置跳。 */
      var snapIndexRef = React.useRef(null);

      function motionParams() {
        // 只看设置：「quick」= 简洁动画（紧参数）/「full」= 完整动画（他的松参数）
        return motionParamsForMode();
      }

      /** 懒建引擎：以当前显示位置为起点（**不是**从 0 或从档位点）。 */
      function ensureMotion() {
        if (motionRef.current === null) {
          var x0 = (draftRef.current !== null && typeof draftRef.current.pct === "number")
            ? draftRef.current.pct : shownPct;
          motionRef.current = { x: x0, v: 0, a: 0, target: x0, vPtr: 0 };
        }
        return motionRef.current;
      }

      /** 吸附过程中：档位冻结在决定的那个；拖动中：档位跟着位置走。 */
      function draftIndexFor(m) {
        if (draggingRef.current) return indexFromPct(m.x, levelCount);
        return snapIndexRef.current !== null ? snapIndexRef.current : indexFromPct(m.x, levelCount);
      }

      /**
       * 把引擎当前位置交给引擎之外的一切（四层渲染、能量、刻度都读 draft）。
       *
       * ⚠️ **位置没变就不惊动 React**：拖动期间帧循环现在会常驻（见 startFrames 里
       * 那段"为什么必须继续排下一帧"），如果每帧都无条件 setDraft，就变成
       * "指针按住不动也 60 次/秒重渲染整条滑条"（四层 + 22 个星星节点）——
       * 那是拿一种卡顿换另一种卡顿。所以这里先比一下。
       */
      function publishMotion(m) {
        var next = { pct: m.x, index: draftIndexFor(m) };
        var prev = draftRef.current;
        if (prev !== null && prev.pct === next.pct && prev.index === next.index) return;
        draftRef.current = next;
        setDraft(next);
      }

      /**
       * ⚠️ **引擎必须跟随"已生效档位"的变化**（这是一个真实 bug 的修法）。
       *
       * 场景（用户报的"点一下跳到 max"）：
       *   官方模型菜单是 **pane 状态机**（`root` / `model` / `effort`，见
       *   ui-model-selection 的 ModelSelect.tsx）：点进"推理等级"后 `pane='effort'`，
       *   **root 那一整块被替换掉** —— 我们注入的那一行（含滑条）随之不渲染，
       *   用户在那期间**看不到滑条**，也不可能同时拖动。
       *   选完档位回到 root 时，显示的档位已经变了（`effectivePct` 变了）。
       *
       *   而引擎 `x` 只被"滑条自己的操作"更新 —— 它**不知道**官方改了档位。实测：
       *     1) 滑块拖到 max    → 显示 1.0，引擎 x = 1.0
       *     2) 官方菜单选 low  → 显示 1/3（走 effectivePct），**引擎 x 仍是 1.0**
       *     3) 在滑块里点 max  → target=1.0 而 x 已=1.0 → **一帧内 settled**
       *                          → 显示从 1/3 直接跳成 1.0（瞬移，实测跳变 66.67%）
       *   点"显示位置 low"更明显：引擎从错误的 1.0 起点动画，
       *   会**先瞬移回 max 再往下滑**。
       *
       * 修法：**只有在引擎空闲时**（既不在拖动、也不在吸附 → `draftRef.current === null`）
       * 才把引擎对齐到 `effectivePct`。这样：
       *   · 官方改档（引擎空闲）→ 对齐到新档位 → 不再瞬移
       *   · 用户拖动/吸附中 → `draftRef.current !== null` → **不碰引擎**（用户操作优先）
       *
       * ⚠️ 绝不能把这个对齐放进 `ensureMotion()`：`endDrag()` 里也调用 `ensureMotion()`，
       * 而"快速按下即松手"时 `draftRef.current` 还是 null，那时对齐会把
       * `m.target` 改写成当前档位 → 松手算出的落点变成"原地不动" → **写回丢失**
       * （实测：60 次拖动的写回从 ≥1 次变成 0 次）。对齐必须只在"档位真的变了"时发生。
       */
      React.useEffect(function () {
        var m = motionRef.current;
        if (m === null) return;
        if (draftRef.current !== null) return;   // 拖动/吸附中：用户优先
        m.x = effectivePct;
        m.v = 0;
        m.a = 0;
        m.target = effectivePct;
        m.vPtr = 0;
      }, [effectivePct]);

      /**
       * 启动帧循环（幂等：已在跑就直接返回）。
       * dt 用**真实帧间隔**并夹到 MAX_FRAME_DT，避免切标签回来时一帧跳一大段。
       */
      function startFrames() {
        if (frameRef.current !== null) return;
        lastTsRef.current = nowMs();
        var step = function (ts) {
          frameRef.current = null;   // 诊断：能走到这里通常是卸载/重挂载
          var m = motionRef.current;
          if (m === null) return;
          var p = motionParams();
          // 跳档（跨过档位格点）时切到快速参数：啪一下到位，别拖泥带水。
          if (m.snap) p = MOTION_FAST;
          var dt = Math.min(MAX_FRAME_DT, Math.max(0.001, (ts - lastTsRef.current) / 1000));
          lastTsRef.current = ts;
          // ⚠️ 每帧先让**陈旧的指针速度**衰减（见 decayPointerSpeed 的注释）：
          // 指针停下后不再有 pointermove，vPtr 若不衰减就会冻结成一个恒定的力，
          // 而且让下面的到位判定永远不成立（循环空转）。
          // 注意这里用**距上次 pointermove 的实际时长**（不是帧间隔 dt）——
          // dt 每帧都被重置成 ~16ms，永远跨不过 33ms 的保鲜期，等于没衰减。
          var sincePointer = (ts - lastPointerAtRef.current) / 1000;
          m.vPtr = decayPointerSpeed(m.vPtr, sincePointer, POINTER_STALE_S, POINTER_SPEED_TAU);
          motionStep(m, dt, p);
          if (motionSettled(m, p)) {
            m.snap = false;
            // 到位：精确落到目标（消除浮点残差）
            m.x = m.target;
            m.v = 0;
            m.a = 0;
            if (draggingRef.current) {
              // ⚠️ 拖动中"到位"只意味着**追上了指针**，不是结束：
              // 手指还在按着，位置必须停在指针处，**不能**清掉 draft
              // （清了就会回落到已生效档位，滑块"自己跳回去"）。
              //
              // ⚠️⚠️ 而且**必须继续排下一帧**，不能在这里 return！
              // 早先在这里 return（想省掉空转），造成"拖动时的瞬间卡顿"：
              //   · 指针移动慢/短暂停顿时，滑块很容易追平 → 循环停
              //   · 下一个 pointermove 再 startFrames() → 那里会重置
              //     `lastTsRef.current = nowMs()`，于是**重启后的第一帧
              //     dt ≈ 0**（被夹到 1ms 下限）→ 那一帧位移为 0
              //   · 实测：指针只挪 0.5% 后循环 7 帧就停；重启第 1 帧位移
              //     0.0000%、第 2 帧才 0.2100% —— 视觉上就是"卡一下再动"
              //   · 快速拖动时滑块一直在追、循环不停，所以**偏偏慢拖才卡**
              // 代价：拖动期间即使指针完全不动也保持 ~0.03ms/帧 的空转，
              //       相对 16.7ms 的帧预算可以忽略。
              publishMotion(m);
              frameRef.current = scheduleFrame(step);
              return;
            }
            // 吸附完成：**只有提交回写真正追上了**，才把控制权交回 effectivePct。
            // ⚠️ 无条件交还时，提交还在路上 → 显示瞬间跳回【旧档位】= 抽搐。
            //    预览页没有这套回写管道，所以它从不跳 —— 这里对齐预览页的效果。
            if (Math.abs(effectivePctRef.current - m.target) > 0.001 && holdFramesRef.current < 45) {
              holdFramesRef.current += 1;   // 仅统计用
              draftRef.current = { pct: m.target, index: snapIndexRef.current };
              publishMotion(m);
              frameRef.current = scheduleFrame(step);
              return;   // 继续持有显示，等提交追上（~0.75s 兜底）
            }
            holdFramesRef.current = 0;
            tracePush({ k: "settle-clear", inst: __cesInstanceId, dragging: draggingRef.current, mX: Math.round(m.x * 10000) / 10000, mTarget: Math.round(m.target * 10000) / 10000 });
            draftRef.current = null;
            snapIndexRef.current = null;
            setDraft(null);
            return; // 停循环，不空转（此时确实没事可做了）
          }
          publishMotion(m);
          frameRef.current = scheduleFrame(step);
        };
        frameRef.current = scheduleFrame(step);
      }

      /** 立即到位（「减少动态效果」下的按下 / 松手 / 键盘：不做补间）。 */
      function jumpTo(targetPct) {
        var m = ensureMotion();
        m.target = targetPct;
        m.x = targetPct;
        m.v = 0;
        m.a = 0;
        m.vPtr = 0;
      }

      function pctAt(clientX) {
        var track = trackRef.current;
        if (!track || typeof track.getBoundingClientRect !== "function") return null;
        var rect = track.getBoundingClientRect();
        // 与视觉几何一致：指针落点映射到"旋钮圆心能到的那一段"，所以拖到最左/最右必定命中端点档位。
        var usable = rect.width - KNOB_RADIUS * 2;
        if (!(usable > 0)) return null;
        // 不 clamp：指针可以拖出轨道右侧（最高档蓄力段需要 pct > 1）
        return (clientX - rect.left - KNOB_RADIUS) / usable;
      }

      /** 吞掉事件：滑条在官方的 <button> 里，不能让拖动触发那一行的 onClick（会跳进等级列表）。 */
      function swallow(event) {
        if (event && typeof event.stopPropagation === "function") event.stopPropagation();
      }

      /** 拖动落点：只改 target（**不碰 x/v/a**），并按指针速度更新前馈。 */
      function moveTo(clientX) {
        if (levelCount === 0) return;
        var rawPct = pctAt(clientX);
        if (rawPct === null) return;
        // 卡扣手感：第一段跟手，之后每段"空档"，到下一格点才弹过去；最高档前蓄力颤动。
        var shakePx = 0;
        var pct = rawPct;
        if (motionMode() === "fast") {
          pct = Math.max(0, Math.min(1, rawPct));
        } else {
          var staged = stagedTarget(rawPct, levelCount);
          pct = staged.target;
          shakePx = staged.shake;
          // 只朝 Max 推进时颤动；往回拖（例如从 Max 拖回 High）不震
          if (shakePx > 0 && rawPtrRef.current !== null && rawPct < rawPtrRef.current) {
            shakePx = 0;
          }
        }
        rawPtrRef.current = rawPct;
        try {
          var shakeTrack = typeof document !== "undefined" ? document.querySelector('[data-ces-part="track"]') : null;
          if (shakeTrack) {
            shakeTrack.style.setProperty("--ces-shake", shakePx + "px");
            if (shakePx > 0.05) shakeTrack.setAttribute("data-shake", "1");
            else shakeTrack.removeAttribute("data-shake");
          }
        } catch (shakeError) { /* 颤动只是观感 */ }
        var m = ensureMotion();
        // 指针速度（EMA 平滑防抖）：用于前馈 + 松手外推。
        // ⚠️ 时间基准必须用**上次 pointermove 的时刻**（lastPointerAtRef），
        // 不能用 lastTsRef —— 后者是帧循环的帧时刻，两次 pointermove 之间可能夹着
        // 若干帧，拿它算 dt 会把速度算错（实测偏低，导致前馈失效）。
        var now = nowMs();
        var dtPtr = (now - lastPointerAtRef.current) / 1000;
        if (lastPtrPctRef.current !== null && dtPtr > 0.001) {
          var raw = (pct - lastPtrPctRef.current) / dtPtr;
          m.vPtr = m.vPtr * (1 - POINTER_SPEED_EMA) + clampAbs(raw, MOTION.vmax) * POINTER_SPEED_EMA;
        }
        lastPtrPctRef.current = pct;
        lastPointerAtRef.current = now; // ← 记录真实事件时刻（衰减判定也用它）
        // 三种模式的分岔点：只有「快速动画」是**不跟手**的（复刻 Codex，实测如此）。
        var fastMode = motionMode() === "fast";
        if (fastMode) {
          // 不跟手：目标永远是"档位格"，指针只在**越过判定线**时才把档位推进一格
          // （前进 1/3、后退 2/3，滞回；见 detentTargetIndex）。
          // 于是观感 = 旋钮停在格子上，一格一格跳，与 Codex 录屏一致。
          var pos = pct * Math.max(1, levelCount - 1);
          var curDetent = detentIndexRef.current;
          if (!(curDetent >= 0)) curDetent = indexFromPct(m.target, levelCount);
          curDetent = detentTargetIndex(pos, curDetent, levelCount, DETENT_THIRD);
          detentIndexRef.current = curDetent;
          m.target = pctFromIndex(curDetent, levelCount);
        } else {
          var prevIdx = indexFromPct(m.target, levelCount);
          m.target = pct; // ← 唯一被改的东西
          if (levelCount > 0 && indexFromPct(pct, levelCount) !== prevIdx) m.snap = true;
        }
        // 拖动即切档（"拖到哪档就变成哪一档"）：**只在跨档时**写一次。
        if (levelCount > 0) {
          var nowIndex = fastMode ? detentIndexRef.current : indexFromPct(pct, levelCount);
          if (nowIndex >= 0 && nowIndex !== lastCommittedIndexRef.current) {
            lastCommittedIndexRef.current = nowIndex;
            requestCommit(levels[nowIndex].id, false);
          }
        }
        // ⚠️⚠️ 拖动期间**不写回宿主** —— 逐帧诊断得出的结论，也是唯一能根治"松手抽搐"的做法：
        //   · 拖动期写回会让「已生效档位」在拖动过程中不停变化，而引擎位置是**连续滞后**的，
        //     两者必然不同步；松手把显示交还给 effectivePct 时就会看到一次跳变（实测 10.6% / 66%）。
        //   · 参考实现（Bai-2008 的 1.3.10）把"连续拖动期间写回宿主"降到 **0 次**，原因相同。
        //   · 视觉不依赖写回：拖动中显示的是 draft（引擎位置），"会落到哪一档"由本地纯函数算。
        //   · 写回只发生在真正确定意图的时刻：**松手（endDrag）**、键盘、点击档位。
        // （原实现是 `requestCommit(levels[indexFromPct(pct, levelCount)].id, false)`，
        //   即"每秒约 8 次打宿主"——正是上述不同步的来源。要恢复旧行为把那行加回来即可。）
        if (reducedMotion) {
          // 减少动态：直接到位（仍不发散跳变，因为位置就是目标）
          jumpTo(m.target);
          draftRef.current = { pct: m.target, index: indexFromPct(m.target, levelCount) };
          setDraft(draftRef.current);
          return;
        }
        startFrames();
      }

      function endDrag() {
        tracePush({ k: "endDrag-enter", inst: __cesInstanceId, dragging: draggingRef.current, buttonDown: buttonDownRef.current });
        if (!draggingRef.current) return;
        draggingRef.current = false;
        try { document.body.classList.remove('ces-dragging'); } catch (_dragError) { /* ignore */ }
        try {
          const dragTrack = document.querySelector('[data-ces-part="track"]');
          if (dragTrack) dragTrack.removeAttribute("data-dragging");
        } catch (_dragError2) { /* ignore */ }
        var m = ensureMotion();
        // ⚠️ 这里**必须**读 ref，不能读闭包变量：
        //    窗口级 pointerup 安全网是"挂载时绑定一次"的长寿闭包，直接读闭包里的
        //    levelCount/levels 会永远停在**首次渲染**（那时 levelCount 还是 0）✗ → 每次松手都
        //    release-abort → 不写回 → 显示交还旧档位 = "点一下顿一下"。
        var levelCountNow = levelCountRef.current;
        var levelsNow = levelsRef.current;
        // 档位列表真的为空（从未就绪）时仍然不能落点：indexFromPct(pct, 0) 恒返回 0。
        if (!(levelCountNow > 0) || !levelsNow || levelsNow.length < levelCountNow) {
          tracePush({ k: "release-abort", why: "levelCount=0", mTarget: Math.round(m.target * 10000) / 10000 });
          return;
        }
        tracePush({ k: "pre-release", mTarget: Math.round(m.target * 10000) / 10000, mX: Math.round(m.x * 10000) / 10000, vPtr: Math.round(m.vPtr * 1000) / 1000, levelCount: levelCountNow, projS: (typeof RELEASE_PROJECT_S === "undefined" ? "undef" : RELEASE_PROJECT_S), idxNow: indexFromPct(m.target, levelCountNow) });
        // 落点决策**与动画无关**：一律按指针速度外推。
        // （曾经让 reduced 分支跳过外推 —— 那是错的：无障碍设置只该改"怎么动"，
        //   不该改"落在哪一档"，否则同一个拖动在两种设置下结果不同。）
        var idx;
        if (motionMode() === "fast") {
          // 快速动画：拖动中目标已经推到格子上，松手不再外推、也不再补一段吸附（与 Codex 一致）。
          idx = detentIndexRef.current >= 0 ? detentIndexRef.current : indexFromPct(m.target, levelCountNow);
          idx = Math.max(0, Math.min(levelCountNow - 1, idx));
          m.vPtr = 0;
          m.target = pctFromIndex(idx, levelCountNow);
        } else {
          idx = releaseIndexFor(m.target, m.vPtr, levelCountNow);
          m.vPtr = 0;
          if (reducedMotion) {
            jumpTo(pctFromIndex(idx, levelCountNow));
          } else {
            // 松手：目标改为档位点，但运动状态（速度）**继承**下来 ——
            // 这样从拖到吸也是连续的，不会重播一段吸附动画。
            m.target = pctFromIndex(idx, levelCountNow);
          }
        }
        snapIndexRef.current = idx;
        // 写回与视觉无关（档位已由指针决定），所以**松手瞬间就发**。
        if (idx >= 0 && idx < levelCountNow) requestCommit(levelsNow[idx].id, true);
        tracePush({ k: "release", idx: idx, x: Math.round(m.x * 10000) / 10000, target: Math.round(m.target * 10000) / 10000, eff: Math.round(effectivePctRef.current * 10000) / 10000, showIdx: snapIndexRef.current });
        if (reducedMotion) {
          draftRef.current = null;
          snapIndexRef.current = null;
          setDraft(null);
          return;
        }
        publishMotion(m);
        startFrames();
      }

      function onTrackPointerDown(event) {
        if (locked || levelCount === 0) return;
        swallow(event);
        draggingRef.current = true;
        buttonDownRef.current = true;
        try { document.body.classList.add('ces-dragging'); } catch (_dragError) { /* 光标隐藏失败无妨 */ }
        try {
          if (event.currentTarget && event.currentTarget.setAttribute) event.currentTarget.setAttribute("data-dragging", "1");
        } catch (_dragError2) { /* ignore */ }
        // 起手时对齐"已写回档位"，避免刚按下就写一次无意义的档位
        lastCommittedIndexRef.current = -1;
        // 快速动画：按下即把"当前格"对齐到指针所在格（点击远处 = 直接跳到那一档）。
        detentIndexRef.current = -1;
        if (motionMode() === "fast") {
          var p0 = pctAt(event.clientX);
          if (p0 !== null && levelCount > 0) detentIndexRef.current = indexFromPct(p0, levelCount);
        }
        holdFramesRef.current = 0;
        releaseGenRef.current += 1;   // 新操作开始：上一次松手的提交重试立即作废
        snapIndexRef.current = null;
        try {
          if (event.currentTarget && typeof event.currentTarget.setPointerCapture === "function" && event.pointerId !== undefined) {
            event.currentTarget.setPointerCapture(event.pointerId);
          }
        } catch (error) { /* 指针捕获失败不影响拖动 */ }
        // 按下 = **召唤**：目标改成指针位置，但 x/v/a 全部保留（不是"抓住滑块"，没有抓取偏移）。
        lastPtrPctRef.current = null;
        moveTo(event.clientX);
      }

      function onTrackPointerMove(event) {
        if (!draggingRef.current) return;
        // 没按着键 ⇒ 不是拖动（松手瞬间的合并事件 / pointerup 丢失的残留状态）。
        // 只忽略、不结束：在这里 endDrag() 会导致"先往左再回正"那种抽搐。
        if (event && event.buttons === 0 && buttonDownRef.current !== true) return;
        swallow(event);
        moveTo(event.clientX);
      }

      function onKeyDown(event) {
        if (locked || levelCount === 0) return;
        var key = event.key;
        var index = draftRef.current !== null ? draftRef.current.index : shownIndex;
        var next = null;
        if (key === "ArrowLeft" || key === "ArrowDown") next = Math.max(0, index - 1);
        else if (key === "ArrowRight" || key === "ArrowUp") next = Math.min(levelCount - 1, index + 1);
        else if (key === "Home") next = 0;
        else if (key === "End") next = levelCount - 1;
        else return; // Escape / Enter / Tab 交给官方菜单自己处理
        swallow(event);
        if (typeof event.preventDefault === "function") event.preventDefault();
        // 键盘改档：同样**只改目标**，运动状态延续（不瞬移）。
        var m = ensureMotion();
        var targetPct = pctFromIndex(next, levelCount);
        if (reducedMotion) {
          jumpTo(targetPct);
          snapIndexRef.current = null;
          draftRef.current = null;
          setDraft(null);
        } else {
          snapIndexRef.current = next;
          m.target = targetPct;
          m.vPtr = 0;
          publishMotion(m);
          startFrames();
        }
        requestCommit(levels[next].id, true);
      }

      // 卸载时必须停掉帧循环，否则组件销毁后还会 setDraft 到已卸载的组件
      // （官方菜单反复开关时就会发生）。
      React.useEffect(function () {
        return function () {
          cancelFrame(frameRef.current);
          frameRef.current = null;
        };
      }, []);

      var trackTitle = "推理等级" + (shownLevel !== null ? "：" + shownLevel.name : "");
      if (effectiveReducedMotion) trackTitle += "（简洁动画：粒子已放缓）";

      var tickNodes = [];
      for (var t = 0; t < levelCount; t += 1) {
        tickNodes.push(React.createElement("span", {
          key: "tick-" + levels[t].id,
          className: "ces-tick",
          "data-ces-part": "tick",
          "data-on": t <= shownIndex ? "1" : "0",
          style: { left: knobOffsetOf(pctFromIndex(t, levelCount)) },
        }));
      }

      // ════════ 星空（2026-11-11 用户规格 ✓）════════
      // 1) **22 颗全部预渲染** ✓（不再按档位增减节点 ✗ → 不会因为插入/移除而"跳"✓）
      // 2) 基准 = **第二档** ✓：`starProgress = 0`（第二档）… 1（最右）✓
      //    → 第二档 **0 颗可见** ✓；第三档开始"慢慢出现" ✓
      // 3) **可见度**：每颗有自己的显现阈值（`threshold = i/21` ✓）→
      //    越往右，前面的"逐渐明显"✓（亮度 `glow` 上升 ✓）、后面的"逐渐显现"✓（opacity 淡入 ✓）
      // 4) **速度**：沿用 1.1.4 的 `speedFor(位置)` ✓ —— 因为 `starDelayFor(i,d) = -f_i × d`
      //    （延迟与时长**成比例** ✓），所以改速度时相位比例不变 ✓ → **不会倒退** ✓
      var STAR_TOTAL = PARTICLES.length;
      var starAnchor = levelCount > 1 ? pctFromIndex(1, levelCount) : 0;
      var starSpan = 1 - starAnchor;
      var starProgress = starSpan > 1e-6 ? clamp01((shownPct - starAnchor) / starSpan) : clamp01(shownPct);
      var positionSpeed = speedFor(shownPct);
      var starLayerOpacity = starLayerOpacityFor(shownPct);
      var starGlow = 0.45 + 0.55 * starProgress;   // 「逐渐明显」：已出现的越往右越亮 ✓
      var particleNodes = [];
      for (var s = 0; s < STAR_TOTAL; s += 1) {
        // 显现阈值：第 0 颗最先出现 ✓，最后一颗要拉到最后才完全显现 ✓
        var threshold = s / STAR_TOTAL;   // 最后一颗 = 21/22 ✓，最右时仍有 20% 显现 ✓（不会被卡在 0 ✗）
        var reveal = clamp01((starProgress - threshold) / 0.22);   // 0.22 = 过渡窗宽 ✓
        // High 档更稀疏：隔一颗显示一颗（Max 密度不变，Low 本来就没有）
        if (levelCount > 2 && shownIndex === levelCount - 2 && s % 2 === 1) reveal = 0;
        var starDuration = starDurationFor(s, positionSpeed);
        var starBrightness = starBrightnessFor(s) * starGlow;
        particleNodes.push(React.createElement(
          "span",
          {
            key: "star-" + s,
            className: "ces-star",
            "data-ces-part": "star",
            style: {
              top: PARTICLES[s].y + "%",
              // 速度：改时长 ✓，延迟按同一比例缩放 ✓（相位守恒 ✓，不倒退 ✓）
              animationDuration: starDuration.toFixed(3) + "s",
              animationDelay: starDelayFor(s, starDuration).toFixed(3) + "s",
            },
          },
          React.createElement("span", {
            className: "ces-star__dot",
            "data-ces-part": "particle",
            "data-brightness": starBrightness.toFixed(3),
            style: {
              // 「逐渐明显」(glow ✓) + 「逐渐显现」(opacity ✓)
              "--ces-b": starBrightness.toFixed(3),
              opacity: reveal.toFixed(3),
            },
          }),
        ));
      }

      /**
       * 「越往右越快」：用 **playbackRate** 缩放播放速度 ✓ —— 不动 duration/delay ✗，
       * 所以相位连续 ✓、绝不回退 ✓（见 starDurationFor 上方的推导 ✓）。
       * `getAnimations()` 结果缓存一次 ✓；每帧只写 playbackRate（很轻 ✓）。
       */
      var starRateCacheRef = React.useRef(null);
      React.useEffect(function () {
        var rate = speedFor(shownPct);
        // 组件里没有 doc 变量 ✓ —— 用轨道节点的 ownerDocument ✓（回退到全局 document ✓）
        var track = trackRef.current;
        var dom = (track && track.ownerDocument) || (typeof document !== "undefined" ? document : null);
        if (!dom) return;
        var nodes = dom.querySelectorAll(".ces-inline .ces-star");
        if (!nodes || nodes.length === 0) return;
        var cache = starRateCacheRef.current;
        if (!cache || cache.length !== nodes.length) {
          cache = [];
          for (var n = 0; n < nodes.length; n += 1) {
            var el = nodes[n];
            var list = el && typeof el.getAnimations === "function" ? el.getAnimations() : [];
            cache.push(list.length > 0 ? list : null);
          }
          starRateCacheRef.current = cache;
        }
        for (var i = 0; i < cache.length; i += 1) {
          var anims = cache[i];
          if (!anims) continue;
          for (var a = 0; a < anims.length; a += 1) {
            try { anims[a].playbackRate = rate; } catch (error) { /* 动画可能已取消 */ }
          }
        }
      }, [shownPct]);

      var atMax = levelCount > 1 && shownIndex === levelCount - 1;
      // 流光速度：High 档大幅放慢（蓄势感），Max 档加快（超频）。
      var sweepDur = "2.4s";
      if (levelCount > 1) {
        if (shownIndex === levelCount - 1) sweepDur = "0.3s";
        else if (shownIndex === levelCount - 2) sweepDur = "20s";
      }
      var ui = null;
      if (host !== null && host.container && levelCount > 0) {
        ui = ReactDOM.createPortal(
          React.createElement(
            "div",
            {
              className: "ces-inline",
              "data-ces-part": "root",
              "data-energy": energyOn ? "1" : "0",
              "data-motion": effectiveReducedMotion ? "concise" : "full",
              "data-reached-ticks": readSettings().reachedTicks,
              "data-busy": busy ? "1" : "0",
              style: { "--ces-energy": String(energy), "--ces-sweep-dur": sweepDur },
            },
            React.createElement(
              "div",
              {
                ref: trackRef,
                className: "ces-track",
                "data-ces-part": "track",
                role: "slider",
                tabIndex: locked ? -1 : 0,
                "aria-label": "推理等级",
                "aria-valuemin": 0,
                "aria-valuemax": Math.max(0, levelCount - 1),
                "aria-valuenow": shownIndex,
                "aria-valuetext": shownLevel !== null ? shownLevel.name : "",
                "aria-disabled": locked ? "true" : undefined,
                title: trackTitle,
                onPointerDown: onTrackPointerDown,
                onPointerMove: onTrackPointerMove,
                onPointerUp: endDrag,
                onPointerCancel: endDrag,
                onKeyDown: onKeyDown,
                onClick: swallow,
              },
              React.createElement("div", {
                className: "ces-fill",
                "data-ces-part": "fill",
                // 填充宽度 = 到旋钮圆心为止（不是整条轨道）；背景是"左蓝 → 当前位置颜色"的渐变。
                style: { width: knobOffset, background: fillBackground },
              }),
              // 能力层（星云 + 扫光）：透明度 = 能量强度，负责"通电"的渐入。
              React.createElement(
                "div",
                { className: "ces-energy", "data-ces-part": "energy", style: { width: knobOffset } },
                React.createElement("div", { className: "ces-energy__sweep", "data-ces-part": "sweep" }),
              ),
              // 星星单独一层：不跟星云淡入（否则 high 档星星被星云的 0.5 透明度压得看不见）。
              React.createElement(
                "div",
                {
                  className: "ces-stars",
                  "data-ces-part": "stars",
                  style: { width: knobOffset, opacity: starLayerOpacity.toFixed(3) },
                },
                particleNodes,
              ),
              tickNodes,
              React.createElement("div", {
                className: "ces-knob",
                "data-ces-part": "knob",
                style: { left: knobOffset },
              }),
            ),
            errorText_ !== null
              ? React.createElement("div", { className: "ces-error", "data-ces-part": "error", role: "status" }, errorText_)
              : null,
          ),
          host.container,
        );
      }

      // 锚点：不可见、不占位，只用来(1)拿住插槽给的 sessionId 上下文 (2)反查自己的 composer。
      return React.createElement("span", {
        ref: anchorRef,
        hidden: true,
        "data-ces-part": "anchor",
        "aria-hidden": "true",
      }, ui);
    }

    /* ════════════════════════════ 插件接线 ════════════════════════════ */

    /**
     * 三个服务都是官方客户端插件已经在用的（slots 不必说；sessions 与 modelDirectories
     * 是 client-ui-model-selection / client-ui-workspace 的既有注入面）。
     * 这里刻意**不**注入 locale / theme：多声明一个可能不存在的服务会让 fiber 停在
     * PENDING，代价远大于省下两行文案。
     *
     * ⚠️ 补充 `remote` / `remote.session`（参考实现的事故 #2）：
     *    接管官方那一席之后，本插件成了 `directoryFor()` 的**唯一调用方** —— Cordis 的服务访问
     *    跟着**调用方 ctx** 走，少声明这两个服务时，目录解析会在"会话作用域/绑定尚未就绪"时长期
     *    失败 → `modelDirectories.directoryFor(sessionId)` 拿不到目录 → **档位列表为空**
     *    （实测 `levelCount = 0`）→ 于是：拖动不开始 / 落点算成第 0 档 / 松手写回被放弃
     *    → 显示交还时跳一大截（用户看到的"松手抽搐 / 乱跳"就是这个）。
     *    诊断证据：`{"k":"release-abort","why":"levelCount=0"}` 出现 4 次。
     */
    var inject = ["slots", "sessions", "modelDirectories", "remote", "remote.session"];

    function apply(ctx) {
      installStyles();
      try {
        return ctx.slots.inject(SLOT_NAME, function () {
          return ctx.slots.register(
            {
              name: SLOT_NAME,
              id: ENTRY_ID,
              order: ENTRY_ORDER,
              label: function () { return "Reasoning effort"; },
              // 会话 id 的第二条来路（标准 props 一般已经带了；两条都走 props.sessionId）。
              inject: function (sessionId) { return { sessionId: sessionId }; },
            },
            function SlotComponent(props) {
              return React.createElement(CodexEffortSlider, Object.assign({}, props, { __ctx: ctx }));
            },
          );
        });
      } catch (error) {
        // 注册失败只意味着这块控件不出现，绝不能连累宿主输入区。
        try { console.error("[codex-effort-slider] 插槽注册失败，控件不会出现：", error); } catch (e) { /* 忽略 */ }
      }
    }

    installStyles();

    exports.apply = apply;
    exports.inject = inject;
    // 离线测试用的接缝（纯函数 + 桥 + 组件本身）。运行时无副作用。
    exports.__internals = {
      CSS: CSS,
      SLOT_NAME: SLOT_NAME,
      ENTRY_ID: ENTRY_ID,
      PARTICLES: PARTICLES,
      ROW_PADDING_BLOCK: ROW_PADDING_BLOCK,
      EFFORT_ROW_LABELS: EFFORT_ROW_LABELS,
      CodexEffortSlider: CodexEffortSlider,
      createMenuBridge: createMenuBridge,
      findEffortRow: findEffortRow,
      firstSpanText: firstSpanText,
      levelsOf: levelsOf,
      resolveLevels: resolveLevels,
      modelOf: modelOf,
      effectiveEffortId: effectiveEffortId,
      indexOfLevel: indexOfLevel,
      indexFromPct: indexFromPct,
      pctFromIndex: pctFromIndex,
      detentTargetIndex: detentTargetIndex,
      DETENT_THIRD: DETENT_THIRD,
      energyFor: energyFor,
      speedFor: speedFor,
      particleCountFor: particleCountFor,
      starCountFor: starCountFor,
      starLayerOpacityFor: starLayerOpacityFor,
      starBrightnessFor: starBrightnessFor,
      starDurationFor: starDurationFor,
      starDelayFor: starDelayFor,
      starHash01: starHash01,
      STARFIELD_DURATION_MEAN: STARFIELD_DURATION_MEAN,
      STARFIELD_DURATION_FIXED: STARFIELD_DURATION_FIXED,
      STARFIELD_DURATION_SPREAD: STARFIELD_DURATION_SPREAD,
      STARFIELD_MIN: STARFIELD_MIN,
      GOLDEN_RATIO: GOLDEN_RATIO,
      MAX_SPEED_FACTOR: MAX_SPEED_FACTOR,
      REDUCED_MOTION_SLOWDOWN: REDUCED_MOTION_SLOWDOWN,
      readSettings: readSettings,
      writeSettings: writeSettings,
      normalizeSettings: normalizeSettings,
      schemaDefaults: schemaDefaults,
      motionMode: motionMode,
      motionParamsForMode: motionParamsForMode,
      tracePush: tracePush,
      dumpTrace: dumpTrace,
      traceClear: traceClear,
      installSettingsUi: installSettingsUi,
      openSettingsPanel: openSettingsPanel,
      SETTINGS_SCHEMA: SETTINGS_SCHEMA,
      SETTINGS_VERSION: SETTINGS_VERSION,
      SETTINGS_KEY: SETTINGS_KEY,
      SETTINGS_EVENT: SETTINGS_EVENT,
      MIN_HEIGHT_SLOTS: MIN_HEIGHT_SLOTS,
      fillColorFor: fillColorFor,
      fillBackgroundFor: fillBackgroundFor,
      valueColorFor: valueColorFor,
      isOffLevel: isOffLevel,
      findValueElement: findValueElement,
      findSeatEffort: findSeatEffort,
      knobOffsetOf: knobOffsetOf,
      KNOB_RADIUS: KNOB_RADIUS,
      KNOB_SIZE: KNOB_SIZE,
      TRACK_HEIGHT: TRACK_HEIGHT,
      BASE_SPEEDUP: BASE_SPEEDUP,
      ENERGY_START: ENERGY_START,
      ENERGY_END: ENERGY_END,
      clamp01: clamp01,
      installStyles: installStyles,
      // ── 连续运动引擎（导出是为了让测试能注入固定 dt 精确断言）──
      MOTION: MOTION,
      MOTION_REDUCED: MOTION_REDUCED,
      MOTION_FAST: MOTION_FAST,
      RELEASE_PROJECT_S: RELEASE_PROJECT_S,
      POINTER_SPEED_EMA: POINTER_SPEED_EMA,
      POINTER_STALE_S: POINTER_STALE_S,
      POINTER_SPEED_TAU: POINTER_SPEED_TAU,
      motionStep: motionStep,
      motionSettled: motionSettled,
      decayPointerSpeed: decayPointerSpeed,
      releaseIndexFor: releaseIndexFor,
      clampAbs: clampAbs,
    };

    return module.exports;
    }

    // 这些服务由官方客户端插件提供；用条件 inject 等它们就绪，工作台本身不因缺服务卡住。
    // max 档闪现的大肥鱼虚影：轮询官方滑条的 aria-valuenow，跨入最高档时注入一次
    function flashEffortGhost(track) {
      try {
        if (typeof document === 'undefined' || !document.body) return;
        // 挂在整个模型菜单面板后面：比面板大一圈、z-index 低一层，从四周探出来
        const menu = track.closest('[role="menu"]') || track.closest('[class*="menu"]') || null;
        const box = (menu || track).getBoundingClientRect();
        const width = Math.round(Math.max(360, box.width * 1.7));
        const height = Math.round(width * 1.12);
        const el = document.createElement('div');
        el.className = 'ces-ghost';
        el.setAttribute('data-ces-part', 'ghost');
        el.setAttribute('data-on', '1');
        el.setAttribute('aria-hidden', 'true');
        el.style.width = width + 'px';
        el.style.height = height + 'px';
        if (menu) {
          const menuZ = parseInt(getComputedStyle(menu).zIndex, 10);
          el.style.zIndex = String(Number.isFinite(menuZ) && menuZ > 1 ? menuZ - 1 : 2147482999);
        }
        // 按视口钳位：旧会话输入框贴在屏幕底部，菜单下方空间不够时把虚影整体上移，
        // 保证整条剪影（包括尾巴）都在视口里。
        const vw = (document.documentElement && document.documentElement.clientWidth) || window.innerWidth;
        const vh = (document.documentElement && document.documentElement.clientHeight) || window.innerHeight;
        let cx = box.left + box.width / 2;
        let cy = box.top + box.height / 2;
        // 预留动画放大空间（缩放峰值 1.09×）
        const halfW = width * 0.56;
        const halfH = height * 0.56;
        if (cx + halfW > vw - 8) cx = vw - 8 - halfW;
        if (cx - halfW < 8) cx = 8 + halfW;
        if (cy + halfH > vh - 16) cy = vh - 16 - halfH;
        if (cy - halfH < 16) cy = 16 + halfH;
        el.style.left = cx + 'px';
        el.style.top = cy + 'px';
        // 布局稳定后再按真实 rect 校正一次（菜单贴底/贴顶时视口高度会变）
        requestAnimationFrame(() => {
          try {
            if (!el.parentNode) return;
            const rr = el.getBoundingClientRect();
            const viewH = (document.documentElement && document.documentElement.clientHeight) || window.innerHeight;
            let topPx = parseFloat(el.style.top) || 0;
            if (rr.bottom > viewH - 12) topPx -= rr.bottom - (viewH - 12);
            if (topPx - rr.height / 2 < 12) topPx = 12 + rr.height / 2;
            el.style.top = topPx + 'px';
          } catch (fixError) { /* 位置校正失败不影响闪现 */ }
        });
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', GHOST_VIEWBOX);
        svg.setAttribute('preserveAspectRatio', 'xMidYMax meet');
        for (let i = 0; i < GHOST_PATHS.length; i += 1) {
          const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          p.setAttribute('d', GHOST_PATHS[i]);
          svg.appendChild(p);
        }
        el.appendChild(svg);
        // 挂在 body 末尾（z 自动，低于菜单 portal 层、高于聊天内容）：
        // 之前插进菜单容器里会被容器裁剪，看不到。
        document.body.appendChild(el);
        // 粒子迸发：从「模型席按钮」中心发出
        const seat = document.querySelector('button[aria-haspopup="menu"][aria-expanded="true"]');
        const seatRect = seat ? seat.getBoundingClientRect() : null;
        const sparkX = seatRect ? seatRect.left + seatRect.width / 2 : box.left + box.width - 6;
        const sparkY = seatRect ? seatRect.top + seatRect.height / 2 : box.top + box.height / 2;
        for (let i = 0; i < 10; i += 1) {
          const spark = document.createElement('span');
          spark.className = 'ces-spark';
          const angle = -Math.PI * Math.random();
          const dist = 26 + Math.random() * 54;
          spark.style.left = sparkX + 'px';
          spark.style.top = sparkY + 'px';
          spark.style.setProperty('--ces-dx', (Math.cos(angle) * dist).toFixed(1) + 'px');
          spark.style.setProperty('--ces-dy', (Math.sin(angle) * dist).toFixed(1) + 'px');
          spark.style.animationDelay = (Math.random() * 50).toFixed(0) + 'ms';
          document.body.appendChild(spark);
          window.setTimeout(() => { if (spark.parentNode) spark.parentNode.removeChild(spark); }, 820);
        }
        window.setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 520);
      } catch (error) {
        console.error('[workbench] effort ghost failed', error);
      }
    }

    function watchEffortGhost() {
      let lastKey = null;
      let lastValueText = null;
      let timer = null;
      let stopped = false;
      const tick = () => {
        if (stopped) return;
        const track = document.querySelector('[data-ces-part="track"]');
        if (track) {
          const now = track.getAttribute('aria-valuenow');
          const max = track.getAttribute('aria-valuemax');
          const key = now + '/' + max;
          if (key !== lastKey) {
            const isMax = max !== null && max !== '0' && now === max;
            if (isMax) flashEffortGhost(track);
          }
          lastKey = key;
          // 档位文字：变化时做一次"滚入"动画（文字块滚动感）
          try {
            const valueEls = document.querySelectorAll('[role="menu"] span[class*="cellValue"]');
            const valueEl = valueEls.length > 0 ? valueEls[valueEls.length - 1] : null;
            if (valueEl) {
              const text = String(valueEl.textContent || '').trim();
              if (lastValueText !== null && text !== lastValueText) {
                try {
                  const cs = getComputedStyle(valueEl);
                  const pr = valueEl.getBoundingClientRect();
                  const wrap = document.createElement('span');
                  wrap.className = 'ces-roll-wrap';
                  wrap.style.cssText = 'position:fixed;pointer-events:none;overflow:hidden;z-index:2147482997;'
                    + 'left:' + pr.left + 'px;top:' + pr.top + 'px;width:' + pr.width + 'px;height:' + pr.height + 'px;';
                  const mk = (txt, anim) => {
                    const s = document.createElement('span');
                    s.textContent = txt;
                    s.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:flex-end;'
                      + 'color:' + cs.color + ';font-size:' + cs.fontSize + ';font-weight:' + cs.fontWeight
                      + ';font-family:' + cs.fontFamily + ';line-height:' + cs.lineHeight + ';white-space:nowrap;'
                      + 'animation:' + anim + ' 230ms cubic-bezier(.2,.7,.3,1) forwards;';
                    return s;
                  };
                  wrap.appendChild(mk(lastValueText, 'ces-roll-up'));
                  wrap.appendChild(mk(text, 'ces-roll-in'));
                  document.body.appendChild(wrap);
                  valueEl.style.visibility = 'hidden';
                  window.setTimeout(() => {
                    if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
                    valueEl.style.visibility = '';
                  }, 260);
                } catch (rollError) { /* 动效失败不影响切档 */ }
              }
              lastValueText = text;
            }
          } catch (rollError) { /* 只是动效 */ }
        } else {
          lastKey = null;
        }
        timer = window.setTimeout(tick, 90);
      };
      tick();
      return () => { stopped = true; if (timer) window.clearTimeout(timer); };
    }

    function installEffortSlider(ctx) {
      let mod = null;
      let slotDispose = null;
      let fiber = null;
      const stopGhostWatch = watchEffortGhost();
      try {
        fiber = ctx.inject(['sessions', 'modelDirectories', 'remote', 'remote.session'], (inner) => {
          try {
            mod = createEffortSliderModule(require);
            slotDispose = mod.apply ? mod.apply(inner) : null;
          } catch (error) {
            console.error('[workbench] effort slider mount failed', error);
          }
          return () => {
            if (slotDispose) { try { slotDispose(); } catch (_error) { /* gone */ } slotDispose = null; }
            mod = null;
          };
        });
      } catch (error) {
        console.error('[workbench] effort slider inject failed', error);
      }
      return () => {
        stopGhostWatch();
        try { document.body.classList.remove('ces-dragging'); } catch (_dragError) { /* ignore */ }
        if (fiber) { try { fiber(); } catch (_error) { /* gone */ } fiber = null; }
      };
    }

    // ---------- theme tokens (single source shared with modules) ----------
    const tokens = {
      success: 'var(--dsw-alias-state-success-primary)',
      error: 'var(--dsw-alias-state-error-primary)',
      warn: 'var(--dsw-alias-state-warn-primary)',
      idle: 'var(--dsw-alias-state-idle-primary)',
      brand: 'var(--dsw-alias-brand-primary)',
      bgBase: 'var(--dsw-alias-bg-base)',
      bgLayer1: 'var(--dsw-alias-bg-layer-1)',
      bgLayer2: 'var(--dsw-alias-bg-layer-2)',
      bgOverlay: 'var(--dsw-alias-bg-overlay)',
      border1: 'var(--dsw-alias-border-l1)',
      border2: 'var(--dsw-alias-border-l2)',
      label: 'var(--dsw-alias-label-primary)',
      labelSecondary: 'var(--dsw-alias-label-secondary)',
    };

    // ---------- feature switches ----------
    // The shell is optional decoration on top of the navigation layer: someone
    // who only wants the tab row can turn the rest off and let another plugin
    // own balances, themes or cost estimates. Every switch defaults to on, so
    // installing the shell keeps the previous behaviour.
    const FEATURE_KEYS = ['theme', 'balance', 'restart', 'glow', 'cost', 'effort'];
    const FEATURE_DEFAULTS = { theme: true, balance: true, restart: true, glow: true, cost: true, effort: true };
    const FEATURE_LABELS = {
      theme: { title: '主题切换', hint: '顶部栏的深色 / 浅色 / 纸色三个色块' },
      balance: { title: '余额显示', hint: '顶部栏的账户余额' },
      restart: { title: '重启按钮', hint: '顶部栏的一键重启（需要外部管理器）' },
      glow: { title: '进行中光效', hint: '会话运行中时列表行的流动光效' },
      cost: { title: '单次消耗估计', hint: '每轮对话结束时显示的 token 与费用估算' },
      effort: { title: '推理档位滑条', hint: '把模型菜单的推理等级改成可拖动的档位滑条，max 档带超频虚影' },
    };

    function createFeaturesStore() {
      const KEY = 'dsh-workbench:features';
      const listeners = new Set();
      let state = read();

      function read() {
        const next = { ...FEATURE_DEFAULTS };
        try {
          const raw = localStorage.getItem(KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            for (const key of FEATURE_KEYS) {
              if (typeof parsed[key] === 'boolean') next[key] = parsed[key];
            }
          }
        } catch (_error) { /* storage disabled */ }
        return next;
      }

      return {
        getSnapshot() { return state; },
        set(key, value) {
          if (!FEATURE_KEYS.includes(key) || state[key] === value) return;
          state = { ...state, [key]: value };
          try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_error) { /* storage disabled */ }
          for (const fn of listeners) fn();
        },
        subscribe(fn) {
          listeners.add(fn);
          return () => { listeners.delete(fn); };
        },
      };
    }

    const features = createFeaturesStore();

    function useFeatures() {
      return React.useSyncExternalStore(features.subscribe, features.getSnapshot);
    }

    // ---------- placement store ----------
    // Where each entry lives: the system bar (top row), the module row (second
    // row of page tabs), or nowhere. Registering a module only decides the
    // default — the settings page can move anything to either row. Keys are
    // `view:<id>` for workbench views and `native:<label>` for mirrored native
    // sidebar rows (labels are the row names the native UI shows).
    const PLACEMENTS = ['system', 'modules', 'hidden'];
    const PLACEMENT_KEY = 'dsh-workbench:placement';

    function createPlacementStore() {
      const listeners = new Set();
      let state = read();

      function read() {
        const next = {};
        try {
          const raw = localStorage.getItem(PLACEMENT_KEY);
          const parsed = raw ? JSON.parse(raw) : null;
          if (parsed && typeof parsed === 'object') {
            for (const key of Object.keys(parsed)) {
              if (PLACEMENTS.includes(parsed[key])) next[key] = parsed[key];
            }
          }
        } catch (_error) { /* storage disabled */ }
        return next;
      }

      return {
        getSnapshot() { return state; },
        get(key, fallback) {
          const value = state[key];
          return PLACEMENTS.includes(value) ? value : fallback;
        },
        set(key, value) {
          if (!key) return;
          const next = { ...state };
          if (PLACEMENTS.includes(value)) next[key] = value;
          else delete next[key];
          state = next;
          try { localStorage.setItem(PLACEMENT_KEY, JSON.stringify(state)); } catch (_error) { /* storage disabled */ }
          for (const fn of listeners) fn();
        },
        clear() {
          state = {};
          try { localStorage.removeItem(PLACEMENT_KEY); } catch (_error) { /* storage disabled */ }
          for (const fn of listeners) fn();
        },
        subscribe(fn) {
          listeners.add(fn);
          return () => { listeners.delete(fn); };
        },
      };
    }

    const placement = createPlacementStore();

    function usePlacement() {
      return React.useSyncExternalStore(placement.subscribe, placement.getSnapshot);
    }

    // ---------- order store ----------
    // One order for both bars and for the settings list: every entry is a
    // `view:<id>` / `native:<label>` key, and the row order on the settings page
    // is exactly the order the top bar renders in. Registering a module only
    // decides the default (view.order); dragging a row overrides it.
    const ORDER_KEY = 'dsh-workbench:order';

    function createOrderStore() {
      const listeners = new Set();
      let state = read();

      function read() {
        try {
          const raw = localStorage.getItem(ORDER_KEY);
          const parsed = raw ? JSON.parse(raw) : null;
          if (Array.isArray(parsed)) return parsed.filter((key) => typeof key === 'string');
        } catch (_error) { /* storage disabled */ }
        return [];
      }

      return {
        getSnapshot() { return state; },
        set(list) {
          state = list.slice();
          try { localStorage.setItem(ORDER_KEY, JSON.stringify(state)); } catch (_error) { /* storage disabled */ }
          for (const fn of listeners) fn();
        },
        clear() {
          state = [];
          try { localStorage.removeItem(ORDER_KEY); } catch (_error) { /* storage disabled */ }
          for (const fn of listeners) fn();
        },
        subscribe(fn) {
          listeners.add(fn);
          return () => { listeners.delete(fn); };
        },
      };
    }

    const order = createOrderStore();

    function useOrder() {
      return React.useSyncExternalStore(order.subscribe, order.getSnapshot);
    }

    // Sort entries by the user's order. Keys the user has never arranged keep
    // their natural order and land after the arranged ones.
    function applyOrder(ordered, items, keyOf) {
      if (!ordered.length) return items;
      const rank = new Map();
      ordered.forEach(function (key, index) { rank.set(key, index); });
      return items
        .map(function (item, index) {
          const key = keyOf(item);
          return { item: item, rank: rank.has(key) ? rank.get(key) : ordered.length + index };
        })
        .sort(function (a, b) { return a.rank - b.rank; })
        .map(function (entry) { return entry.item; });
    }

    // ---------- shared UI primitives ----------
    function StatusDot(props) {
      const ok = props.ok !== false;
      const color = props.color || (ok ? tokens.success : tokens.error);
      const glow = props.glow || (ok ? 'rgba(52,211,153,0.16)' : 'rgba(248,113,113,0.16)');
      return h('span', {
        title: props.title || (ok ? '正常' : '异常'),
        style: {
          display: 'inline-block',
          width: props.size || 9,
          height: props.size || 9,
          borderRadius: '50%',
          background: color,
          boxShadow: '0 0 0 3px ' + glow,
          flex: '0 0 auto',
        },
      });
    }

    function Card(props) {
      return h('div', {
        style: {
          border: '1px solid ' + tokens.border1,
          borderRadius: 12,
          background: tokens.bgLayer1,
          overflow: 'hidden',
          ...(props.style || {}),
        },
      }, props.children);
    }

    function SectionHeader(props) {
      return h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 12,
          ...(props.style || {}),
        },
      },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 } },
          h('div', { style: { fontSize: 16, fontWeight: 650 } }, props.title),
          props.subtitle ? h('div', { style: { fontSize: 12, color: tokens.labelSecondary } }, props.subtitle) : null,
        ),
        props.actions
          ? h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, flex: '0 0 auto' } }, props.actions)
          : null,
      );
    }

    function EmptyState(props) {
      return h('div', {
        style: {
          padding: '28px 16px',
          textAlign: 'center',
          color: tokens.labelSecondary,
          fontSize: 13,
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
          ...(props.style || {}),
        },
      }, props.text || '暂无内容');
    }

    function Spinner(props) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: props.size || 12,
          height: props.size || 12,
          border: '2px solid ' + tokens.border2,
          borderTopColor: tokens.brand,
          borderRadius: '50%',
          animation: 'wb-spin 0.8s linear infinite',
          flex: '0 0 auto',
        },
        'aria-label': '加载中',
      });
    }

    function Button(props) {
      const variant = props.variant || 'default';
      const style = variant === 'primary'
        ? { background: tokens.brand, color: '#fff', border: '1px solid transparent' }
        : variant === 'ghost'
          ? { background: 'transparent', color: tokens.labelSecondary, border: '1px solid transparent' }
          : { background: tokens.bgLayer1, color: tokens.label, border: '1px solid ' + tokens.border2 };
      return h('button', {
        type: 'button',
        disabled: props.disabled,
        onClick: props.onClick,
        title: props.title,
        style: {
          padding: props.small ? '4px 10px' : '6px 12px',
          borderRadius: 8,
          fontSize: props.small ? 12 : 13,
          cursor: props.disabled ? 'not-allowed' : 'pointer',
          opacity: props.disabled ? 0.5 : 1,
          ...style,
        },
      }, props.children);
    }

    function Field(props) {
      return h('input', {
        value: props.value,
        defaultValue: props.defaultValue,
        placeholder: props.placeholder,
        onChange: props.onChange,
        onBlur: props.onBlur,
        onKeyDown: props.onKeyDown,
        style: {
          padding: '4px 8px',
          borderRadius: 7,
          border: '1px solid ' + tokens.border1,
          background: tokens.bgBase,
          color: tokens.label,
          fontSize: props.fontSize || 12,
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
          ...(props.style || {}),
        },
      });
    }

    // ---------- module registry ----------
    // A "view" is a full workbench page: it owns a main-slot key, and the
    // workbench switcher (the second top-bar row) shows one tab per view.
    const registry = {
      views: new Map(),
      listeners: new Set(),
    };

    function notify() {
      registry.listeners.forEach((fn) => fn());
    }

    // Captured in apply(); the tab row and the overview page both need it.
    let layoutService = null;
    let layoutGetter = null;
    // Last measured position of the tab highlight plate (survives a remount).
    let lastGlider = { left: 0, width: 0 };

    function currentLayout() {
      if (layoutService) return layoutService;
      if (layoutGetter) {
        try { layoutService = layoutGetter() || null; } catch (_error) { /* not ready */ }
      }
      return layoutService;
    }

    function openView(id) {
      const layout = currentLayout();
      if (!layout) return;
      try {
        layout.selectPanel(id);
      } catch (err) {
        console.warn('[workbench] selectPanel failed for', id, err);
      }
    }

    function useRegistry() {
      const [, force] = React.useReducer((x) => x + 1, 0);
      React.useEffect(() => {
        const fn = () => force();
        registry.listeners.add(fn);
        return () => registry.listeners.delete(fn);
      }, []);
      return registry;
    }

    // ---------- the public workbench API ----------
    function createApi(ctx) {
      const api = {
        /**
         * Register a workbench view: one full page, one tab in the workbench
         * switcher. The view owns the `main` slot key `id`; pressing its tab
         * selects that key, so the page takes over the central area.
         * Pass `tab: false` to register the page without a tab (the shell itself
         * uses that for its overview, which hangs off the top-bar nav instead).
         * Returns a disposer; a module should keep it inside its own ctx.effect.
         */
        registerView(opts) {
          const { id, title, icon, component, order = 50, subtitle = '', badge, tab = true } = opts || {};
          if (typeof id !== 'string' || id.length === 0) throw new Error('workbench.registerView: string `id` is required');
          if (typeof component !== 'function') throw new Error('workbench.registerView: `component` is required');
          if (id === 'conversation') throw new Error('workbench.registerView: `conversation` is reserved by DSH');
          const label = title || id;
          registry.views.set(id, { id, title: label, subtitle, icon, component, order, badge, tab: tab !== false });
          notify();
          const disposeMain = ctx.slots.inject('main', () => ctx.slots.register({
            name: 'main', key: id,
          }, component));
          return () => {
            try { disposeMain(); } catch (_error) { /* already gone */ }
            registry.views.delete(id);
            notify();
          };
        },

        /** Ask the shell to repaint the switcher (after a view badge changed). */
        refresh() {
          notify();
        },

        /**
         * Contract version this shell implements. Modules check it once in
         * apply() and bail out on a mismatch instead of crashing later on a
         * missing method. Bump only on a breaking change; see docs/SPEC.md.
         */
        apiVersion: 1,

        components: { StatusDot, Card, SectionHeader, EmptyState, Spinner, Button, Field },
        tokens,
      };

      // Deprecated alias kept for modules written against the old contract:
      // a "panel" is just a view now, and the sidebar launcher is gone.
      api.registerPanel = (opts) => api.registerView(opts);
      return api;
    }

    // ---------- settings icon & page ----------
    const SETTINGS_VIEW_ID = 'workbench-settings';

    // A panel with its own tab strip: the workbench's mark, distinct from the
    // native "More" grid (four squares) so the two do not read alike.
    function IconWorkbenchTabs(props) {
      const size = props.size || 20;
      return h('svg', { viewBox: '0 0 24 24', width: size, height: size, 'aria-hidden': true, fill: 'none' },
        h('rect', { x: 3.5, y: 4.5, width: 17, height: 15, rx: 2.5, stroke: 'currentColor', strokeWidth: 1.5 }),
        h('path', { d: 'M3.5 9.2h17', stroke: 'currentColor', strokeWidth: 1.4 }),
        h('circle', { cx: 6.4, cy: 6.85, r: 0.85, fill: 'currentColor' }),
        h('circle', { cx: 9.4, cy: 6.85, r: 0.85, fill: 'currentColor' }),
        h('path', { d: 'M6.2 13.2h5.6M6.2 16h8.4', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' }),
      );
    }

    function IconSettings(props) {
      const size = props.size || 20;
      return h('svg', { viewBox: '0 0 24 24', width: size, height: size, 'aria-hidden': true, fill: 'none' },
        h('circle', { cx: 12, cy: 12, r: 3.2, stroke: 'currentColor', strokeWidth: 1.5 }),
        h('path', {
          d: 'M19.4 13.5a7.7 7.7 0 0 0 0-3l1.7-1.2-1.9-3.3-2 .8a7.6 7.6 0 0 0-2.6-1.5L14.3 3h-3.8l-.3 2.3a7.6 7.6 0 0 0-2.6 1.5l-2-.8-1.9 3.3 1.7 1.2a7.7 7.7 0 0 0 0 3l-1.7 1.2 1.9 3.3 2-.8a7.6 7.6 0 0 0 2.6 1.5l.3 2.3h3.8l.3-2.3a7.6 7.6 0 0 0 2.6-1.5l2 .8 1.9-3.3z',
          stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round',
        }),
      );
    }

    // ---------- overview page ----------
    function WorkbenchOverview() {
      const reg = useRegistry();
      const views = Array.from(reg.views.values())
        .filter((item) => item.tab !== false)
        .sort((a, b) => a.order - b.order);

      const viewRow = (item) => h('div', {
        key: item.id,
        style: {
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', borderBottom: '1px solid ' + tokens.border1,
        },
      },
        h('div', { style: { width: 22, height: 22, color: tokens.labelSecondary, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          item.icon ? h(item.icon, { size: 18, active: false }) : null),
        h('div', { style: { flex: '1 1 auto', minWidth: 0 } },
          h('div', { style: { fontWeight: 550, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, item.title),
          h('div', { style: { fontSize: 11, color: tokens.labelSecondary } }, '视图 · ' + item.id),
        ),
        h(Button, {
          small: true,
          variant: 'ghost',
          onClick: () => openView(item.id),
        }, '打开'),
      );

      return h('div', {
        style: {
          padding: '24px 28px', maxWidth: 920, margin: '0 auto', height: '100%',
          boxSizing: 'border-box', overflowY: 'auto',
          color: tokens.label, background: tokens.bgBase,
        },
      },
        h('h2', { style: { margin: '0 0 4px', fontSize: 20, fontWeight: 650 } }, '工作台总览'),
        h('div', { style: { fontSize: 13, color: tokens.labelSecondary, marginBottom: 20 } },
          '已接入 ' + views.length + ' 个视图'),

        h('div', null,
          h(SectionHeader, { title: '视图', subtitle: '工作台切换页里的页面；每个模块对应一个页面' }),
          h(Card, null,
            views.length === 0
              ? h(EmptyState, { text: '还没有模块注册视图。\n模块会话按《工作台模块规范》接入后会出现在这里。' })
              : views.map(viewRow),
          ),
        ),
      );
    }

    // ────────────────────────── top bar (stage 1) ──────────────────────────
    const TOPBAR_HEIGHT = 102;

    // ---------- settings page ----------
    // Reachable from the gear in the system bar. Two jobs: turn the shell's own
    // extras on or off, and show which modules registered a page.
    function WorkbenchSettings() {
      const enabled = useFeatures();
      const reg = useRegistry();
      const placed = usePlacement();
      const ordered = useOrder();
      const nativeItems = useNativeEntries();
      // Only tabbed modules belong here: the shell's own overview and this
      // settings page live in the system bar, not in the module row.
      const views = Array.from(reg.views.values())
        .filter((item) => item.tab !== false)
        .sort((a, b) => a.order - b.order);
      const viewRows = applyOrder(ordered, views, (item) => 'view:' + item.id);
      const listRef = React.useRef(null);

      // Drag a placement row to reorder it. Pointer-driven, not HTML5 drag: the
      // row is lifted out with position:fixed, a placeholder keeps its slot,
      // the other rows animate out of the way, and the release order is saved.
      React.useEffect(function () {
        const list = listRef.current;
        if (!list) return undefined;
        let card = null;
        let placeholder = null;
        let snapshot = [];
        let offsetX = 0;
        let offsetY = 0;

        function liveRows() {
          return Array.prototype.slice.call(
            list.querySelectorAll('.wb-placement-row:not(.dragging):not(.placeholder)'),
          );
        }

        function start(event) {
          if (event.button !== 0 || !event.target.closest) return;
          if (!event.target.closest('.wb-drag-grip')) return;
          const target = event.target.closest('[data-placement-key]');
          if (!target) return;
          event.preventDefault();
          const rect = target.getBoundingClientRect();
          offsetX = event.clientX - rect.left;
          offsetY = event.clientY - rect.top;
          card = target;
          card.classList.add('dragging');
          card.style.left = rect.left + 'px';
          card.style.top = rect.top + 'px';
          card.style.width = rect.width + 'px';
          card.style.height = rect.height + 'px';
          placeholder = document.createElement('div');
          placeholder.className = 'wb-placement-row placeholder';
          placeholder.style.height = rect.height + 'px';
          list.insertBefore(placeholder, card);
          snapshot = liveRows().map(function (row) {
            const r = row.getBoundingClientRect();
            return { el: row, mid: r.top + r.height / 2 };
          });
          document.addEventListener('pointermove', move);
          document.addEventListener('pointerup', end);
          document.addEventListener('pointercancel', end);
        }

        function move(event) {
          if (!card) return;
          card.style.left = event.clientX - offsetX + 'px';
          card.style.top = event.clientY - offsetY + 'px';
          let after = null;
          for (let i = 0; i < snapshot.length; i += 1) {
            if (event.clientY < snapshot[i].mid + 4) { after = snapshot[i].el; break; }
          }
          if (placeholder.nextElementSibling === after) return;
          const others = liveRows();
          const before = others.map(function (row) {
            return { el: row, top: row.getBoundingClientRect().top };
          });
          if (after) list.insertBefore(placeholder, after);
          else list.appendChild(placeholder);
          before.forEach(function (item) {
            const delta = item.top - item.el.getBoundingClientRect().top;
            if (!delta) return;
            if (item.el._wbFlip) item.el._wbFlip.cancel();
            item.el._wbFlip = item.el.animate(
              [{ transform: 'translateY(' + delta + 'px)' }, { transform: 'translateY(0px)' }],
              { duration: 200, easing: 'cubic-bezier(.2,.8,.25,1)' },
            );
          });
        }

        function end() {
          if (!card) return;
          placeholder.parentNode.insertBefore(card, placeholder);
          placeholder.parentNode.removeChild(placeholder);
          placeholder = null;
          card.style.left = '';
          card.style.top = '';
          card.style.width = '';
          card.style.height = '';
          card.classList.remove('dragging');
          card = null;
          document.removeEventListener('pointermove', move);
          document.removeEventListener('pointerup', end);
          document.removeEventListener('pointercancel', end);
          order.set(liveRows().map(function (row) {
            return row.getAttribute('data-placement-key');
          }));
        }

        list.addEventListener('pointerdown', start);
        return function () {
          list.removeEventListener('pointerdown', start);
          document.removeEventListener('pointermove', move);
          document.removeEventListener('pointerup', end);
          document.removeEventListener('pointercancel', end);
        };
      }, []);

      function toggleRow(key) {
        const meta = FEATURE_LABELS[key];
        const on = enabled[key];
        return h('div', {
          key,
          style: {
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px 14px', borderBottom: '1px solid ' + tokens.border1,
          },
        },
          h('div', { style: { flex: '1 1 auto', minWidth: 0 } },
            h('div', { style: { fontWeight: 550 } }, meta.title),
            h('div', { style: { fontSize: 11, color: tokens.labelSecondary } }, meta.hint),
          ),
          h('button', {
            type: 'button',
            role: 'switch',
            'aria-checked': on ? 'true' : 'false',
            'aria-label': meta.title,
            onClick: () => features.set(key, !on),
            style: {
              position: 'relative', width: 40, height: 22, borderRadius: 999,
              border: '1px solid ' + (on ? 'var(--dsw-alias-brand-primary)' : tokens.border2),
              background: on ? 'var(--dsw-alias-brand-primary)' : tokens.bgLayer2,
              cursor: 'pointer', flex: '0 0 auto', padding: 0,
              transition: 'background .15s, border-color .15s',
            },
          },
            h('span', {
              'aria-hidden': true,
              style: {
                position: 'absolute', top: 2, left: on ? 20 : 2,
                width: 16, height: 16, borderRadius: '50%',
                background: on ? 'var(--dsw-alias-bg-base)' : 'var(--dsw-alias-label-secondary)',
                transition: 'left .15s',
              },
            }),
          ),
        );
      }

      function viewRow(item) {
        return h('div', {
          key: item.id,
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderBottom: '1px solid ' + tokens.border1,
          },
        },
          h('div', { style: { width: 22, height: 22, color: tokens.labelSecondary, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            item.icon ? h(item.icon, { size: 18, active: false }) : null),
          h('div', { style: { flex: '1 1 auto', minWidth: 0 } },
            h('div', { style: { fontWeight: 550, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, item.title),
            h('div', { style: { fontSize: 11, color: tokens.labelSecondary } },
              (item.tab === false ? '无标签页 · ' : '标签页 · ') + item.id + ' · order ' + item.order),
          ),
        );
      }

      // Where an entry shows: the system bar, the module row, or nowhere.
      const PLACEMENT_CHOICES = [
        { id: 'system', label: '系统栏', hint: '顶部第一行' },
        { id: 'modules', label: '模块栏', hint: '顶部第二行（标签）' },
        { id: 'hidden', label: '隐藏', hint: '两处都不显示' },
      ];

      function placementRow(key, title, iconNode, fallback) {
        const value = placed[key] || fallback;
        return h('div', {
          key,
          className: 'wb-placement-row',
          'data-placement-key': key,
          style: { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderBottom: '1px solid ' + tokens.border1 },
        },
          h('span', { className: 'wb-drag-grip', title: '拖动调整顺序', 'aria-hidden': true }, '⠿'),
          h('div', { style: { width: 22, height: 22, color: tokens.labelSecondary, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, iconNode),
          h('div', { style: { flex: '1 1 auto', minWidth: 0, fontWeight: 550, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, title),
          h('div', { style: { display: 'flex', gap: 4, flex: '0 0 auto' } },
            PLACEMENT_CHOICES.map(function (choice) {
              const on = choice.id === value;
              return h('button', {
                key: choice.id,
                type: 'button',
                title: choice.hint,
                'aria-pressed': on ? 'true' : 'false',
                onClick: function () { placement.set(key, choice.id); },
                style: {
                  height: 24, padding: '0 9px', borderRadius: 6, fontSize: 11,
                  border: '1px solid ' + (on ? 'var(--dsw-alias-brand-primary)' : tokens.border2),
                  background: on ? 'var(--dsw-alias-brand-primary)' : 'transparent',
                  color: on ? 'var(--dsw-alias-bg-base)' : tokens.labelSecondary,
                  cursor: 'pointer', transition: 'background .12s, color .12s, border-color .12s',
                },
              }, choice.label);
            }),
          ),
        );
      }

      const nativeRows = applyOrder(ordered, nativeItems, (item) => 'native:' + item.label);
      const rows = []
        .concat(nativeRows.map(function (item) {
          return placementRow(
            'native:' + item.label,
            item.label,
            item.html ? h('span', { style: { display: 'inline-flex', width: 17, height: 17 }, dangerouslySetInnerHTML: { __html: item.html } }) : null,
            'system',
          );
        }))
        .concat(viewRows.map(function (item) {
          return placementRow(
            'view:' + item.id,
            item.title,
            item.icon ? h(item.icon, { size: 17, active: false }) : null,
            'modules',
          );
        }));

      return h('div', { className: 'wb-settings-page' },
        h('div', { className: 'wb-settings-head' },
          h('h2', { style: { margin: '0 0 4px', fontSize: 20, fontWeight: 650 } }, '工作台设置'),
          h('div', { style: { fontSize: 13, color: tokens.labelSecondary } },
            '只想要导航分层的话，功能开关都可以关掉，交给别的插件。'),
        ),
        h('div', { className: 'wb-settings-grid' },
          h('div', null,
            h(SectionHeader, { title: '功能', subtitle: '外壳自带、可以单独关闭的额外功能' }),
            h(Card, null, FEATURE_KEYS.map(toggleRow)),
          ),
          h('div', null,
            h(SectionHeader, { title: '已注册的模块', subtitle: '模块注册的页面；默认出现在第二行，位置可在下面调整' }),
            h(Card, null,
              viewRows.length === 0
                ? h(EmptyState, { text: '还没有模块注册页面。' })
                : viewRows.map(viewRow),
            ),
          ),
          h('div', { className: 'wb-settings-wide' },
            h(SectionHeader, { title: '栏位分配', subtitle: '拖动行首的手柄调整顺序；这个顺序就是系统栏与模块栏的显示顺序' }),
            h(Card, null,
              h('div', { ref: listRef, className: 'wb-placement-list' },
                rows.length === 0
                  ? h(EmptyState, { text: '还没有可分配的项目。' })
                  : rows,
              ),
            ),
            h('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 } },
              h(Button, { small: true, variant: 'ghost', onClick: () => { order.clear(); } }, '恢复默认顺序'),
              h(Button, { small: true, variant: 'ghost', onClick: () => { placement.clear(); order.clear(); } }, '全部恢复默认'),
            ),
          ),
        ),
      );
    }

    async function restartDsh() {
      try {
        const res = await fetch('/wb/workbench/restart', { method: 'POST' });
        const json = await res.json().catch(() => null);
        if (json && json.ok === false) {
          window.alert(json.hint || '这台机器上没有可用的重启管理器，请手动重启 DSH Web。');
        }
      } catch (_error) {
        /* offline: nothing to do */
      }
    }

    function createBalanceStore(ctx) {
      // `state` must be REPLACED on every write: useSyncExternalStore compares
      // getSnapshot() results with Object.is, so mutating the same object in place
      // makes React think nothing changed and the chip never repaints.
      let state = { phase: 'loading', amount: null, error: null, updatedAt: 0 };
      const listeners = new Set();
      let inflight = null;
      let timer = null;
      const emit = () => listeners.forEach((fn) => fn());
      const set = (next) => { state = { ...state, ...next }; emit(); };
      function refresh() {
        if (inflight) return inflight;
        const remote = typeof ctx.get === 'function' ? ctx.get('remote') : ctx.remote;
        const account = remote && remote.account;
        if (!account || typeof account.getBalance !== 'function') {
          set({ phase: 'failed', error: 'account 服务不可用' });
          return null;
        }
        const meta = { version: '1.0.0', locale: 'zh-CN', timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60 };
        inflight = account.getBalance(meta)
          .then((result) => {
            if (!result || result.ok !== true) throw new Error('余额读取被拒绝');
            const value = result.value;
            if (!value || value.status !== 'ready') throw new Error('余额不可用');
            const wallets = Array.isArray(value.value) ? value.value : [];
            const wallet = wallets.find((w) => w && w.currency === 'CNY') || wallets[0] || null;
            set({ phase: 'ready', amount: wallet ? Number(wallet.balance) : null, error: null, updatedAt: Date.now() });
          })
          .catch((err) => {
            set({ phase: state.phase === 'ready' ? 'stale' : 'failed', error: String((err && err.message) || err) });
          })
          .finally(() => { inflight = null; });
        return inflight;
      }
      return {
        refresh,
        start() { refresh(); timer = setInterval(() => { if (document.hidden !== true) refresh(); }, 5000); },
        stop() { if (timer) clearInterval(timer); timer = null; },
        subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
        getSnapshot() { return state; },
      };
    }

    function createAccountStore(ctx) {
      // Same rule as the balance store: replace the snapshot, never mutate it.
      let state = { phase: 'loading', name: null, avatar: null, error: null };
      const listeners = new Set();
      let inflight = null;
      const emit = () => listeners.forEach((fn) => fn());
      const set = (next) => { state = { ...state, ...next }; emit(); };
      function refresh() {
        if (inflight) return inflight;
        const account = ctx.remote && ctx.remote.account;
        if (!account || typeof account.getProfile !== 'function') { set({ phase: 'failed' }); return null; }
        const meta = { version: '1.0.0', locale: 'zh-CN', timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60 };
        inflight = account.getProfile(meta)
          .then((result) => {
            if (result && result.ok && result.value && result.value.status === 'ready') {
              const p = result.value.value;
              set({ phase: 'ready', name: p.name || p.contact || '已登录', avatar: p.avatarUrl || null, error: null });
            } else {
              set({ phase: 'failed', error: 'profile 不可用' });
            }
          })
          .catch((err) => set({ phase: 'failed', error: String((err && err.message) || err) }))
          .finally(() => { inflight = null; });
        return inflight;
      }
      return {
        refresh,
        start() { refresh(); },
        stop() {},
        subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
        getSnapshot() { return state; },
      };
    }

    function balanceTone(amount) {
      if (typeof amount !== 'number' || !isFinite(amount)) return 'muted';
      if (amount > 100) return 'green';
      if (amount >= 10) return 'amber';
      return 'red';
    }

    // Linear icons for the top bar / workspaces.
    const BRAND_PATH = 'M48.8354 10.0479C48.3232 9.79199 48.1025 10.2798 47.8032 10.5278C47.7007 10.6079 47.6143 10.7119 47.5273 10.8076C46.7793 11.624 45.9048 12.1597 44.7622 12.0957C43.0923 12 41.666 12.5356 40.4058 13.8398C40.1377 12.2319 39.2476 11.272 37.8926 10.6558C37.1836 10.3359 36.4668 10.0156 35.9702 9.31982C35.6235 8.82373 35.5293 8.27197 35.356 7.72754C35.2456 7.3999 35.1353 7.06396 34.7651 7.00781C34.3633 6.94385 34.2056 7.2876 34.0479 7.57568C33.418 8.75195 33.1733 10.0479 33.1973 11.3599C33.2524 14.312 34.4736 16.6641 36.8999 18.3359C37.1758 18.5278 37.2466 18.7197 37.1597 19C36.9946 19.5757 36.7974 20.1357 36.624 20.7119C36.5137 21.0801 36.3486 21.1597 35.9624 21C34.6309 20.4321 33.481 19.5918 32.4644 18.5757C30.7393 16.8721 29.1792 14.9917 27.2334 13.52C26.7764 13.1758 26.3193 12.856 25.8467 12.5518C23.8618 10.584 26.1069 8.96777 26.627 8.77588C27.1704 8.57568 26.8159 7.8877 25.0591 7.896C23.3022 7.90381 21.6953 8.50391 19.647 9.30371C19.3477 9.42383 19.0322 9.51172 18.7095 9.58398C16.8501 9.22363 14.9199 9.14355 12.9033 9.37598C9.10596 9.80762 6.07275 11.6396 3.84326 14.7681C1.16455 18.5278 0.53418 22.7998 1.30664 27.2559C2.11768 31.9521 4.46582 35.8398 8.07373 38.8799C11.8159 42.0322 16.1255 43.5762 21.041 43.2803C24.0269 43.104 27.3516 42.6963 31.1016 39.4561C32.0469 39.936 33.0396 40.1279 34.686 40.272C35.9546 40.3921 37.1758 40.208 38.1211 40.0078C39.6021 39.688 39.4995 38.2881 38.9639 38.0322C34.623 35.9678 35.5762 36.8081 34.71 36.1279C36.9155 33.4639 40.2402 30.6958 41.54 21.728C41.6426 21.0161 41.5557 20.5679 41.54 19.9917C41.5322 19.6396 41.6108 19.5039 42.0049 19.4639C43.0923 19.3359 44.1479 19.0317 45.1167 18.4878C47.9292 16.9199 49.064 14.3438 49.3315 11.2559C49.3711 10.7837 49.3237 10.2959 48.8354 10.0479ZM24.3262 37.8398C20.1196 34.4639 18.0791 33.3521 17.2358 33.3999C16.4482 33.4482 16.5898 34.3682 16.7632 34.9678C16.9443 35.5601 17.1812 35.9683 17.5117 36.4878C17.7402 36.832 17.8979 37.3442 17.2832 37.728C15.9282 38.584 13.5728 37.4399 13.4624 37.3838C10.7207 35.7358 8.42822 33.5601 6.81348 30.584C5.25342 27.7197 4.34766 24.6479 4.19775 21.3677C4.1582 20.5757 4.38672 20.2959 5.15869 20.1519C6.17529 19.96 7.22314 19.9199 8.23926 20.0718C12.5327 20.7119 16.1885 22.6719 19.2529 25.7759C21.002 27.5439 22.3252 29.6558 23.6885 31.7202C25.1377 33.9121 26.6978 36 28.6831 37.7119C29.3843 38.312 29.9434 38.7681 30.479 39.104C28.8643 39.2881 26.1699 39.3281 24.3262 37.8398ZM26.3433 24.6001C26.3433 24.248 26.6191 23.9678 26.9658 23.9678C27.0444 23.9678 27.1152 23.9839 27.1782 24.0078C27.2651 24.04 27.3438 24.0879 27.4067 24.1602C27.5171 24.272 27.5801 24.4321 27.5801 24.6001C27.5801 24.9521 27.3042 25.2319 26.9575 25.2319C26.6108 25.2319 26.3433 24.9521 26.3433 24.6001ZM32.6064 27.8799C32.2046 28.0479 31.8027 28.1919 31.4165 28.208C30.8179 28.2397 30.1641 27.9922 29.8096 27.688C29.2583 27.2158 28.8643 26.9521 28.6987 26.1279C28.6279 25.7759 28.6675 25.2319 28.7305 24.9199C28.8721 24.248 28.7144 23.8159 28.2495 23.4238C27.8716 23.104 27.3911 23.0161 26.8633 23.0161C26.666 23.0161 26.4849 22.9277 26.3511 22.856C26.1304 22.7441 25.9492 22.4639 26.1226 22.1201C26.1777 22.0078 26.4458 21.7358 26.5088 21.688C27.2256 21.272 28.0527 21.4077 28.8169 21.7197C29.5259 22.0161 30.0615 22.5601 30.834 23.3281C31.6216 24.2559 31.7632 24.5117 32.2124 25.208C32.5669 25.752 32.8901 26.312 33.1104 26.9521C33.2446 27.3521 33.0713 27.6802 32.6064 27.8799Z';
    function IconBrand(props) {
      const s = props.size || 20;
      return h('svg', { viewBox: '0 0 50 50', width: s, height: s, fill: 'none', 'aria-hidden': true },
        h('path', { d: BRAND_PATH, fill: '#4D6BFE' }),
      );
    }
    function IconGrid(props) {
      const s = props.size || 18;
      return h('svg', { viewBox: '0 0 24 24', width: s, height: s, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round' }));
    }
    function IconPlugins(props) {
      const s = props.size || 18;
      return h('svg', { viewBox: '0 0 24 24', width: s, height: s, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round' }));
    }
    function IconClock(props) {
      const s = props.size || 18;
      return h('svg', { viewBox: '0 0 24 24', width: s, height: s, fill: 'none', 'aria-hidden': true },
        h('circle', { cx: 12, cy: 12, r: 8, stroke: 'currentColor', strokeWidth: 1.6 }),
        h('path', { d: 'M12 7.5V12l3 2', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }));
    }
    function IconRestart(props) {
      const s = props.size || 16;
      return h('svg', { viewBox: '0 0 24 24', width: s, height: s, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }));
    }
    function IconChat(props) {
      const s = props.size || 16;
      return h('svg', { viewBox: '0 0 24 24', width: s, height: s, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 3.5V6z', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round' }));
    }

    // ---------- theme switcher ----------
    // The palette is per window, not a shared preference. DSH keeps the theme in
    // the Host settings document, so `theme.setTheme()` writes one value that
    // every open window adopts: switching a color here used to repaint every
    // tab, and an agent testing palettes in a headless browser repainted the
    // user's window too. This switches the local DOM instead — the
    // `data-ds-dark-theme` body attribute plus the paper token layer — and
    // remembers the choice in localStorage. Other windows keep their own.
    const SCHEME_KEY = 'dsh-workbench:scheme';
    const LEGACY_PAPER_KEY = 'dsh-workbench:paper';
    const PAPER_TOKENS = {
      '--dsw-alias-bg-base': '#f7f3ea',
      '--dsw-alias-bg-layer-1': '#f2ece0',
      '--dsw-alias-bg-layer-2': '#ece5d6',
      '--dsw-alias-bg-overlay': '#faf5e9',
      '--dsw-alias-border-l1': '#d8cfba',
      '--dsw-alias-border-l2': '#c6bba2',
      '--dsw-alias-brand-primary': '#8a6a45',
      '--dsw-alias-label-primary': '#3b342a',
      '--dsw-alias-label-secondary': '#6f6557',
      // The HARNESS wordmark badge paints its block with `currentColor` and its
      // letters with this inverted token. Under paper the block turned dark
      // (paper label-primary) while the token stayed light-theme dark, so the
      // badge read as black-on-black.
      '--dsw-alias-label-primary-inverted': '#f7f3ea',
      '--dsw-alias-state-error-primary': '#a34a3c',
      '--dsw-alias-state-warn-primary': '#a8792c',
      '--dsw-alias-state-success-primary': '#4f7a5a',
      '--dsw-alias-state-idle-primary': '#a49a89',
      '--dsw-specific-sidebar-fill': '#f2ece0',
      // Chat bubbles: the light base uses a pale DeepSeek blue, which looks
      // wrong on paper. These two are outside the alias layer.
      '--dsw-specific-bubble': '#f2ecdf',
      '--dsw-specific-bubble-highlight': '#e9dfcb',
      // Pale blue surfaces the alias list does not cover: command chips,
      // reference pills, selected file tabs, "load earlier", tool cards.
      '--dsw-alias-state-business-tertiary': '#f1e9da',
      '--dsw-alias-state-business-primary': '#8a6a45',
      '--dsw-specific-sidebar-nav-item-active-accent': '#f1e9da',
      '--dsw-specific-sidebar-nav-item-active': '#efe9db',
      '--dsw-specific-selector': '#f1e9da',
      '--dsw-specific-input-major': '#f2ece0',
      '--dsw-specific-tip': '#f7f2e7',
      '--dsw-specific-menu': '#fcf9f3',
      // Scrollbars read their own alias pair and default to neutral grey.
      '--dsw-alias-scrollbar-bg-l1': '#d8cfba',
      '--dsw-alias-scrollbar-bg-l2': '#d8cfba',
      '--dsw-alias-scrollbar-hover-l1': '#c6bba2',
      '--dsw-alias-scrollbar-hover-l2': '#c6bba2',
      // The neutral greys are blue-tinted. Buttons ("load earlier"), inputs,
      // chips and cards read their pale surfaces from this ramp, so warm it up
      // too; deep steps stay untouched because they are text/borders.
      '--dsw-static-neutral-bluish-00': '#fbf6ea',
      '--dsw-static-neutral-bluish-50': '#faf6ee',
      '--dsw-static-neutral-bluish-55': '#f8f4ea',
      '--dsw-static-neutral-bluish-60': '#f7f3ea',
      '--dsw-static-neutral-bluish-75': '#f4eee1',
      '--dsw-static-neutral-bluish-90': '#f2ecdf',
      '--dsw-static-neutral-bluish-100': '#efe9db',
      '--dsw-static-neutral-bluish-150': '#ece6d7',
      '--dsw-static-neutral-bluish-200': '#e7dfcd',
      // Mid and deep steps carry secondary text and icons (task rows read
      // #adb2b8 = bluish-400). Paper never covered them, so those rows kept a
      // cool grey on a warm sheet; warm the whole ramp in the same order.
      '--dsw-static-neutral-bluish-300': '#d8cfba',
      '--dsw-static-neutral-bluish-310': '#d3c8b2',
      '--dsw-static-neutral-bluish-400': '#a49a89',
      '--dsw-static-neutral-bluish-500': '#8a7f6e',
      '--dsw-static-neutral-bluish-600': '#7d7262',
      '--dsw-static-neutral-bluish-700': '#6f6557',
      '--dsw-static-neutral-bluish-750': '#4f473a',
      '--dsw-static-neutral-bluish-800': '#3b342a',
    };

    // Swatches double as both the current-state indicator and the toggle.
    const THEME_SWATCHES = [
      { id: 'dark', label: '深色', color: '#15171a', ring: 'rgba(255,255,255,0.28)' },
      { id: 'light', label: '浅色', color: '#f7f8fa', ring: 'rgba(0,0,0,0.35)' },
      { id: 'paper', label: '纸质', color: '#efe4cd', ring: 'rgba(0,0,0,0.28)' },
    ];

    function createThemeSwitcher(ctx) {
      const readScheme = () => {
        try {
          const value = window.localStorage.getItem(SCHEME_KEY);
          if (value === 'dark' || value === 'light' || value === 'paper') return value;
          // Migrate the old paper-only flag from before the palette was local.
          if (window.localStorage.getItem(LEGACY_PAPER_KEY) === '1') return 'paper';
        } catch (_error) { /* storage unavailable */ }
        return null;
      };
      const writeScheme = (value) => {
        try {
          window.localStorage.setItem(SCHEME_KEY, value);
          window.localStorage.removeItem(LEGACY_PAPER_KEY);
        } catch (_error) { /* storage unavailable */ }
      };
      // What the Host currently publishes; used only for the first visit.
      const hostScheme = () => {
        try {
          const theme = typeof ctx.get === 'function' ? ctx.get('theme') : ctx.theme;
          const snapshot = theme && typeof theme.getTheme === 'function' ? theme.getTheme() : null;
          if (snapshot) {
            if (snapshot.preference === 'dark') return 'dark';
            if (snapshot.preference === 'light') return 'light';
          }
          const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
          return media && media.matches ? 'dark' : 'light';
        } catch (_error) { return 'dark'; }
      };

      const getTheme = () => {
        try {
          return typeof ctx.get === 'function' ? ctx.get('theme') : ctx.theme;
        } catch (_error) { return null; }
      };

      let paperDispose = null;
      let paperRetry = null;
      let paperAttempts = 0;
      function setPaperLayer(on) {
        if (paperRetry) { clearTimeout(paperRetry); paperRetry = null; }
        const theme = getTheme();
        if (on) {
          if (paperDispose) return;
          if (theme && typeof theme.overrideTokens === 'function') {
            const modes = {};
            Object.keys(PAPER_TOKENS).forEach((name) => {
              modes[name] = { light: PAPER_TOKENS[name], dark: PAPER_TOKENS[name] };
            });
            try {
              paperDispose = theme.overrideTokens('workbench:paper', modes);
              paperAttempts = 0;
            } catch (error) {
              console.warn('[workbench] paper override failed', error);
              paperDispose = null;
            }
          }
          // The theme service can still be loading on a freshly refreshed tab.
          // Without the override layer only the CSS rules below apply, so the
          // first paint keeps the Host palette and the page looks half-themed
          // until the switcher is used. Keep retrying until it exists.
          if (!paperDispose && paperAttempts < 40) {
            paperAttempts += 1;
            paperRetry = setTimeout(() => {
              paperRetry = null;
              if (readScheme() === 'paper') applyScheme('paper');
            }, 120);
          }
        } else if (paperDispose) {
          try { paperDispose(); } catch (_error) { /* already gone */ }
          paperDispose = null;
          paperAttempts = 0;
        }
        // Marker for paper-only rules (code surfaces) that tokens cannot reach.
        try {
          if (on) document.body.setAttribute('data-wb-paper', '1');
          else document.body.removeAttribute('data-wb-paper');
        } catch (_error) { /* body not ready */ }
      }

      // Paint one palette on this window only: the presenter keys the base
      // palettes off the body attribute, so flipping it here never touches the
      // Host preference other windows read.
      function applyScheme(scheme) {
        const body = document.body;
        if (!body) return;
        const dark = scheme === 'dark';
        try {
          if (dark) body.setAttribute('data-ds-dark-theme', '');
          else body.removeAttribute('data-ds-dark-theme');
          document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
        } catch (_error) { /* document not ready */ }
        setPaperLayer(scheme === 'paper');
      }

      function ThemeSwitcher() {
        const boxRef = React.useRef(null);
        // First visit adopts whatever the Host publishes; from then on this
        // window keeps its own palette.
        const [scheme, setScheme] = React.useState(() => readScheme() || hostScheme());

        React.useEffect(() => {
          const current = readScheme() || scheme;
          if (!readScheme()) writeScheme(current);
          applyScheme(current);
          // The presenter applies the Host snapshot asynchronously during load;
          // a handful of idempotent re-asserts keeps this window's palette from
          // being overwritten in the first frames after a refresh.
          let ticks = 0;
          const timer = setInterval(() => {
            ticks += 1;
            applyScheme(readScheme() || hostScheme());
            if (ticks >= 10) clearInterval(timer);
          }, 300);
          return () => clearInterval(timer);
        }, []);

        // The account block is fixed to the right and changes width (a reconnect
        // banner widens it), so park the swatches against its measured left edge
        // instead of a guessed margin.
        React.useEffect(() => {
          const box = boxRef.current;
          if (!box) return undefined;
          const place = () => {
            const settings = document.querySelector('[class*="settingsArea"]');
            if (!settings) {
              box.style.right = '150px';
              return;
            }
            const rect = settings.getBoundingClientRect();
            if (rect.width > 0) {
              box.style.right = (rect.width + 16 + 12) + 'px';
              box.style.top = rect.top + 'px';
              box.style.height = rect.height + 'px';
            } else {
              // Narrow screens hide the account block; pin the swatches right.
              box.style.right = '12px';
              box.style.top = '2px';
              box.style.height = '40px';
            }
          };
          place();
          let observer = null;
          const settings = document.querySelector('[class*="settingsArea"]');
          if (settings && typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(place);
            // border-box: the account's width changes through its chrome, not
            // just its text content.
            observer.observe(settings, { box: 'border-box' });
          }
          window.addEventListener('resize', place);
          return () => {
            if (observer) observer.disconnect();
            window.removeEventListener('resize', place);
          };
        }, []);

        // Another window changed the shared preference: the presenter resets the
        // DOM from that snapshot, so re-assert this window's palette right after.
        React.useEffect(() => {
          if (typeof ctx.on !== 'function') return undefined;
          let off = null;
          let timer = null;
          try {
            off = ctx.on('theme/change', () => {
              if (timer) clearTimeout(timer);
              timer = setTimeout(() => {
                timer = null;
                applyScheme(readScheme() || hostScheme());
              }, 0);
            });
          } catch (_error) {
            off = null;
          }
          return () => {
            if (timer) clearTimeout(timer);
            if (typeof off === 'function') off();
          };
        }, []);

        const choose = (id) => {
          writeScheme(id);
          setScheme(id);
          applyScheme(id);
        };

        return h('div', {
          ref: boxRef,
          style: {
            position: 'fixed', top: 2, height: 40, zIndex: 301,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          },
          title: '主题（仅本窗口）',
        },
          THEME_SWATCHES.map((swatch) => {
            const active = scheme === swatch.id;
            return h('button', {
              key: swatch.id,
              type: 'button',
              title: swatch.label,
              'aria-label': swatch.label,
              'aria-pressed': active ? 'true' : 'false',
              onClick: () => choose(swatch.id),
              style: {
                width: 17, height: 17, padding: 0, borderRadius: '50%', flex: '0 0 auto',
                background: swatch.color,
                // A hairline ring keeps the dark swatch readable on a dark bar;
                // the selected one only thickens and takes the brand color.
                border: (active ? '1.5px' : '1px') + ' solid ' + (active ? 'var(--dsw-alias-brand-primary)' : swatch.ring),
                boxSizing: 'border-box',
                cursor: 'pointer',
                transition: 'border-color .12s, border-width .12s',
              },
            });
          }),
        );
      }
      return ThemeSwitcher;
    }

    // ---------- native sidebar panel mirror ----------
    // The workbench keeps no navigation list of its own: whatever the sidebar
    // lists (Plugins, Automations, More — plus any plugin that registers a
    // panel later) is mirrored, click delegated to that row. The placement
    // store decides whether each row shows in the system bar, the module row,
    // or nowhere.
    function useNativeEntries() {
      const [items, setItems] = React.useState(function () { return []; });

      React.useEffect(function () {
        function sync() {
          const list = document.querySelector('nav[class*="panelList"]');
          if (!list) return;
          const next = [];
          Array.prototype.forEach.call(list.children, function (node) {
            const btn = node.tagName === 'BUTTON'
              ? node
              : (node.querySelector ? node.querySelector('button') : null);
            if (!btn) return;
            const label = btn.getAttribute('aria-label') || String(node.textContent || '').trim();
            const svg = btn.querySelector('svg');
            next.push({ label: label || '入口', html: svg ? svg.outerHTML : '', btn: btn });
          });
          setItems(function (prev) {
            const same = prev.length === next.length && prev.every(function (item, index) {
              return item.label === next[index].label && item.html === next[index].html;
            });
            return same ? prev : next;
          });
        }
        sync();
        const observer = new MutationObserver(sync);
        observer.observe(document.body, { childList: true, subtree: true });
        return function () { observer.disconnect(); };
      }, []);

      return items;
    }

    function createTopBar(ctx, balance) {
      const ThemeSwitcher = createThemeSwitcher(ctx);

      function BalanceChip() {
        const snap = React.useSyncExternalStore(balance.subscribe, balance.getSnapshot);
        const [hover, setHover] = React.useState(false);
        const tone = snap.phase === 'ready' ? balanceTone(snap.amount) : 'muted';
        const value = snap.phase === 'ready' && typeof snap.amount === 'number' ? snap.amount.toFixed(2) : (snap.phase === 'loading' ? '…' : '—');
        const toneColor = tone === 'green' ? '#4ade80' : tone === 'amber' ? '#e3b341' : tone === 'red' ? '#f87171' : 'var(--dsw-alias-label-secondary)';
        // The border follows the theme: hard-coded dark greens read as a black
        // ring on light/paper backgrounds.
        const borderBase = 'var(--dsw-alias-border-l2)';
        const at = new Date(snap.updatedAt || Date.now()).toLocaleTimeString('zh-CN', { hour12: false });
        return h('div', {
          style: { position: 'relative', display: 'inline-flex' },
          onMouseEnter: () => setHover(true),
          onMouseLeave: () => setHover(false),
        },
          h('button', {
            type: 'button',
            className: 'wb-balance',
            onClick: () => window.open('https://platform.deepseek.com/top_up', '_blank', 'noopener,noreferrer'),
            style: { display: 'inline-flex', alignItems: 'center', gap: 3, height: 26, padding: '0 10px', borderRadius: 8, border: '1px solid ' + borderBase, background: 'transparent', color: toneColor, fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums', cursor: 'pointer', transition: 'background .12s, border-color .12s' },
          }, h('span', { 'aria-hidden': true }, '¥'), h('span', null, value)),
          hover && snap.phase === 'ready'
            ? h('div', { className: 'wb-balance-tip' },
                h('div', null, '充值余额 ¥' + (snap.amount || 0).toFixed(2)),
                h('div', { style: { opacity: 0.7 } }, '更新于 ' + at),
                h('div', null, '点击前往充值'),
              )
            : null,
        );
      }

      const accountStore = createAccountStore(ctx);
      accountStore.start();

      function AccountButton() {
        const snap = React.useSyncExternalStore(accountStore.subscribe, accountStore.getSnapshot);
        const [open, setOpen] = React.useState(false);
        const name = snap.phase === 'ready' ? snap.name : (snap.phase === 'loading' ? '…' : '账号');
        const menuItem = (label, onClick) => h('button', {
          type: 'button',
          onClick: () => { setOpen(false); onClick(); },
          style: { display: 'block', width: '100%', textAlign: 'left', padding: '7px 12px', border: 'none', background: 'transparent', color: 'var(--dsw-alias-label-primary)', cursor: 'pointer', fontSize: 12 },
        }, label);
        const account = ctx.remote && ctx.remote.account;
        const meta = { version: '1.0.0', locale: 'zh-CN', timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60 };
        return h('div', { style: { position: 'relative' } },
          h('button', {
            type: 'button', title: name, onClick: () => setOpen((v) => !v),
            style: { display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', borderRadius: 8, border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-primary)', cursor: 'pointer', fontSize: 12 },
          }, h('span', { style: { maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, name)),
          open ? h('div', {
            style: { position: 'absolute', right: 0, top: 'calc(100% + 6px)', minWidth: 160, background: 'var(--dsw-alias-bg-overlay)', border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', padding: '4px 0', zIndex: 200 },
          },
            menuItem('设置', () => { const layout = ctx.get('layout'); if (layout) { try { layout.selectPanel('settings'); } catch (_e) {} } }),
            menuItem('意见反馈', () => window.open('https://github.com/deepseek-ai/deepseek-harness/issues', '_blank', 'noopener,noreferrer')),
            menuItem('退出登录', () => { if (account && account.signOut) Promise.resolve(account.signOut(meta)).catch(() => {}); }),
          ) : null,
        );
      }

      function TopBar(props) {
        const rootRef = React.useRef(null);
        const tabsRef = React.useRef(null);
        const enabled = useFeatures();
        const reg = useRegistry();
        const usePanelInfo = props.usePanelInfo;
        const panelInfo = typeof usePanelInfo === 'function' ? usePanelInfo((s) => s) : null;
        const activePanelId = panelInfo ? panelInfo.activePanelId : null;
        const placed = usePlacement();
        const ordered = useOrder();
        const viewPlacement = (id) => {
          const value = placed['view:' + id];
          return value === 'system' || value === 'modules' || value === 'hidden' ? value : 'modules';
        };
        const nativePlacement = (item) => {
          const value = placed['native:' + item.label];
          return value === 'system' || value === 'modules' || value === 'hidden' ? value : 'system';
        };
        const nativeItems = useNativeEntries();
        const tabViews = applyOrder(
          ordered,
          Array.from(reg.views.values())
            .filter((item) => item.tab !== false && viewPlacement(item.id) === 'modules')
            .sort((a, b) => a.order - b.order),
          (item) => 'view:' + item.id,
        );
        // Both bars render as one mixed list sorted by the settings order, so a
        // native row and a module page can trade places with each other.
        const systemEntries = applyOrder(ordered, [].concat(
          nativeItems
            .filter((item) => nativePlacement(item) === 'system')
            .map((item) => ({ kind: 'native', key: 'native:' + item.label, label: item.label, html: item.html, btn: item.btn })),
          Array.from(reg.views.values())
            .filter((item) => item.tab !== false && viewPlacement(item.id) === 'system')
            .sort((a, b) => a.order - b.order)
            .map((item) => ({ kind: 'view', key: 'view:' + item.id, id: item.id, label: item.title, icon: item.icon })),
        ), (entry) => entry.key);
        const moduleEntries = applyOrder(ordered, [].concat(
          tabViews.map((item) => ({ kind: 'view', key: 'view:' + item.id, id: item.id, label: item.title, icon: item.icon, badge: item.badge })),
          nativeItems
            .filter((item) => nativePlacement(item) === 'modules')
            .map((item) => ({ kind: 'native', key: 'native:' + item.label, label: item.label, html: item.html, btn: item.btn })),
        ), (entry) => entry.key);
        const tabs = [{ id: null, title: '会话', icon: IconChat, subtitle: '当前会话与对话记录' }];
        const tabKey = tabs.map((item) => (item.id === null ? '__conversation' : item.id)).join('|');
        // Kept outside the component: if the shell ever remounts the top bar while
        // switching panels, the plate still starts from where it was instead of
        // teleporting to the new tab.
        const [glider, setGlider] = React.useState(lastGlider.width > 0 ? lastGlider : null);

        // The selected tab's grey plate: measured from the live DOM and animated
        // between tabs, so the highlight slides instead of blinking tab to tab.
        React.useLayoutEffect(() => {
          const host = tabsRef.current;
          if (!host) return undefined;
          const measure = () => {
            const el = host.querySelector('[data-active="1"]');
            if (!el) { setGlider(null); return; }
            const next = { left: el.offsetLeft, width: el.offsetWidth };
            lastGlider = next;
            setGlider(next);
          };
          measure();
          const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
          if (observer) observer.observe(host);
          window.addEventListener('resize', measure);
          return () => {
            if (observer) observer.disconnect();
            window.removeEventListener('resize', measure);
          };
        }, [activePanelId, tabKey]);

        React.useEffect(() => {
          const el = rootRef.current;
          if (!el) return undefined;
          let frame = el.parentElement;
          while (frame && frame !== document.body && getComputedStyle(frame).display !== 'grid') frame = frame.parentElement;
          const cleanup = [];
          if (frame && frame !== document.body) {
            frame.style.paddingTop = TOPBAR_HEIGHT + 'px';
            frame.style.boxSizing = 'border-box';
            cleanup.push(() => {
              frame.style.paddingTop = '';
              frame.style.boxSizing = '';
            });
          }
          const wsRoot = document.querySelector('[class*="sidebarCol"] [class*="workspaces"]');
          if (wsRoot) {
            Array.from(wsRoot.children).forEach((g, i) => { if (i > 0) g.style.display = 'none'; });
          }
          // Narrow screens keep the official sidebar toggle: the workbench has no
          // session list of its own, so hiding it strands phone users.
          const narrowScreen = typeof window !== 'undefined' && window.innerWidth < 768;
          document.querySelectorAll('button[aria-label]').forEach((b) => {
            const label = b.getAttribute('aria-label') || '';
            if (!narrowScreen && (label.includes('侧栏') || label.includes('侧边栏') || label.includes('折叠') || label.includes('collapse') || label.includes('toggle'))) {
              b.style.display = 'none';
            }
          });
          if (narrowScreen) {
            // The official toggle lives inside the translated sidebar container,
            // so a fixed copy would ride along with it. Own button in <body>,
            // clicks delegated to the official one.
            const original = Array.from(document.querySelectorAll('button[aria-label]'))
              .find((b) => b.getAttribute('aria-label') === '打开侧边栏');
            if (original) {
              const toggle = document.createElement('button');
              toggle.type = 'button';
              toggle.className = 'wb-mobile-sidebar-toggle';
              toggle.setAttribute('aria-label', '显示会话列表');
              toggle.textContent = '☰';
              toggle.addEventListener('click', () => original.click());
              document.body.appendChild(toggle);
              cleanup.push(() => toggle.remove());
            }
          }
          const settings = document.querySelector('[class*="settingsArea"]');
          if (settings) {
            settings.style.position = 'fixed';
            settings.style.top = '2px';
            settings.style.right = '16px';
            settings.style.left = 'auto';
            settings.style.bottom = 'auto';
            settings.style.width = 'max-content';
            settings.style.zIndex = '300';
            cleanup.push(() => {
              settings.style.position = '';
              settings.style.top = '';
              settings.style.right = '';
              settings.style.left = '';
              settings.style.bottom = '';
              settings.style.width = '';
              settings.style.zIndex = '';
            });
          }
          const menuObserver = new MutationObserver(() => {
            document.querySelectorAll('[role="menu"]').forEach((menu) => {
              const txt = menu.textContent || '';
              if (txt.includes('退出登录')) menu.style.top = '56px';
            });
          });
          menuObserver.observe(document.body, { childList: true, subtree: true });
          return () => {
            cleanup.forEach((fn) => fn());
            menuObserver.disconnect();
          };
        }, []);

        const selectPanel = (id) => openView(id);
        const iconBtn = (id, label, Icon) => h('button', {
          key: id, type: 'button', onClick: () => selectPanel(id),
          className: 'wb-nav-item',
          'aria-label': label,
          style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4, height: 34, padding: '0 9px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--dsw-alias-label-secondary)', cursor: 'pointer', flex: '0 0 auto', transition: 'background .15s, color .15s' },
        }, h(Icon, { size: 18 }), h('span', { className: 'wb-nav-label' }, label));

        const viewTab = (item) => {
          const active = item.id === null
            ? (activePanelId === null || activePanelId === undefined)
            : activePanelId === item.id;
          let badge = null;
          if (typeof item.badge === 'function') {
            try { badge = item.badge(); } catch (_error) { badge = null; }
          }
          const showBadge = badge !== null && badge !== undefined && badge !== '' && badge !== 0 && badge !== false;
          return h('button', {
            key: item.id === null ? '__conversation' : item.id,
            type: 'button',
            className: 'wb-view-tab',
            'data-active': active ? '1' : '0',
            onClick: () => selectPanel(item.id),
            style: {
              position: 'relative', zIndex: 1,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: 31, padding: '0 11px', borderRadius: 7,
              border: 'none',
              background: 'transparent',
              color: active ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)',
              fontWeight: 400,
              fontSize: 12,
              cursor: 'pointer', flex: '0 0 auto',
              transition: 'color .12s',
            },
          },
            item.icon ? h(item.icon, { size: 15, active }) : null,
            h('span', null, item.title),
            showBadge ? h('span', { className: 'wb-view-tab-badge' }, String(badge)) : null,
          );
        };

        // A native sidebar row moved into the module row: same look as a page
        // tab, but the click is delegated to the original sidebar button.
        const nativeTab = (item) => h('button', {
          key: 'native:' + item.label,
          type: 'button',
          className: 'wb-view-tab',
          onClick: () => { try { item.btn.click(); } catch (_error) { /* row went away */ } },
          style: {
            position: 'relative', zIndex: 1,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            height: 31, padding: '0 11px', borderRadius: 7,
            border: 'none', background: 'transparent',
            color: 'var(--dsw-alias-label-secondary)',
            fontWeight: 400, fontSize: 12,
            cursor: 'pointer', flex: '0 0 auto', transition: 'color .12s',
          },
        },
          item.html
            ? h('span', { 'aria-hidden': true, style: { display: 'inline-flex', width: 15, height: 15 }, dangerouslySetInnerHTML: { __html: item.html } })
            : null,
          h('span', null, item.label),
        );

        return h('div', { ref: rootRef, style: { position: 'fixed', top: 0, left: 0, right: 0, height: TOPBAR_HEIGHT, zIndex: 100, pointerEvents: 'auto', display: 'flex', flexDirection: 'column', background: 'var(--dsw-alias-bg-base)', borderBottom: '1px solid var(--dsw-alias-border-l1)' } },
          h('div', { style: { height: 56, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px' } },
            h('div', { className: 'wb-topbar-brand', style: { width: 214, flex: '0 0 auto' } }),
            // System-level entry, first in the top-left corner: the workbench's
            // own mark opens its settings (feature switches + module list).
            h('button', {
              type: 'button',
              className: 'wb-nav-item wb-settings-entry',
              'aria-label': '工作台设置',
              onClick: () => selectPanel(SETTINGS_VIEW_ID),
              style: {
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 4, height: 34, padding: '0 9px', borderRadius: 8, border: 'none',
                background: 'transparent', color: 'var(--dsw-alias-label-secondary)',
                cursor: 'pointer', flex: '0 0 auto', transition: 'background .15s, color .15s',
              },
            },
              h(IconWorkbenchTabs, { size: 18 }),
              h('span', { className: 'wb-nav-label' }, '工作台'),
            ),
            // Modules moved to the system bar sit right next to the workbench
            // mark: keeping them before the native mirror means they are not
            // pushed to the far right edge under the account chip.
            h('div', { className: 'wb-topbar-icons', style: { display: 'flex', gap: 2, flex: '1 1 auto', overflow: 'hidden' } },
              systemEntries.map((entry) => (entry.kind === 'view'
                ? iconBtn(entry.id, entry.label, entry.icon || IconChat)
                : h('button', {
                    key: entry.key,
                    type: 'button',
                    className: 'wb-nav-item',
                    'aria-label': entry.label,
                    onClick: () => { try { entry.btn.click(); } catch (_error) { /* row went away */ } },
                    style: {
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      gap: 4, height: 34, padding: '0 9px', borderRadius: 8, border: 'none',
                      background: 'transparent', color: 'var(--dsw-alias-label-secondary)',
                      cursor: 'pointer', flex: '0 0 auto', transition: 'background .15s, color .15s',
                    },
                  },
                    h('span', { 'aria-hidden': true, style: { display: 'inline-flex', width: 18, height: 18, flex: '0 0 auto' }, dangerouslySetInnerHTML: { __html: entry.html } }),
                    h('span', { className: 'wb-nav-label' }, entry.label),
                  ))),
            ),
            enabled.theme ? h(ThemeSwitcher) : null,
          ),
          h('div', { style: { height: 45, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderTop: '1px solid var(--dsw-alias-border-l1)' } },
            h('div', { ref: tabsRef, style: { position: 'relative', display: 'flex', alignItems: 'center', gap: 4, flex: 1, overflowX: 'auto', overflowY: 'hidden' } },
              glider
                ? h('div', {
                    className: 'wb-tab-glider',
                    'aria-hidden': true,
                    style: {
                      position: 'absolute', top: 0, height: 31, borderRadius: 7,
                      // translateX keeps the slide on the compositor: switching back
                      // to the (heavy) conversation page must not drop its frames.
                      left: 0, width: glider.width,
                      transform: 'translateX(' + glider.left + 'px)',
                      background: 'var(--dsw-alias-bg-layer-2)',
                      boxShadow: 'inset 0 0 0 1px var(--dsw-alias-border-l2)',
                      pointerEvents: 'none', zIndex: 0,
                    },
                  })
                : null,
              tabs.map(viewTab),
              moduleEntries.map((entry) => (entry.kind === 'view'
                ? viewTab({ id: entry.id, title: entry.label, icon: entry.icon, badge: entry.badge })
                : nativeTab(entry))),
            ),
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, flex: '0 0 auto' } },
              enabled.balance ? h(BalanceChip, null) : null,
              enabled.restart ? h('button', {
                type: 'button', title: '重启 DSH', className: 'wb-restart',
                onClick: () => { restartDsh(ctx); },
                style: { width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-secondary)', cursor: 'pointer', flex: '0 0 auto', transition: 'background .12s, color .12s, border-color .12s' },
              }, h(IconRestart, { size: 15 })) : null,
            ),
          ),
        );
      }
      return TopBar;
    }

    // ───────────────────────────── 每轮费用 ─────────────────────────────
    // 官方价目（2026-10-18，元 / 百万 tokens）：{ 空闲, 高峰 }
    var PRICING = {
      "deepseek-flash": {
        offPeak: { cacheHit: 0.02, cacheMiss: 1.0, output: 4.0 },
        peak: { cacheHit: 0.04, cacheMiss: 2.0, output: 8.0 },
      },
      "deepseek-v4-pro": {
        offPeak: { cacheHit: 0.15, cacheMiss: 4.5, output: 13.5 },
        peak: { cacheHit: 0.3, cacheMiss: 9.0, output: 27.0 },
      },
    };

    var BJ_FORMAT = null;
    function beijingParts(ts) {
      try {
        if (BJ_FORMAT === null) {
          BJ_FORMAT = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Shanghai",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        }
        var parts = BJ_FORMAT.formatToParts(new Date(ts));
        var out = {};
        for (var i = 0; i < parts.length; i += 1) out[parts[i].type] = parts[i].value;
        var hour = Number(out.hour);
        if (hour === 24) hour = 0;
        return { weekday: out.weekday, hour: hour, minute: Number(out.minute || 0) };
      } catch (_error) {
        var d = new Date(ts);
        var shifted = new Date(d.getTime() + (d.getTimezoneOffset() + 480) * 60000);
        return {
          weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][shifted.getDay()],
          hour: shifted.getHours(),
          minute: shifted.getMinutes(),
        };
      }
    }

    function isPeak(ts) {
      var p = beijingParts(ts == null ? Date.now() : ts);
      if (p.weekday === "Sat" || p.weekday === "Sun") return false;
      var minutes = p.hour * 60 + p.minute;
      return (
        (minutes >= 9 * 60 && minutes < 12 * 60) ||
        (minutes >= 14 * 60 && minutes < 18 * 60)
      );
    }

    function num(value) {
      return typeof value === "number" && isFinite(value) && value > 0 ? value : 0;
    }

    function modelOf(usage) {
      var routes = usage && usage.routes;
      if (Array.isArray(routes)) {
        for (var i = 0; i < routes.length; i += 1) {
          if (routes[i] && typeof routes[i].model === "string" && routes[i].model) {
            return routes[i].model;
          }
        }
      }
      return "deepseek-flash";
    }

    function pricesFor(model) {
      var key = String(model || "").toLowerCase();
      return key.indexOf("v4-pro") >= 0 ? PRICING["deepseek-v4-pro"] : PRICING["deepseek-flash"];
    }

    function timeMs(value) {
      var n = typeof value === "number" ? value : Number(value);
      if (!isFinite(n) || n <= 0) return undefined;
      // Turn times can arrive in seconds; anything below 1e12 ms is seconds.
      return n < 1e12 ? n * 1000 : n;
    }

    function computeCost(usage, ts) {
      var model = modelOf(usage);
      var peak = isPeak(timeMs(ts));
      var table = peak ? pricesFor(model).peak : pricesFor(model).offPeak;
      var hit = num(usage && usage.cacheReadTokens);
      var miss = num(usage && usage.uncachedInputTokens) + num(usage && usage.cacheWriteTokens);
      var output = num(usage && usage.outputTokens);
      return {
        cost: (hit * table.cacheHit + miss * table.cacheMiss + output * table.output) / 1e6,
        peak: peak,
        table: table,
        hit: hit,
        miss: miss,
        output: output,
        model: model,
      };
    }

    function formatMoney(value) {
      if (typeof value !== "number" || !isFinite(value)) return "—";
      if (value === 0) return "0.00";
      var abs = Math.abs(value);
      if (abs < 0.01) return value.toFixed(4);
      if (abs < 1) return value.toFixed(3);
      return value.toFixed(2);
    }

    function formatTokens(value) {
      if (typeof value !== "number" || !isFinite(value)) return "0";
      try {
        return value.toLocaleString("zh-CN");
      } catch (_error) {
        return String(value);
      }
    }

    function same(left, right) {
      return left !== undefined && right !== undefined && String(left) === String(right);
    }

    function matchesTail(data, seq, turnId) {
      if (!data) return false;
      if (same(data.seq, seq)) return true;
      if (data.closing && data.closing.finalNode && same(data.closing.finalNode.seq, seq)) return true;
      if (turnId !== undefined && same(data.turn, turnId)) return true;
      return false;
    }

    function findUsage(snapshot, seq, turn) {
      if (!snapshot) return undefined;
      var turnId = turn && turn.id !== undefined ? turn.id : undefined;

      var turns = snapshot.timeline && snapshot.timeline.turns;
      if (turns && typeof turns.values === "function") {
        var iterator = turns.values();
        for (var step = iterator.next(); !step.done; step = iterator.next()) {
          var entry = step.value;
          var tail =
            entry && entry.data && typeof entry.data.get === "function"
              ? entry.data.get("turn-tail")
              : undefined;
          if (tail && tail.tokenUsage && matchesTail(tail, seq, turnId)) {
            return tail;
          }
        }
      }

      if (snapshot.nodes && typeof snapshot.nodes.forEach === "function") {
        var found;
        snapshot.nodes.forEach(function (node) {
          if (!node || node.kind !== "turn-tail" || !node.data || !node.data.tokenUsage) return;
          if (matchesTail(node.data, seq, turnId)) found = node.data;
        });
        if (found) return found;
      }
      return undefined;
    }

    function detailText(entry) {
      return [
        "模型 " + entry.model,
        "时段 " + (entry.peak ? "高峰" : "空闲") + "（周一至周五 9–12、14–18 为高峰）",
        "缓存命中 " + formatTokens(entry.hit) + " tok × ¥" + entry.table.cacheHit + "/M",
        "缓存未命中 " + formatTokens(entry.miss) + " tok × ¥" + entry.table.cacheMiss + "/M",
        "输出 " + formatTokens(entry.output) + " tok × ¥" + entry.table.output + "/M",
        "合计 ¥" + formatMoney(entry.cost),
      ].join("\n");
    }

    var COST_STYLE = `
.dsh-cost {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  align-self: flex-end;
  margin: 4px 2px 0 0;
  padding: 2px 7px;
  border: 1px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.24));
  border-radius: 6px;
  color: var(--dsw-alias-label-tertiary, #8b949e);
  background: transparent;
  font: inherit;
  font-size: 11px;
  line-height: 1.6;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  cursor: default;
  user-select: none;
}
.dsh-cost[data-peak="1"] {
  color: #d29922;
  border-color: color-mix(in srgb, #d29922 40%, transparent);
}
.dsh-cost-symbol { opacity: 0.6; }
`;

    function createTurnCost() {
      return function TurnCost(props) {
        var useChat = props.useChat;
        var usage;
        if (typeof useChat === "function") {
          usage = useChat(function (snapshot) {
            return findUsage(snapshot, props.seq, props.turn);
          });
        }
        if (!usage) return null;
        // Price by the turn's own timestamp, not by when this row happens to
        // render: otherwise every historical turn reprices at the current hour.
        var entry = computeCost(usage.tokenUsage, usage.time);
        return h(
          "div",
          {
            className: "dsh-cost",
            "data-peak": entry.peak ? "1" : "0",
            title: detailText(entry),
          },
          h("span", { className: "dsh-cost-symbol", "aria-hidden": "true" }, "≈"),
          h("span", null, "¥" + formatMoney(entry.cost))
        );
      };
    }

    // ───────────────────────────── 运行光效 ─────────────────────────────
    var ORBIT_MS = 4800;
    var CORNER = 8;
    var SIGMA = 0.05;
    var STEP_PX = 2;

    function radiusOf(width, height) {
      return Math.max(0, Math.min(CORNER, width / 2, height / 2));
    }

    function perimeter(width, height) {
      var r = radiusOf(width, height);
      return 2 * (width - 2 * r) + 2 * (height - 2 * r) + 4 * ((Math.PI * r) / 2);
    }

    function pointOnRect(width, height, t) {
      var r = radiusOf(width, height);
      var straightX = Math.max(0, width - 2 * r);
      var straightY = Math.max(0, height - 2 * r);
      var arc = (Math.PI * r) / 2;
      var total = 2 * straightX + 2 * straightY + 4 * arc;
      if (total === 0) return { x: 0, y: 0 };
      var d = (((t % 1) + 1) % 1) * total;

      if (d < straightX) return { x: r + d, y: 0 };
      d -= straightX;
      if (d < arc) {
        var a1 = -Math.PI / 2 + (d / arc) * (Math.PI / 2);
        return { x: width - r + r * Math.cos(a1), y: r + r * Math.sin(a1) };
      }
      d -= arc;
      if (d < straightY) return { x: width, y: r + d };
      d -= straightY;
      if (d < arc) {
        var a2 = (d / arc) * (Math.PI / 2);
        return { x: width - r + r * Math.cos(a2), y: height - r + r * Math.sin(a2) };
      }
      d -= arc;
      if (d < straightX) return { x: width - r - d, y: height };
      d -= straightX;
      if (d < arc) {
        var a3 = Math.PI / 2 + (d / arc) * (Math.PI / 2);
        return { x: r + r * Math.cos(a3), y: height - r + r * Math.sin(a3) };
      }
      d -= arc;
      if (d < straightY) return { x: 0, y: height - r - d };
      d -= straightY;
      var a4 = Math.PI + (Math.min(d, arc) / arc) * (Math.PI / 2);
      return { x: r + r * Math.cos(a4), y: r + r * Math.sin(a4) };
    }

    function hotWeight(phase, t) {
      var delta = Math.abs(phase - t);
      var dist = Math.min(delta, 1 - delta);
      return Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
    }

    var GLOW_STYLE = `
.dsh-glow-on {
  position: relative;
  border-radius: var(--dsw-radius-md, 8px);
}
.dsh-glow-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  filter: drop-shadow(0 0 2px rgba(170, 200, 255, 0.65));
}
body[data-wb-paper="1"] .dsh-glow-canvas {
  filter: drop-shadow(0 0 2px rgba(198, 156, 96, 0.6));
}
/* paper: every card-like surface follows the paper base; the code surface is
   deeper and overrides the card rule below (same specificity, later wins). */
body[data-wb-paper="1"] [class*="_tile"],
body[data-wb-paper="1"] [class*="_card"],
body[data-wb-paper="1"] [class*="_Card"],
body[data-wb-paper="1"] [class*="_fileCard"],
body[data-wb-paper="1"] [class*="hz8-rW_header"] {
  background: #f2ece0 !important;
}
body[data-wb-paper="1"] .md-code-block,
body[data-wb-paper="1"] pre,
body[data-wb-paper="1"] [class*="_header_1mqf1"] {
  background: #ece2cc !important;
}
body[data-wb-paper="1"] :not(pre) > code {
  background: #efe6d4 !important;
}
/* Session hover preview ships white-on-dark copy; invert it on paper. */
body[data-wb-paper="1"] [class*="_hoverTitle"] {
  color: #2f2a22 !important;
}
body[data-wb-paper="1"] [class*="_hoverStatus"] {
  color: #6f6557 !important;
}
body[data-wb-paper="1"] [class*="_hoverTime"] {
  color: #8a7f6e !important;
}
body[data-wb-paper="1"] [class*="_hoverPath"] {
  color: #6f6557 !important;
}
`;

    // The native "running" spinner is hidden only while the glow is on. This
    // block lives in installGlow's own lifetime instead of GLOW_STYLE: the
    // style tag used to be injected with the plugin, so turning the switch off
    // left the spinner hidden with nothing drawing in its place.
    var HIDDEN_SPINNER_STYLE = `
div[data-row-key^="session:"]:has(svg[data-state="ongoing"]) svg[data-state="ongoing"],
.dsh-glow-on svg[data-state="ongoing"],
.dsh-glow-on [data-state="ongoing"],
.dsh-glow-on > span:first-child > svg {
  display: none !important;
}
`;

    function installGlow(ctx) {
      var active = new Map();
      var watched = new Map();
      var unsubscribeJobs = null;
      var frame = null;
      var observer = null;
      var scheduled = false;
      var disposed = false;
      var spinnerStyle = null;

      if (typeof document !== 'undefined') {
        spinnerStyle = document.createElement('style');
        spinnerStyle.dataset.plugin = 'dsh-workbench:glow-spinner';
        spinnerStyle.textContent = HIDDEN_SPINNER_STYLE;
        document.head.append(spinnerStyle);
      }

      function sessionIdOf(row) {
        var key = row.getAttribute("data-row-key");
        return key && key.indexOf("session:") === 0 ? key.slice(8) : null;
      }

      function hasRunningJob(sessionId) {
        var snapshot = ctx.jobs.state.getSnapshot();
        var jobs = snapshot.rows && snapshot.rows[sessionId];
        if (!jobs) return false;
        for (var i = 0; i < jobs.length; i += 1) {
          if (jobs[i].status === "running") return true;
        }
        return false;
      }

      function glowState(row) {
        // 2 = 双光（会话运行中），1 = 单光（仅后台任务），0 = 不亮
        if (row.querySelector('svg[data-state="ongoing"]') !== null) return 2;
        var sessionId = sessionIdOf(row);
        if (!sessionId) return 0;
        if (!watched.has(sessionId)) {
          watched.set(sessionId, ctx.jobs.watchRows(sessionId));
        }
        return hasRunningJob(sessionId) ? 1 : 0;
      }

      function currentSessionId() {
        var row = document.querySelector('div[data-row-key^="session:"][aria-selected="true"]');
        return row ? sessionIdOf(row) : null;
      }

      function activate(row, lights) {
        row.classList.add("dsh-glow-on");
        if (lights === 1) row.setAttribute("data-glow-dim", "1");
        else row.removeAttribute("data-glow-dim");
        var canvas = document.createElement("canvas");
        canvas.className = "dsh-glow-canvas";
        row.appendChild(canvas);
        active.set(row, { canvas: canvas, lights: lights });
      }

      function deactivate(row) {
        var entry = active.get(row);
        if (!entry) return;
        entry.canvas.remove();
        row.classList.remove("dsh-glow-on");
        row.removeAttribute("data-glow-dim");
        active.delete(row);
      }

      function sync() {
        if (disposed) return;
        var rows = document.querySelectorAll('div[data-row-key^="session:"]');
        for (var i = 0; i < rows.length; i += 1) {
          var row = rows[i];
          var lights = glowState(row);
          if (lights > 0) {
            var entry = active.get(row);
            if (entry === undefined) {
              activate(row, lights);
            } else if (
              row.classList.contains("dsh-glow-on") !== true ||
              row.contains(entry.canvas) !== true
            ) {
              // React 重渲染会话行时会覆盖 className、删掉手动 append 的 canvas；
              // active 里还记着已激活，所以这里要检测并重挂。
              deactivate(row);
              activate(row, lights);
            } else if (entry.lights !== lights) {
              entry.lights = lights;
              if (lights === 1) row.setAttribute("data-glow-dim", "1");
              else row.removeAttribute("data-glow-dim");
            }
          } else if (active.has(row)) {
            deactivate(row);
          }
        }

        // 后台任务按钮：有任务运行就亮双光，并隐藏它自己的圆环。
        var button =
          document.querySelector('button[aria-label*="后台任务"]') ||
          document.querySelector('button[aria-label*="background task"]');
        if (button !== null) {
          var currentId = currentSessionId();
          var jobLights = currentId && hasRunningJob(currentId) ? 1 : 0;
          if (jobLights > 0) {
            var buttonEntry = active.get(button);
            if (buttonEntry === undefined) {
              activate(button, jobLights);
            } else if (
              button.classList.contains("dsh-glow-on") !== true ||
              button.contains(buttonEntry.canvas) !== true
            ) {
              deactivate(button);
              activate(button, jobLights);
            } else if (buttonEntry.lights !== jobLights) {
              buttonEntry.lights = jobLights;
              if (jobLights === 1) button.setAttribute("data-glow-dim", "1");
              else button.removeAttribute("data-glow-dim");
            }
          } else if (active.has(button)) {
            deactivate(button);
          }
        }

        active.forEach(function (_entry, row) {
          if (row.isConnected !== true) deactivate(row);
        });
      }

      function schedule() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(function () {
          scheduled = false;
          sync();
        });
      }

      function paint(entry, row, now) {
        var width = row.clientWidth;
        var height = row.clientHeight;
        if (width === 0 || height === 0) return;
        var canvas = entry.canvas;
        var dpr = window.devicePixelRatio || 1;
        if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
          canvas.width = Math.round(width * dpr);
          canvas.height = Math.round(height * dpr);
          canvas.style.width = width + "px";
          canvas.style.height = height + "px";
        }
        var context = canvas.getContext("2d");
        if (!context) return;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.clearRect(0, 0, width, height);
        context.lineWidth = 1;
        context.lineCap = "round";

        var r = radiusOf(width, height);
        var total = perimeter(width, height);
        var t = (now % ORBIT_MS) / ORBIT_MS;
        // 呼吸边框：2.8s 一个周期，和原来 CSS 动画同节奏；在 canvas 内画，
        // 所以只会有一条边（不会再和 CSS box-shadow 叠成双线）。
        var breath = 0.5 + 0.5 * Math.sin((now / 2800) * Math.PI * 2);
        var dim = entry.lights === 1 ? 0.35 : 1;
        var edgeAlpha = (0.12 + breath * 0.33) * dim;
        // Paper turns the blue streak into a bronze one; blue reads as ink
        // smear on a warm sheet.
        var paperNow = false;
        try { paperNow = document.body.hasAttribute("data-wb-paper"); } catch (_error) { paperNow = false; }
        var glowBase = paperNow ? [138, 106, 69] : [99, 149, 255];
        var glowHot = paperNow ? [198, 156, 96] : [205, 180, 255];

        context.save();
        context.lineWidth = 1;
        context.strokeStyle = "rgba(" + glowBase[0] + ", " + glowBase[1] + ", " + glowBase[2] + ", " + edgeAlpha.toFixed(3) + ")";
        context.shadowBlur = (4 + breath * 10) * dim;
        context.shadowColor = "rgba(" + glowBase[0] + ", " + glowBase[1] + ", " + glowBase[2] + ", " + ((0.2 + breath * 0.35) * dim).toFixed(3) + ")";
        context.beginPath();
        if (typeof context.roundRect === "function") {
          context.roundRect(0.5, 0.5, width - 1, height - 1, r);
        } else {
          context.rect(0.5, 0.5, width - 1, height - 1);
        }
        context.stroke();
        context.restore();

        var count = Math.max(24, Math.ceil(total / STEP_PX));
        for (var i = 0; i < count; i += 1) {
          var phase = i / count;
          var weight = hotWeight(phase, t);
          if (weight < 0.02) continue;
          var p0 = pointOnRect(width, height, phase);
          var p1 = pointOnRect(width, height, (i + 1) / count);
          var rChannel = Math.round(glowBase[0] + (glowHot[0] - glowBase[0]) * weight);
          var gChannel = Math.round(glowBase[1] + (glowHot[1] - glowBase[1]) * weight);
          var bChannel = Math.round(glowBase[2] + (glowHot[2] - glowBase[2]) * weight);
          // lights === 1 表示「只有后台任务」，整体压暗。
          var alpha = (0.05 + 0.95 * weight) * (entry.lights === 1 ? 0.35 : 1);
          context.strokeStyle =
            "rgba(" + rChannel + "," + gChannel + "," + bChannel + "," + alpha.toFixed(3) + ")";
          context.beginPath();
          context.moveTo(p0.x, p0.y);
          context.lineTo(p1.x, p1.y);
          context.stroke();
        }
      }

      function tick(now) {
        if (disposed) return;
        active.forEach(function (entry, row) {
          paint(entry, row, now);
        });
        frame = requestAnimationFrame(tick);
      }

      if (typeof MutationObserver !== "undefined" && document.body !== null) {
        observer = new MutationObserver(schedule);
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["data-state"],
        });
      }
      window.addEventListener("resize", schedule);
      unsubscribeJobs = ctx.jobs.state.subscribe(schedule);
      sync();
      frame = requestAnimationFrame(tick);

      return function () {
        disposed = true;
        if (spinnerStyle !== null) spinnerStyle.remove();
        if (frame !== null) cancelAnimationFrame(frame);
        if (observer !== null) observer.disconnect();
        window.removeEventListener("resize", schedule);
        if (unsubscribeJobs !== null) unsubscribeJobs();
        watched.forEach(function (release) {
          release();
        });
        watched.clear();
        active.forEach(function (_entry, row) {
          deactivate(row);
        });
      };
    }

    // 费用与光效样式（迁移自 dsh-usage-hud）
    var USAGE_STYLE = COST_STYLE + "\n" + GLOW_STYLE;

    return {
      inject: ['slots', 'remote', 'remote.account', 'jobs'],
      apply(ctx) {
        try {
        if (typeof document !== 'undefined') {
          ctx.effect(() => {
            const tag = document.createElement('style');
            tag.textContent = '@keyframes wb-spin { to { transform: rotate(360deg); } }'
              + '\n[class*="sidebarCol"] [class*="panelList"], [class*="sidebarCol"] [class*="newSession"], [class*="sidebarCol"] [class*="topStrip"] { display: none !important; }'
              + '\n[class*="sidebarCol"] [class*="logoRow"] { height: 0 !important; min-height: 0 !important; padding: 0 !important; margin: 0 !important; overflow: visible !important; }'
              + '\n[class*="sidebarCol"] [class*="workspaces"] { background: var(--dsw-alias-bg-base) !important; border: 1px solid var(--dsw-alias-border-l1) !important; border-radius: 12px !important; margin: 0 12px 8px 0 !important; overflow: hidden !important; }'
              + '\n[class*="sidebarCol"] [class*="workspaces"] > *:nth-child(n+2) { display: none !important; }'
              + '\n[class*="sidebarCol"] [class*="brand"]:not([class*="Identity"]):not([class*="Mark"]):not([class*="Name"]) { position: fixed !important; top: 14px !important; left: 16px !important; z-index: 300 !important; width: 260px !important; max-width: 260px !important; pointer-events: none !important; }'
              + '\n[class*="controls"] { display: none !important; }'
              + '\n[class*="sidebarCol"] [class*="brandIdentity"] { display: flex !important; align-items: center !important; gap: 6px !important; }'
              + '\n[role="menu"][style*="--dsh-menu-r3v"] { top: 56px !important; }'
              + '\n[class*="sidebarCol"] { border: none !important; }'
              + '\n.wb-session-row { display: flex; align-items: center; gap: 6px; width: 100%; padding: 5px 8px; border: none; border-radius: 6px; background: transparent; color: var(--dsw-alias-label-primary); cursor: pointer; text-align: left; font-size: 12px; }'
              + '\n.wb-session-row:hover { background: var(--dsw-alias-bg-layer-2); }'
              + '\n.wb-session-row .wb-session-more { opacity: 0; transition: opacity .12s; }'
              + '\n.wb-balance-tip { position: absolute; top: calc(100% + 6px); right: 0; z-index: 500; padding: 8px 10px; border-radius: 8px; background: var(--dsw-alias-bg-overlay, #23262c); border: 1px solid var(--dsw-alias-border-l2, #2f333b); color: var(--dsw-alias-label-primary); font-size: 11px; line-height: 1.7; white-space: nowrap; max-width: 240px; box-sizing: border-box; box-shadow: 0 6px 20px rgba(0,0,0,.28); pointer-events: none; }'
              + '\n.wb-mobile-sidebar-toggle { position: fixed; left: 10px; top: 10px; z-index: 5000; width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font-size: 15px; line-height: 1; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; box-shadow: 0 1px 4px rgba(0,0,0,.12); }'
              + '\n@media (max-width: 767px) { .wb-topbar-brand, [class*="settingsArea"] { display: none !important; } .wb-topbar-icons { margin-left: 42px; } [class*="sidebarCol"] [class*="brand"] { display: none !important; } [class*="sidebarCol"] { padding-top: 44px !important; } [aria-label="收起侧边栏"] { display: none !important; } }'
              + '\n.wb-balance:hover { border-color: #4ade80 !important; background: rgba(74,222,128,.12) !important; }'
              + '\n.wb-settings-page { padding: 24px 28px; height: 100%; box-sizing: border-box; overflow-y: auto; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); }'
              + '\n.wb-settings-head { max-width: 1280px; margin: 0 auto 20px; }'
              + '\n.wb-settings-grid { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 20px; align-items: start; }'
              + '\n.wb-settings-wide { grid-column: 1 / -1; }'
              + '\n@media (max-width: 1100px) { .wb-settings-grid { grid-template-columns: minmax(0, 1fr); } }'
              + '\n.wb-placement-list { display: flex; flex-direction: column; }'
              + '\n.wb-placement-row { transition: transform .18s ease, box-shadow .18s ease, background .18s ease; }'
              + '\n.wb-drag-grip { width: 14px; text-align: center; color: var(--dsw-alias-label-secondary); font-size: 12px; letter-spacing: -2px; cursor: grab; user-select: none; flex: 0 0 auto; opacity: .7; }'
              + '\n.wb-drag-grip:hover { opacity: 1; }'
              + '\n.wb-placement-row.dragging { position: fixed; z-index: 40; margin: 0; pointer-events: none; cursor: grabbing; transform: scale(1.02); border-radius: 10px; box-shadow: 0 18px 48px rgba(0,0,0,.35); background: var(--dsw-alias-bg-layer-2); transition: none; }'
              + '\n.wb-placement-row.placeholder { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 8%, transparent) !important; border: 1px dashed color-mix(in srgb, var(--dsw-alias-brand-primary) 45%, transparent) !important; box-shadow: none; }'
              + '\n.wb-nav-item { position: relative; }'
              + '\n.wb-nav-label { max-width: 0; opacity: 0; overflow: hidden; white-space: nowrap; font-size: 12px; transition: max-width .18s ease, opacity .18s ease; }'
              + '\n.wb-nav-item:hover .wb-nav-label { max-width: 110px; opacity: 1; }'
              + '\n.wb-nav-item:hover { background: var(--dsw-alias-bg-layer-2) !important; color: var(--dsw-alias-label-primary) !important; }'
              + '\n.wb-view-tab[data-active="0"]:hover { background: var(--dsw-alias-bg-layer-1) !important; color: var(--dsw-alias-label-primary) !important; }'
              + '\n.wb-tab-glider { transition: transform .26s cubic-bezier(.4,0,.2,1), width .26s cubic-bezier(.4,0,.2,1); will-change: transform; }'
              + '\n@media (prefers-reduced-motion: reduce) { .wb-tab-glider { transition: none; } }'
              + '\n.wb-view-tab-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 999px; background: var(--dsw-alias-brand-primary); color: #fff; font-size: 10px; font-weight: 650; font-variant-numeric: tabular-nums; box-sizing: border-box; }'
              + '\n.wb-restart:hover { background: var(--dsw-alias-bg-layer-2) !important; color: var(--dsw-alias-label-primary) !important; border-color: var(--dsw-alias-border-l1) !important; }';
            document.head.append(tag);
            return () => tag.remove();
          }, 'workbench: spinner keyframes');
        }

        const api = createApi(ctx);
        ctx.effect(() => ctx.provide('workbench', api), 'workbench: provide api');

        layoutService = ctx.get('layout') || null;
        layoutGetter = () => ctx.get('layout') || null;

        // The shell's own overview lives above the tab row: it is reachable from
        // the top-bar "工作台" icon, so it registers a page without a tab.
        ctx.effect(() => api.registerView({
          id: 'workbench',
          title: '工作台',
          subtitle: '工作台总览：已接入的视图与浮窗',
          icon: IconWorkbenchTabs,
          component: WorkbenchOverview,
          order: -10,
          tab: false,
        }), 'workbench: overview view');

        // Settings page: no tab — it is reached from the gear in the system bar.
        ctx.effect(() => api.registerView({
          id: SETTINGS_VIEW_ID,
          title: '工作台设置',
          subtitle: '功能开关与已注册的模块',
          icon: IconSettings,
          component: WorkbenchSettings,
          order: -20,
          tab: false,
        }), 'workbench: settings view');

        const balance = createBalanceStore(ctx);
        try {
          ctx.effect(() => { balance.start(); return () => balance.stop(); }, 'workbench: balance polling');
        } catch (err) {
          console.warn('[workbench] balance polling failed', err);
        }
        const TopBar = createTopBar(ctx, balance);
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay', id: 'workbench-topbar', order: -100,
        }, TopBar));

        // ── 每轮费用 + 运行光效（迁移自 dsh-usage-hud） ──
        if (typeof document !== 'undefined') {
          ctx.effect(() => {
            const tag = document.createElement('style');
            tag.dataset.plugin = 'dsh-workbench:usage';
            tag.textContent = USAGE_STYLE;
            document.head.append(tag);
            return () => tag.remove();
          }, 'workbench: usage styles');
        }

        const TurnCost = createTurnCost();
        function TurnCostGated(props) {
          const enabled = useFeatures();
          if (!enabled.cost) return null;
          return h(TurnCost, props);
        }
        ctx.slots.inject('conversation.chat.turnTail', () => ctx.slots.register({
          name: 'conversation.chat.turnTail',
          id: 'workbench-turn-cost',
          order: 600,
        }, TurnCostGated));

        // 注意：ctx.effect 接收的是「返回 dispose 的函数」。
        // 直接传 installGlow(ctx) 的返回值会让 effect 立刻执行清理，光效刚装上就被拆掉。
        // The switch can turn it off at runtime, so mount/unmount follows the store.
        ctx.effect(() => {
          let dispose = null;
          const sync = () => {
            if (dispose) { dispose(); dispose = null; }
            if (features.getSnapshot().glow) dispose = installGlow(ctx);
          };
          sync();
          const unsubscribe = features.subscribe(sync);
          return () => { unsubscribe(); if (dispose) dispose(); };
        }, 'workbench: glow');

        // 推理档位滑条：同样跟功能开关走，关掉时把槽注册一起摘掉。
        ctx.effect(() => {
          let cleanup = null;
          const sync = () => {
            if (cleanup) { cleanup(); cleanup = null; }
            if (features.getSnapshot().effort) cleanup = installEffortSlider(ctx);
          };
          sync();
          const unsubscribe = features.subscribe(sync);
          return () => { unsubscribe(); if (cleanup) cleanup(); };
        }, 'workbench: effort slider');

        } catch (err) {
          console.error('[workbench] apply failed:', err);
        }
      },
    };
  },
});
