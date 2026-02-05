import { SetMetadata } from '@nestjs/common';

export const SET_AUTH_COOKIE_KEY = 'setAuthCookie';
export const SetAuthCookie = () => SetMetadata(SET_AUTH_COOKIE_KEY, true);
