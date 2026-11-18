const upstreamOrigin = 'https://capacitor-app-2kb.pages.dev';
const port = Number(process.env.PORT || 3000);

const server = Bun.serve({
  port,
  async fetch(request) {
    const incomingUrl = new URL(request.url);
    const upstreamUrl = `${upstreamOrigin}${incomingUrl.pathname}${incomingUrl.search}`;
    const headers = new Headers(request.headers);
    headers.delete('host');

    return fetch(upstreamUrl, {
      method: request.method,
      headers,
      body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
      redirect: 'manual',
    });
  },
});

console.log(`Proxying ${upstreamOrigin} at ${server.url}`);
