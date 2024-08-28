import {Component, OnInit} from '@angular/core';
import {PostComponent} from "../posts/post/post.component";
import {PostModule} from "../../modules/post.module";
import {NgIf} from "@angular/common";
import {CommentSectionComponent} from "./comment-section/comment-section.component";
import {PostService} from "../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommentModule} from "../../modules/comment.module";

@Component({
  selector: 'app-post-with-comments',
  standalone: true,
  imports: [
    PostComponent,
    NgIf,
    CommentSectionComponent,
    FormsModule
  ],
  templateUrl: './post-with-comments.component.html',
  styleUrl: './post-with-comments.component.css'
})
export class PostWithCommentsComponent implements OnInit {
  post!: PostModule;
  comment: string = '';

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const userId = params['userId'];
        const postId = params['postId'];

        this.postService.getPost(userId, postId).subscribe({
          next: (res: any) => {
            this.post = res.body as PostModule;
          },
          error: (err) => {
            this.router.navigate(['/error'])
          }
        })
      },
      error: (err: any) => {
        this.router.navigate(['/error'])
      }
    })
  }

  addComment(event: any) {
    const url = this.post!._links.comment;
    if (!url) return;

    if (!this.comment) return;

    const comment = {
      text: this.comment
    }

    this.postService.addComment(url.href, comment).subscribe({
      next: (res: any) => {
        location.reload();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
