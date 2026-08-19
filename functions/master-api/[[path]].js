export async function onRequest(context) {
  const requestUrl = new URL(context.request.url);

  const suffix = requestUrl.pathname.replace(/^\/master-api\/?/, "");
  const upstreamUrl = new URL("https://master.iw4.zip/instance/" + suffix);
  upstreamUrl.search = requestUrl.search;

  const headers = new Headers(context.request.headers);
  headers.set("Host", "master.iw4.zip");

  const response = await fetch(
    new Request(upstreamUrl.toString(), {
      method: context.request.method,
      headers,
      body: context.request.method === "GET" || context.request.method === "HEAD"
        ? undefined
        : context.request.body
    })
  );

  const outHeaders = new Headers(response.headers);
  outHeaders.set("Cache-Control", "no-store, no-cache, must-revalidate");
  outHeaders.set("Pragma", "no-cache");
  outHeaders.set("Access-Control-Allow-Origin", requestUrl.origin);
  outHeaders.set("Vary", "Origin");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: outHeaders
  });
}