import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor() { }

  private isLoading$ = new BehaviorSubject<boolean>(false);

  get isLoading() {
    return this.isLoading$.asObservable();
  }

  show() {
    this.isLoading$.next(true);
  }

  hide() {
    this.isLoading$.next(false);
  }
}
