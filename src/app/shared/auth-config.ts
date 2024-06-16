import { AuthConfig } from 'angular-oauth2-oidc';
import {environment as env} from "../../environments/environment";

export const authConfig: AuthConfig = {
  issuer: env.oauth.issuer,
  clientId: 'ui-spa',
  responseType: 'code',
  redirectUri: env.oauth.originator,
  // silentRefreshRedirectUri: env.oauth.originator + '/silent-refresh.html',
  scope: 'openid',
  useSilentRefresh: true,
  silentRefreshTimeout: 5000,
  timeoutFactor: 0.25,
  sessionChecksEnabled: true,
  showDebugInformation: true,
  clearHashAfterLogin: false,
  nonceStateSeparator : 'semicolon'
};
