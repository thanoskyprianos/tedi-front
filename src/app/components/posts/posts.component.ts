import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserSessionService } from '../../services/user-session.service';
import { FormsModule } from "@angular/forms";
import {PostComponent} from "./post/post.component";
import {PostModule} from "../../modules/post.module";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, PostComponent, NgForOf],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

export class PostsComponent {
  posts: PostModule[] = [];

  constructor(
    private postService: PostService,
    protected session: UserSessionService
  ) {
    this.session.userObs.subscribe(x => {
      if (x === 'ok') {
        this.getPosts();
      }
    })
  }

  getPosts() {
    this.postService.getPosts(this.session.user.id).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.posts =
            res.body._embedded.postList as PostModule[];
        }
      }
    })
  }
}
