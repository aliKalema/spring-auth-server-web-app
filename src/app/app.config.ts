import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideRouter, Router, withHashLocation} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {AuthConfig, OAuthService, provideOAuthClient} from "angular-oauth2-oidc";
import {authAppInitializerFactory} from "./shared/auth-app-initializer.factory";
import {AuthService} from "./shared/services/auth.service";
import {authConfig} from "./shared/auth-config";

function runInitialLoginSequence(oauthService: OAuthService): Promise<void> {
// 0. LOAD CONFIG:
// First we have to check to see how the IdServer is
// currently configured:
  oauthService.configure(authConfig);
return oauthService.loadDiscoveryDocument()
  .then(() => new Promise<void>(resolve => setTimeout(() => resolve(), 1500)))
  .then(() => oauthService.tryLogin())
  .then(() => {
    if (oauthService.hasValidAccessToken()) {
      return Promise.resolve();
    }
    return oauthService.silentRefresh()
      .then(() => Promise.resolve())
      .catch(result => {
        const errorResponsesRequiringUserInteraction = [
          'interaction_required',
          'login_required',
          'account_selection_required',
          'consent_required',
        ];

        if (result
          && result.reason
          && errorResponsesRequiringUserInteraction.indexOf(result.reason.error) >= 0) {
          console.warn('User interaction is needed to log in, we will wait for the user to manually log in.');
          return Promise.resolve();
        }
        return Promise.reject(result);
      });
  })
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => {
        return () => {
          return authService.runInitialLoginSequence()
        }
      },
      multi: true,
      deps: [ AuthService ]
    },
    provideAnimationsAsync()
  ]
};
