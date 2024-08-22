import {Component, Input} from '@angular/core';
import { PostService } from '../../../services/post.service';
import { UserSessionService } from '../../../services/user-session.service';
import { FormsModule } from '@angular/forms';
import {PostModule} from "../../../modules/post.module";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent {
  @Input() text: string = '';
  selectedFiles: File[] = [];

  showSuccessMessage: boolean = false;

  constructor(
    private postService: PostService,
    protected session: UserSessionService)
    { }

  onSubmitPost() {
    let post = {
      "text": this.text
    }

    this.postService.addPost(this.session.user.id, post).subscribe({
        next: (res: any) => {
          const post = new PostModule(0, res.body.text, res.body._links);

          const addMediaUrl = post._links.add_media;
          if (addMediaUrl) {
            this.addMedia(addMediaUrl);
          }
        }
      }
    )

    if (this.selectedFiles.length === 0) {
      this.showSuccess();
    }
  }

  addMedia(addMediaUrl: any) {
    Array.from(this.selectedFiles).forEach((file, idx) => {
      this.postService.addMedia(addMediaUrl.href, file).subscribe((_res) => {
        if (idx === this.selectedFiles.length - 1) {
          this.showSuccess();
          this.clearForm();
        }
      });
    });
  }

  getMedia(event: any) {
    this.selectedFiles = event.target.files;
  }

  showSuccess() {
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 2000);
  }

  clearForm() {
    const form = document.forms[0];
    if (form)
      form.reset();
  }
}
