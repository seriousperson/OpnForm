import { useUrlHelper } from "~/helper/useUrlHelper";
import {getDomain, getHost, customDomainUsed} from "~/lib/utils.js";

function addAuthHeader(request, options) {
  const authStore = useAuthStore()
  if (authStore.token) {
    options.headers = {Authorization: `Bearer ${authStore.token}`, ...options.headers}
  }
}

function addPasswordToFormRequest(request, options) {
  if (!request || !request.startsWith('/forms/')) return

  const slug = request.split('/')[2]

  const passwordCookie = useCookie('password-' + slug, {maxAge: 60 * 60 * 24 * 30}) // 30 days
  if (slug !== undefined && slug !== '' && passwordCookie.value !== undefined) {
    options.headers['form-password'] = passwordCookie.value
  }
}

/**
 * Add custom domain header if custom domain is used
 */
function addCustomDomainHeader(request, options) {
  if (!customDomainUsed()) return
  options.headers['x-custom-domain'] = getDomain(getHost())
}

export function getOpnRequestsOptions(request, opts) {
  const config = useRuntimeConfig()

  if (opts.body && opts.body instanceof FormData) {
    opts.headers = {
      'charset': 'utf-8',
      ...opts.headers,
    }
  }

  opts.headers = {accept: 'application/json', ...opts.headers}

  // Authenticate requests coming from the server
  if (import.meta.server && config.apiSecret) {
    opts.headers['x-api-secret'] = config.apiSecret
  }

  addAuthHeader(request, opts)
  addPasswordToFormRequest(request, opts)
  addCustomDomainHeader(request, opts)
    
  opts.headers['Access-Control-Allow-Origin'] = '*'

  // console.log('The headers', opts)

  if (!opts.baseURL) opts.baseURL = config.public.apiBase

  return {
    async onResponseError({response}) {
      const authStore = useAuthStore()

      const {status} = response
      if (status === 401) {
        if (authStore.check) {
          console.log("Logging out due to 401")
          authStore.logout()
          useRouter().push({name: 'login'})
        }
      } else if (status === 420) {
        // If invalid domain, redirect to main domain
        window.location.href = config.public.appUrl + '?utm_source=failed_custom_domain_redirect'
      } else if (status >= 500) {
        console.error('Request error', status)
      }
    },
    ...opts
  }
}

export const opnFetch = (request, opts = {}) => {

  request = useUrlHelper(request, 'fetch');

  console.log('opnFetch request', request);

  let response = $fetch(request, getOpnRequestsOptions(request, opts))

  // console.log('opnFetch response', response);

  return response;

}

export const useOpnApi = (request, opts = {}) => {

  console.log('useOpnApi request before: ', request);

  if(request == 'open/workspaces' || request.includes('forms/')){
    request = useUrlHelper(request, 'fetch');  
  } else {
    request = useUrlHelper(request, 'api');  
  }

  console.log('useOpnApi request after:', request);

  let response = useFetch(request, getOpnRequestsOptions(request, opts))

  // console.log('useOpnApi response', response);

  return response;

}
