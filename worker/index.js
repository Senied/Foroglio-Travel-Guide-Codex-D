export default {
  async fetch(request, environment) {
    const response = await environment.ASSETS.fetch(request);

    if (response.status !== 404 || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const directoryIndexUrl = new URL(request.url);
    directoryIndexUrl.pathname = `${directoryIndexUrl.pathname.replace(/\/$/, "")}/index.html`;

    return environment.ASSETS.fetch(
      new Request(directoryIndexUrl.toString(), request),
    );
  },
};
