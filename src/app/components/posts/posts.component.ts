import {Component, Input} from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserSessionService } from '../../services/user-session.service';
import { FormsModule } from "@angular/forms";
import {PostComponent} from "./post/post.component";
import {PostModule} from "../../modules/post.module";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, PostComponent, NgForOf],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

export class PostsComponent {
  @Input() type: 'of' | 'for' | undefined;
  @Input() id: number | undefined;
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
          this.getPostsFor(this.session.user.id);
        }
      })
    }
    else if (this.type === 'of' && this.id) {
      this.getPostsOf(this.id)
    }
    else {
      this.router.navigate(['/error']);
    }
  }

  action = {
    next: (res: any) => { this.posts = res.body._embedded.postList as PostModule[] },
    error: (err: any) => { this.router.navigate(['/error']) }
  };

  getPostsFor(id: number) {
    this.postService.getPostsFor(id).subscribe(this.action)
  }

  getPostsOf(id: number) {
    this.postService.getPostsOf(id).subscribe(this.action)
  }
}
