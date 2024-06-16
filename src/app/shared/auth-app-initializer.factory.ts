import {AuthService} from "./services/auth.service";
import {from, Observable} from "rxjs";


export function authAppInitializerFactory(authService: AuthService): () => Promise<any> {
  return () => authService.runInitialLoginSequence();
}
