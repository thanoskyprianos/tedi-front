import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { PostsComponent } from "../posts/posts.component";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [RouterLink, PostsComponent, NgClass, NgIf],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.css'
})

export class AdsComponent {
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

        if (!this.page) {
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

    this.page = goto;

    this.router.navigate(['/ads-page'], { queryParams: { page: goto } });
  }

  nextPage() {
    const goto = this.page + 1;
    this.page = goto;

    this.router.navigate(['/ads-page'], { queryParams: { page: goto } });
  }
}
