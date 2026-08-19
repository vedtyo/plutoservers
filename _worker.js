export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/master-api" || url.pathname.startsWith("/master-api/")) {
      const suffix = url.pathname.slice("/master-api".length);
      const upstream = new URL("https://master.iw4.zip/instance/" + suffix);
      upstream.search = url.search;

      const headers = new Headers(request.headers);
      headers.set("Host", "master.iw4.zip");

      const response = await fetch(new Request(upstream.toString(), {
        method: request.method,
        headers,
        body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body
      }));

      const out = new Headers(response.headers);
      out.set("Cache-Control", "no-store, no-cache, must-revalidate");
      out.set("Pragma", "no-cache");
      out.set("Access-Control-Allow-Origin", url.origin);
      out.set("Vary", "Origin");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: out
      });
    }

    return env.ASSETS.fetch(request);
  }
};