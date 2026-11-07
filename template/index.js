/**
 * Host half of a workbench module.
 *
 * Owns data collection and HTTP routes. Route convention:
 *   /wb/<module-id>/<verb>
 * The Client half fetches those routes directly; the workbench shell does not
 * proxy module data.
 *
 * Nothing here imports the workbench shell: modules depend on the Client-side
 * `workbench` service only, and only through `ctx.get('workbench')`.
 */
export const inject = ['webServer'];

export function apply(ctx) {
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: '/wb/my-module/ping',
    async handler(_req, res) {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end(JSON.stringify({ ok: true, at: new Date().toISOString() }));
    },
  }), 'my-module: http route');
}
