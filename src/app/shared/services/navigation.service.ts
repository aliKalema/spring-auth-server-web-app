import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";

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
export class NavigationService {
  private currentLocation = new BehaviorSubject<Link>({title: '',url: '', expanded: false});
  private default_minimized : boolean = true;
  private minimized = new BehaviorSubject<boolean>(this.default_minimized);
  constructor() { }

  public isMinimized(): Observable<boolean>{
    return this.minimized.asObservable()
  }

  public setMinimized(val: boolean):void{
    this.minimized.next(val);
  }

  public resetMinimized() {
    this.minimized.next(this.default_minimized);
  }

  public toggleMinimized(){
    const current = this.minimized.value;
    this.minimized.next(!current);
  }

  public setCurrentLocation(val: Link):void{
    this.currentLocation.next(val);
  }

  public getCurrentLocation(): Observable<Link>{
    return this.currentLocation.asObservable();
  }
}
