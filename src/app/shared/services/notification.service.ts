import { Injectable } from '@angular/core';

export declare type Link = {
  title: string;
  url: string;
  icon?: string;
  path?:string[];
  children?: Array<Link>;
  expanded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
}
