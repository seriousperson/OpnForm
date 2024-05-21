import {fetchAllWorkspaces} from "~/stores/workspaces.js";
import {opnFetch} from "~/composables/useOpnApi.js";

export default defineNuxtRouteMiddleware(async(to, from) => {
  const authStore = useAuthStore()
  authStore.initStore(useCookie('token').value, useCookie('admin_token').value)

  console.log('middleware auth check before: ', authStore.token);
  console.log('middleware aut user before', authStore.user);
  console.log('middleware aut user before', authStore.user);
  // console.log('middleware workspace before', authStore.user);

  if (authStore.token && !authStore.user) {

    console.log('use is empty in middleware');

    const workspaceStore = useWorkspacesStore()

    // Load user data and workspaces
    const [userDataResponse, workspacesResponse] = await Promise.all([useOpnApi('user', {token: authStore.token}), fetchAllWorkspaces()]);
    authStore.setUser(userDataResponse.data.value)

    console.log('middleware workspace response', workspacesResponse)
    console.log('middleware workspace response value from user cookies', useCookie('user').value.workspace_id)

    workspaceStore.save(useCookie('user').value.workspace_id)

  }



})
