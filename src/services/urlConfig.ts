import { environment } from 'src/environments/environment';

export const apiBase = environment.baseUrl;

export const Review = {
  get: `${apiBase}/api/review`,
  create: `${apiBase}/api/review`
};
