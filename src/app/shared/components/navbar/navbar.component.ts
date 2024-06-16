import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NavigationService} from "../../services/navigation.service";
import {AuthService} from "../../services/auth.service";
import {Link} from "../../services/notification.service";
import {MaterialModule} from "../../../material/material.module";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,

  imports: [
    NgForOf,
    MaterialModule,
    NgIf,
    NgClass
  ]
})
export class NavbarComponent implements OnInit{
  currentLocation: Link = {title: '',url: '',expanded: false};
  minimized: boolean = false;

  @Output()
  private sideNavToggler : EventEmitter<any> = new EventEmitter<any>();

  protected profile={firstName:""};
  constructor(private navigationService: NavigationService, private authService : AuthService){}

  ngOnInit(): void {
    this.navigationService.getCurrentLocation().subscribe((res)=>{this.currentLocation = res;});
    //this.navigationService.isMinimized().subscribe((res)=>{this.minimized = res});
    // this.authService.loadUserProfile().then((res)=>{this.profile = res;});
  }

  toggleSideNav():void{
    this.sideNavToggler.emit();
  }

  logout() {
    //this.authService.logout();
  }
}
