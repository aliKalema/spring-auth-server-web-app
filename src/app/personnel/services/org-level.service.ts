import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Hierarchy} from "../../shared/interfaces/hierarchy";
import {OrgLevel} from "../interfaces/org_level";
import {NotificationService} from "../../shared/services/notification.service";

@Injectable({
  providedIn: 'root'
})
export class OrgLevelService {
  private httpClient = inject(HttpClient);
  private notificaticationService = inject(NotificationService);
  constructor() { }

  getOrgLevels(hierarchy?: Hierarchy):Observable<Array<OrgLevel>>{
    let params = new HttpParams()
    if(hierarchy){
      params =  params.append("hierarchy", hierarchy);
    }
    return this.httpClient.get<Array<OrgLevel>>(`${env.uri.base}/api/v1/orglevels`);
  }
}
