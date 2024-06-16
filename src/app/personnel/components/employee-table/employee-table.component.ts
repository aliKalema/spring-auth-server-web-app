import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import {EmployeeService} from "../../../shared/services/employee.service";

interface EventObject {
  event: string;
  value: {
    limit: number;
    page: number;
  };
}
@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent implements OnInit, OnDestroy{

  private readonly employeeService =  inject(EmployeeService);


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
