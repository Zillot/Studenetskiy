import { environment } from 'src/environments/environment';

export const apiBase = environment.baseUrl;

export const User = {
  getMe: `${apiBase}/api/user/me`
};
