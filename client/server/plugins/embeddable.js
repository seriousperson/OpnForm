export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    const routePath = event.node?.req?.url || event.node?.req?.originalUrl
    // const routePath= event.context.params._
    if (routePath) {
    // if (routePath && !routePath.startsWith('/forms/')) {
      // Only allow embedding of forms
      response.headers['X-Frame-Options'] = 'sameorigin';
      const allowedDomains = ['manchesterchemist.com', 'clinic.manchesterchemist.com', 'dev.test:8003'];

      // Allow embedding in frames or iframes from any origin
      // response.headers['Content-Security-Policy'] = 'frame-ancestors *';
      response.headers['Content-Security-Policy'] = `frame-ancestors ${allowedDomains.join(' ')}`;
    }

    delete response.headers['x-powered-by'];
  });
});
