import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {NavigationExtras, Router} from "@angular/router";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [
    FormsModule,
    MatIconModule
  ],
  standalone: true
})
export class SearchComponent {
  searchTerm: string | undefined;
  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>();
  constructor(private router: Router) {
  }

  handleSearch(): void {
    if(this.searchTerm && this.searchTerm.length>0) {
      this.router.navigate([], {queryParams: {search_term: this.searchTerm}, queryParamsHandling: 'merge'}).then();
      this.onSearch.emit(this.searchTerm);
    }
    else{
      const navigationExtras: NavigationExtras = {
        queryParams: {}
      };
      this.router.navigate([], navigationExtras).then();
      this.onSearch.emit("");
    }
  }
}
