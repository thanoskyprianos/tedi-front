import { Component } from '@angular/core';
import { PostService, posted } from '../../../services/post.service';
import { UserSessionService } from '../../../services/user-session.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent {
  newlyposted: posted = {
    post_id: 0,
    description: '',
    author: '',
    media: '',
    likes: 0,
    comments: 0
  };

  constructor(
    private postService: PostService,
    protected session: UserSessionService)
    { }

  onSubmitPost() {
    this.newlyposted.author = this.session.user.firstName;
    let postUrl = this.session.user.links.find(
        (element) => element.rel === 'posts');

    if (postUrl) {
      this.postService.addPost(postUrl.href, this.newlyposted);
    }
  }
}
