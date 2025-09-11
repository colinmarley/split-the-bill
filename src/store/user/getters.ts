import { UserState } from './userStore';

export const getUser = (state: UserState) => state.user;
export const getUserLoading = (state: UserState) => state.loading;
export const getUserError = (state: UserState) => state.error;
