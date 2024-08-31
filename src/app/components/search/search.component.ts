import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { UserCardComponent } from '../user-card/user-card.component';
import { SearchService } from '../../services/search.service';
import {NgForOf, NgIf} from "@angular/common";
import {NavigationExtras, Router} from "@angular/router";
import {UserModule} from "../../modules/user.module";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf, UserCardComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  searchQuery: string = '';
  resultsFromSearch: any[] = [];
  user!: UserModule;

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {}

  searchResults(searchInput: string) {
    const searchUrl = 'https://localhost:8080/users/search';

    this.searchService.search(searchUrl, searchInput)
    .subscribe(results => {
      this.resultsFromSearch = results;
    });

  }

  goToUser(event: any, userId: number) {
    const selectedUser: NavigationExtras = {
      state: {
        data: this.user
      }
    };

    this.router.navigate(['/profile-page', userId], selectedUser);
  }

}
