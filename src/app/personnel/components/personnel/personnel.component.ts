import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDrawerMode, MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {NavbarComponent} from "../../../shared/components/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {SidenavComponent} from "../../../shared/components/sidenav/sidenav.component";
import {Link, NavigationService} from "../../../shared/services/navigation.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-personnel',
  standalone: true,
    imports: [CommonModule, MatSidenavModule, NavbarComponent, RouterOutlet, SidenavComponent],
  templateUrl: './personnel.component.html',
  styleUrl: './personnel.component.css'
})
export class PersonnelComponent implements OnInit, AfterViewInit{
  isMobile: boolean= false;
  isMinimized: boolean= false;

  links: Array<Link>=[
    {
      title: "Dashboard",
      url: 'dashboard',
      icon: 'dashboard',
      expanded: false
    },
    {
      title: "Employees",
      url: 'employee',
      icon: 'contacts',
      expanded: false
    },
    // {
    //   title: "Operation",
    //   url: '',
    //   icon: 'move_down',
    //   expanded: false,
    //   children: [
    //     {
    //       title: "Employees",
    //       url: 'dqrrt',
    //       icon: 'diversity_3',
    //       expanded: false,
    //     },
    //     {
    //       title: "Expenditure",
    //       url: 'wggrg',
    //       icon: 'request_page',
    //       expanded: false,
    //     },
    //   ]
    // },
    {
      title: "Settings",
      url: 'settings',
      icon: 'settings',
      expanded: false,
    },
  ];

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  @Output()
  maximize = new EventEmitter();
  constructor(private navigationService: NavigationService,
              private breakPointObserver: BreakpointObserver,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.navigationService.isMinimized().subscribe((data)=>{
      this.isMinimized = data;
    })
  }

  ngAfterViewInit(): void {
    this.breakPointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((breakpointState) => {
        if (breakpointState.matches) {
          this.isMobile=true;
          const over:MatDrawerMode ='over';
          if(this.sidenav) {
            this.sidenav.mode = "over";
            this.sidenav.close().then();
            this.navigationService.setMinimized(false);
          }
        }
        else{
          this.isMobile =  false;
          const side:MatDrawerMode ='side';
          if(this.sidenav) {
            this.sidenav.mode = "side";
            this.sidenav.open().then();
            this.navigationService.resetMinimized();
          }
        }
      });
    this.changeDetectorRef.detectChanges();
  }

  toggleSideNav(): void{
    if(this.isMobile){
      this.sidenav.toggle().then();
    }
    else{
      this.navigationService.toggleMinimized();
    }
  }

}
