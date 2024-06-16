import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecuredComponent} from "./components/secured/secured.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SecuredComponent,
    // children: [
    //   {
    //     path: 'dashboard',
    //     component: PersonnelDashboardComponent
    //   },
    // ]
  }
];


