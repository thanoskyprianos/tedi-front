import {Component, Input} from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserSessionService } from '../../services/user-session.service';
import { FormsModule } from '@angular/forms';
import {PostModule} from "../../modules/post.module";
import {NgClass, NgIf} from "@angular/common";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent {
  @Input() text: string = '';
  skillsRequired: string = '';
  postType: string = 'post';
  selectedFiles: File[] = [];

  showSuccessMessage: boolean = false;

  constructor(
    private postService: PostService,
    protected session: UserSessionService)
    { }

  onSubmitPost(event: any) {
    let isPost = false;
    let isJobOffer = false;

    if (this.postType === 'post') {
      isPost = true;
    } else {
      isJobOffer = true;
    }

    let post = {
      "text": this.text,
      "type": this.postType,
      isPost: isPost,
      isJobOffer: isJobOffer
    }

    this.postService.addPost(this.session.user.id, post).subscribe({
        next: async (res: any) => {

          const post = new PostModule(
            0, res.body.text, res.body._links,
          isPost, isJobOffer);

          const addMediaUrl = post._links.add_media;
          if (addMediaUrl) {
            await this.addMedia(addMediaUrl);
            this.clearForm(event);
            this.showSuccess();
          }
        },
        error: (err: any) => {
          this.clearForm(event);
          console.log(err)
        }
      }
    )
  }

  async addMedia(addMediaUrl: any) {
    for (let file of this.selectedFiles) {
      await lastValueFrom(this.postService.addMedia(addMediaUrl.href, file)).then();
    }
  }

  getMedia(event: any) {
    this.selectedFiles = event.target.files;
  }

  showSuccess() {
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 2000);
  }

  clearForm(event: any) {
    event.target.reset();
    this.text = "";
  }

  async typeOfPost() {

  }

}
