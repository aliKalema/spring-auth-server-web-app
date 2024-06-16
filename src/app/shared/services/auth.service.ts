import {inject, Injectable} from '@angular/core';
import {AuthConfig, JwksValidationHandler, OAuthErrorEvent, OAuthService} from "angular-oauth2-oidc";
import {environment as env} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {authConfig} from "../auth-config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private oauthService = inject(OAuthService);

  // public logout(): void{
  //   this.oauthService.revokeTokenAndLogout().then();
  // }
  //
  // public async loadProfile() {
  //   return await this.oauthService.loadUserProfile();
  // }
  //
  // isAuthenticated(): boolean {
  //   return this.oauthService.hasValidAccessToken();
  // }

  // public  initLogin(){
  //   const authCodeFlowConfig: AuthConfig = {
  //     issuer: env.oauth.issuer,
  //     redirectUri: 'http://localhost:4200',
  //     clientId: env.oauth.clientId,
  //     responseType: 'code',
  //     scope: 'openid',
  //     showDebugInformation: true,
  //   };
  //   try {
  //     this.oauthService.configure(authCodeFlowConfig);
  //     this.oauthService.setupAutomaticSilentRefresh();
  //     this.oauthService.loadDiscoveryDocumentAndLogin().then();
  //     // this.oauthService.configure(authCodeFlowConfig);
  //     // this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  //     // this.oauthService.loadDiscoveryDocumentAndTryLogin();
  //   } catch (error) {
  //     console.error("Failed to init OIDC Process", error);
  //     throw error;
  //   }
  // }

  constructor(
    private oauthService: OAuthService,
    private router: Router,
  ) {
    // Useful for debugging:
    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error('OAuthErrorEvent Object:', event);
      } else {
        console.warn('OAuthEvent Object:', event);
      }
    });

    // THe following cross-tab communication of fresh access tokens works usually in practice,
    // but if you need more robust handling the community has come up with ways to extend logic
    // in the library which may give you better mileage.
    //
    // See: https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/issues/2
    //
    // Until then we'll stick to this:
    window.addEventListener('storage', (event) => {
      // The `key` is `null` if the event was caused by `.clear()`
      if (event.key !== 'access_token' && event.key !== null) {
        return;
      }

      console.warn('Noticed changes to access_token (most likely from another tab), updating isAuthenticated');
      this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());

      if (!this.oauthService.hasValidAccessToken()) {
        this.runInitialLoginSequence();
      }
    });

    this.oauthService.events
      .subscribe(_ => {
        this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
      });
    this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());

    this.oauthService.events
      .pipe(filter(e => ['token_received'].includes(e.type)))
      .subscribe(e => this.oauthService.loadUserProfile());

    this.oauthService.events
      .pipe(filter(e => ['session_terminated', 'session_error'].includes(e.type)))
      .subscribe(e => this.runInitialLoginSequence());

    this.oauthService.setupAutomaticSilentRefresh();
  }

  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  public async runInitialLoginSequence(): Promise<void> {
    if (location.hash) {
      console.log('Encountered hash fragment, plotting as table...');
      console.table(location.hash.substr(1).split('&').map(kvp => kvp.split('=')));
    }
    this.oauthService.configure(authConfig);
    return this.oauthService.loadDiscoveryDocument()
      .then(() => new Promise<void>(resolve => setTimeout(() => resolve(), 1500)))
      .then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          return Promise.resolve();
        }
        return this.oauthService.silentRefresh()
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
      .then(() => {
        this.isDoneLoadingSubject$.next(true);
        if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
          let stateUrl = this.oauthService.state;
          if (stateUrl.startsWith('/') === false) {
            stateUrl = decodeURIComponent(stateUrl);
          }
          console.log(`There was state of ${this.oauthService.state}, so we are sending you to: ${stateUrl}`);
          this.router.navigateByUrl(stateUrl);
        }
      })
      .catch(() => this.isDoneLoadingSubject$.next(true));
  }

  public login(targetUrl?: string) {
    console.log("Logging in...")
    // Note: before version 9.1.0 of the library you needed to
    // call encodeURIComponent on the argument to the method.

    this.oauthService.initLoginFlow(targetUrl || this.router.url);
  }

  public logout() { this.oauthService.logOut(); }
  public refresh() { this.oauthService.silentRefresh(); }
  public hasValidToken() { return this.oauthService.hasValidAccessToken(); }

  // These normally won't be exposed from a service like this, but
  // for debugging it makes sense.
  public get accessToken() { return this.oauthService.getAccessToken(); }
  public get refreshToken() { return this.oauthService.getRefreshToken(); }
  public get identityClaims() { return this.oauthService.getIdentityClaims(); }
  public get idToken() { return this.oauthService.getIdToken(); }
  public get logoutUrl() { return this.oauthService.logoutUrl; }

}
