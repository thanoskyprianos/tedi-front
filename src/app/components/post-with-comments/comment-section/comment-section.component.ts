import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PostModule} from "../../../modules/post.module";
import {PostService} from "../../../services/post.service";
import {CommentModule} from "../../../modules/comment.module";
import {CommentComponent} from "./comment/comment.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [
    CommentComponent,
    NgForOf
  ],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent implements OnChanges {
  @Input() post: PostModule | undefined;
  comments: CommentModule[] = [];

  constructor(
    private postService: PostService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'].firstChange && this.post) {
      const url = this.post._links.comments;
      if (!url) return;

      this.postService.getComments(url.href).subscribe({
        next: (res: any) => {
          console.log(res);

          this.comments = res.body._embedded.commentList;
        },
        error: (err: any) => {
          console.log(err)
        }
      })

    }
  }
}
