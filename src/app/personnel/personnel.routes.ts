import { Routes } from '@angular/router';
import {PersonnelDashboardComponent} from "./components/personnel-dashboard/personnel-dashboard.component";
import {PersonnelComponent} from "./components/personnel/personnel.component";
import {EmployeesComponent} from "./components/employees/employees.component";
import {EmployeesAddComponent} from "./components/employees-add/employees-add.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PersonnelComponent,
    children: [
      {
        path: 'dashboard',
        component: PersonnelDashboardComponent
      },
      {
        path: 'employee',
        component: EmployeesComponent
      },
      {
        path: 'employee/add',
        component: EmployeesAddComponent
      },
    ]
  }
];
