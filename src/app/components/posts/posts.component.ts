import {Component, EventEmitter, Input, Output} from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserSessionService } from '../../services/user-session.service';
import { FormsModule } from "@angular/forms";
import {PostComponent} from "./post/post.component";
import {PostModule} from "../../modules/post.module";
import {NgClass, NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, PostComponent, NgForOf, NgClass],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

export class PostsComponent {
  @Input() type: 'of' | 'for' | undefined;
  @Input() id: number | undefined;
  @Input() postType!: string;
  @Input() onlyJobOffers: boolean = false;
  @Output() jobOfferStatus = new EventEmitter<PostModule[]>();
  posts: PostModule[] = [];

  constructor(
    private postService: PostService,
    protected session: UserSessionService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.type === 'for') {
      this.session.userObs.subscribe(x => {
        if (x === 'ok') {
          if (this.onlyJobOffers) {
            this.getJobOffers(this.session.user.id);
          } else {
            this.getPostsFor(this.session.user.id);
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

  action = {
    next: (res: any) => {
      try {
        this.posts = res.body._embedded.postList as PostModule[];
      } catch (e) { }
    },
    error: (err: any) => { this.router.navigate(['/error']) }
  };

  getPostsFor(id: number) {
    this.postService.getPostsFor(id).subscribe(this.action)
  }

  getPostsOf(id: number) {
    this.postService.getPostsOf(id).subscribe(this.action)
  }

  getJobOffers(id: number) {
    this.postService.getJobOffers(id).subscribe(this.action);
  }

}
