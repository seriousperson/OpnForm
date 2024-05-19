export const useUrlHelper = (path, requestType) => {

  const runTimeConfig = useRuntimeConfig();

  // console.log('runTimeConfig => ', runTimeConfig);
  console.log('App Env Vars: ', runTimeConfig);
  // console.log('Endpoint: ', path);

  let protocol = 'http://';
  if(runTimeConfig.public.env == 'production'){
    protocol = 'https://';
  }
  
  // console.log('Protocol: ', protocol);

  let baseUrl = '';

  if(requestType == 'api'){
    baseUrl = runTimeConfig.public.apiBase;
  } else if(requestType == 'fetch'){
    baseUrl = runTimeConfig.public.appUrl;
  }

  if (baseUrl.endsWith('/')){
    baseUrl = baseUrl.slice(0, -1);
  }

  // console.log('Base URL: ', baseUrl);

  if(!path.startsWith('/') && !path.startsWith('http')){
    path = '/' + path;
  }

  // console.log('Path: ', path);

  if(!path.startsWith(baseUrl)){
    path = baseUrl + path;
  }

  // console.log('Path with Base URL: ', path);

  let fullUrl = path;
  if(!path.startsWith('http')){
    fullUrl = protocol + path;
  }

  console.log(`Mehtod: ${requestType} - fullUrl: ${fullUrl}`);
  console.log('Token From Cookies', useCookie('token').value, 'User From Cookies', useCookie('user').value)

  return fullUrl;

}