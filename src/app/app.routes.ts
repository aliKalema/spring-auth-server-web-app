import { Routes } from '@angular/router';
import {authGuard} from "./shared/gurads/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'personnel',
    pathMatch: 'full'
  },
  {
    path: 'personnel',
    canActivate: [authGuard],
    loadChildren: () => import('./personnel/personnel.routes') .then(m => m.routes)
  },
];
