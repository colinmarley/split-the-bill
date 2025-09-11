import { UserState, useUserStore } from './userStore';

export const useSetUser = () => useUserStore((state: UserState) => state.setUser);
export const useSetLoading = () => useUserStore((state: UserState) => state.setLoading);
export const useSetError = () => useUserStore((state: UserState) => state.setError);
export const useLogout = () => useUserStore((state: UserState) => state.logout);
export const useResetUserState = () => useUserStore((state: UserState) => state.resetUserState);
