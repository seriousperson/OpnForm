export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    const routePath = event.node?.req?.url || event.node?.req?.originalUrl
    // const routePath= event.context.params._
    // if (routePath) {
    // if (routePath && !routePath.startsWith('/forms/')) {
      // Only allow embedding of forms
      response.headers['X-Frame-Options'] = 'sameorigin';
      // response.headers['X-Frame-Options'] = 'sameorigin';
      const allowedDomains = [
        'manchesterchemist.com', 
        // 'clinic.manchesterchemist.com', 
        // 'dev.test:8003', 'dev.test:8005', // old
        'dev.test:8003', 'dev.test:8006',
        'formserver.manchesterchemist.com',
        'manchesterchemist.shop',
      ];

      // Allow embedding in frames or iframes from any origin
      response.headers['Content-Security-Policy'] = 'frame-ancestors *';
      // response.headers['Content-Security-Policy'] = '*';
      response.headers['Content-Security-Policy'] = `frame-ancestors ${allowedDomains.join(' ')}`;
      response.headers['Access-Control-Allow-Origin'] = '*';
    // }

    delete response.headers['x-powered-by']; 

  });
});
