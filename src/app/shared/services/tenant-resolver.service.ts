import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {TenantDetail} from "../interfaces/tenant-detail";

@Injectable({
  providedIn: 'root'
})
export class TenantResolverService {
  constructor(private router: Router) {}

  resolve(): boolean {
    const tenantDetail = this.getTenant()
    if (tenantDetail) {
      return true;
    } else {
      this.router.navigate(['/login']).then();
      return false;
    }
  }
  getTenant(): TenantDetail | undefined{
    return JSON.parse(localStorage.getItem("tenant_detail")!);
  }
}
