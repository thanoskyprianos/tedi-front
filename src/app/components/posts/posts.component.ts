import { Component } from '@angular/core';
import { PostService, posted } from '../../services/post.service';
import { UserSessionService } from '../../services/user-session.service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

export class PostsComponent {
  posts: posted[] = [];

  constructor(
    private postService: PostService,
    protected session: UserSessionService)
    { }

}
