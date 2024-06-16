import {inject, Injectable} from '@angular/core';
import {RequestParam} from "../../shared/interfaces/request_param";
import {Observable} from "rxjs";
import {Page} from "../../shared/interfaces/page";
import {Employee} from "../interfaces/employee";
import {environment as env} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {NotificationService} from "../../shared/services/notification.service";

export interface EmployeeRequestParam extends RequestParam{

}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private httpClient = inject(HttpClient);
  private notificationService = inject(NotificationService);
  constructor() { }

  getEmployees(requestParam?: EmployeeRequestParam):Observable<Page<Employee>>{
    let params = new HttpParams();
    if(requestParam && requestParam.page){
      params =  params.append("page", requestParam.page);
    }

    if(requestParam && requestParam.size){
      params =  params.append("size", requestParam.size);
    }

    if(requestParam && requestParam.searchTerm){
      params =  params.append("search_term", requestParam.searchTerm);
    }

    return this.httpClient.get<Page<Employee>>(`${env.uri.base}/personnel/api/v1/employees`,{params});
  }
}
