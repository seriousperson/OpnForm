import {fetchAllWorkspaces} from "~/stores/workspaces.js";
import {opnFetch} from "~/composables/useOpnApi.js";

export default defineNuxtRouteMiddleware(async(to, from) => {
  const authStore = useAuthStore()
  authStore.initStore(useCookie('token').value, useCookie('admin_token').value)

  console.log('auth check before. Token: ', authStore.token, 'user', authStore.user);

  if (authStore.token && !authStore.user) {

    console.log('use is empty in middleware');

    const workspaceStore = useWorkspacesStore()

    // Load user data and workspaces
    const [userDataResponse, workspacesResponse] = await Promise.all([useOpnApi('user', {token: authStore.token}), fetchAllWorkspaces()]);
    authStore.setUser(userDataResponse.data.value)
    workspaceStore.save(workspacesResponse.data.value)
  }
})
