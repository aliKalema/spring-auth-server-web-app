import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject} from "rxjs";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {MatMenuTrigger} from "@angular/material/menu";
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { fromEvent, Subscription } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {AddLevelComponent} from "../add-level/add-level.component";
import {TreeType} from "../../interfaces/tree-type";
import {OrgLevelService} from "../../services/org-level.service";
import {OrgLevel} from "../../interfaces/org_level";
import {MaterialModule} from "../../../material/material.module";

export interface OrgChart {
  name: string,
  children: OrgChart[]
}

export class GameNode {
  children: BehaviorSubject<GameNode[]>;
  constructor(public item: string, children?: GameNode[], public parent?: GameNode) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}
/**
 * The list of games
 */

const orgChart = [
  new GameNode('Mwanza', [
    new GameNode('Marketing & Sales'),
    new GameNode('Legal'),
    new GameNode('Finance'),
    new GameNode('Human Resource'),
  ]),
  new GameNode('Dodoma', [
    new GameNode('Marketing & Sales',),
    new GameNode('Legal'),
    new GameNode('Finance',[
      new GameNode('Accounting'),
      new GameNode('Claims'),
    ]),
    new GameNode('Human Resource'),
  ]),
  new GameNode('Dar es salaam', [
    new GameNode('Marketing & Sales'),
    new GameNode('Finance'),
  ]),
  new GameNode('Morogoro', [
    new GameNode('Marketing & Sales'),
    new GameNode('Finance'),
  ]),
  new GameNode('Zanzibar', [
    new GameNode('Marketing & Sales',),
    new GameNode('Legal'),
  ])
];
@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements  OnInit, OnDestroy {
 // private departmentService = inject(DepartmentService);
  private overlay = inject(Overlay);
  private viewContainerRef= inject(ViewContainerRef);
  public dialog= inject(MatDialog);
  private orgLevelService = inject(OrgLevelService);

  @ViewChild('userMenu')
  userMenu!: TemplateRef<any>;

  overlayRef!: OverlayRef | null;

  sub: Subscription | undefined;

  orgLevels:Array<OrgLevel> = []
  orgLevelSub: Subscription | undefined;

  ngOnInit() {
    this.getOrgLevels();
  }

  getOrgLevels(): void{
    this.orgLevelSub = this.orgLevelService.getOrgLevels('PARENT')
      .subscribe((list) => {
        this.orgLevels = list;
      });
  }

  open({ x, y }: MouseEvent, refId: string) {
    this.close();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.userMenu, this.viewContainerRef, {
      $implicit: refId
    }));

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.close())
  }

  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  openAddLevel(): void{
    const dialogRef = this.dialog.open(AddLevelComponent, {
      data: TreeType.DEPARTMENT,
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  delete(refId: String) {
    this.close();
    alert(refId);
  }

  ngOnDestroy() {
    if(this.orgLevelSub){
      this.orgLevelSub.unsubscribe();
    }
  }
}
