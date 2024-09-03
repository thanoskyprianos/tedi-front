import {Component, EventEmitter, Input, Output} from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserSessionService } from '../../services/user-session.service';
import { FormsModule } from "@angular/forms";
import {PostComponent} from "./post/post.component";
import {PostModule} from "../../modules/post.module";
import {NgClass, NgForOf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, PostComponent, NgForOf, NgClass, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

export class PostsComponent {
  @Input() type: 'of' | 'for' | undefined;
  @Input() id: number | undefined;
  @Input() postType!: string;
  @Input() onlyJobOffers: boolean = false;

  @Input() page: number = 1;

  @Output() jobOfferStatus = new EventEmitter<PostModule[]>();
  posts: PostModule[] = [];


  constructor(
    private postService: PostService,
    protected session: UserSessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        window.scroll(0, 0);

        this.page = parseInt(params['page'])

        if (this.type === 'for') {
          this.session.userObs.subscribe(x => {
            if (x === 'ok') {
              if (this.onlyJobOffers) {
                this.getJobOffers(this.session.user.id, this.page);
              } else {
                this.getPostsFor(this.session.user.id, this.page);
              }
            }
          })
        }
        else if (this.type === 'of' && this.id) {
          this.getPostsOf(this.id);
        }
        else {
          this.router.navigate(['/error']);
        }
      }
    )
  }

  action = {
    next: (res: any) => {
      try {
        this.posts = res.body._embedded.postList as PostModule[];
      } catch (e) { }
    },
    error: (err: any) => {
      // this.router.navigate(['/error'])
      this.activatedRoute.url.subscribe({
        next: (res: any) => {
          this.router.navigate([`/${res[0].path}`], {queryParams: {page: 1}});
        }
      })
    }
  };

  getPostsFor(id: number, page: number) {
    this.postService.getPostsFor(id, page).subscribe(this.action)
  }

  getPostsOf(id: number) {
    this.postService.getPostsOf(id).subscribe(this.action)
  }

  getJobOffers(id: number, page: number) {
    this.postService.getJobOffers(id, page).subscribe(this.action);
  }

}
