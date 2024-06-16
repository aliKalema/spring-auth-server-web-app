import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Link, NavigationService} from "../../services/navigation.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MaterialModule} from "../../../material/material.module";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  imports: [
    MaterialModule,
    NgIf,
    NgClass,
    NgForOf,
    RouterLink,
    RouterLinkActive,
  ],
  standalone: true
})
export class SidenavComponent implements OnInit, AfterViewInit{

  @Input()
  links!: Array<Link>;

  isMinimized!: boolean;

  profile:  undefined;

  @ViewChild('scrollableElement')
  scrollableElement: any;

  constructor(private navigationService: NavigationService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.navigationService.isMinimized().subscribe((data)=>{
      this.isMinimized = data;
    })

    // this.authService.loadUserProfile().then((res)=>{
    //   this.profile = res;
    // })
    const currentRoute = this.router.url.substring(1);
    for(let link of this.links){
      if(this.isUrlInChildren(currentRoute, link)){
        link.expanded = true;
        break;
      }
    }
  }

  ngAfterViewInit() {

  }

  toggleExpanded(link: Link): void {
    link.expanded = !(link.expanded);
  }

  isUrlInChildren(url: string, link: Link): boolean {
    if (link.url === url) {
      return true;
    }

    if (link.children) {
      for (const child of link.children) {
        if (this.isUrlInChildren(url, child)) {
          return true;
        }
      }
    }

    return false;
  }
}
