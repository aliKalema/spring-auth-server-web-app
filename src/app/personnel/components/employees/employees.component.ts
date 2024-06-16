import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from "../../../shared/components/search/search.component";
import {DepartmentComponent} from "../department/department.component";
import {AngularSplitModule} from "angular-split";
import {Router} from "@angular/router";
import {Link, NavigationService} from "../../../shared/services/navigation.service";
import {EmployeeTableComponent} from "../employee-table/employee-table.component";
import {MaterialModule} from "../../../material/material.module";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, SearchComponent, MaterialModule, DepartmentComponent, AngularSplitModule, EmployeeTableComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit{
  currentLocation: Link = {
    path: ["Employee"],
    title: "Employees",
    url: "",
    expanded: false
  }
  private router: Router = inject(Router);
  private navigationService: NavigationService = inject(NavigationService);

  ngOnInit() {
    this.navigationService.setCurrentLocation(this.currentLocation);
  }

  onSearch(searchTerm: string): void{
    console.log(searchTerm);
  }

  addCustomer() {
    this.router.navigate(['personnel/employee/add']).then();
  }

  openAddCategoryDialog() {

  }

}
