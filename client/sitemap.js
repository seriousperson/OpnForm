export default {
  exclude: ['/settings/**', '/subscriptions/**', '/templates/my-templates'],
  sources: [
    process.env.NUXT_PUBLIC_ENV == 'production'? process.env.NUXT_PUBLIC_API_BASE + '/sitemap-urls' : process.env.NUXT_PUBLIC_API_BASE_DEV + '/sitemap-urls'
  ],
  cacheMaxAgeSeconds: 3600
}
