export default {
    async fetch(request: Request, env: any, ctx: ExecutionContext) {
      // Serve static files from /public via Assets binding
      // (wrangler.jsonc → assets.binding = "ASSETS")
      // @ts-ignore
      return env.ASSETS.fetch(request);
    }
  } satisfies ExportedHandler;
  