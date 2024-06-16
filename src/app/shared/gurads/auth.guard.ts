import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {OAuthService} from "angular-oauth2-oidc";
import {filter, switchMap, tap} from "rxjs/operators";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isDoneLoading$.pipe(
    filter(isDone => isDone),
    switchMap(_ => authService.isAuthenticated$),
    tap(isAuthenticated => isAuthenticated || authService.login(state.url)),
  );
};
