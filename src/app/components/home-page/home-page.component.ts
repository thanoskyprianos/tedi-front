import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PostsComponent} from "../posts/posts.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    PostsComponent,
    NgIf
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent {
  page!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        this.page = parseInt(params['page']);

        if (params['page'] || this.page <= 0) {
          this.page = 1;
        }
      }
    })
  }

  prevPage() {
    let goto = this.page - 1;
    if (goto <= 0) {
      goto = 1;
    }

    this.router.navigate(['/home-page'], { queryParams: { page: goto } });
  }

  nextPage() {
    const goto = this.page + 1;

    this.router.navigate(['/home-page'], { queryParams: { page: goto } });
  }
}
