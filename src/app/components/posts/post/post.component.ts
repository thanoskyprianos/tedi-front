import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PostModule} from "../../../modules/post.module";
import {NgForOf, NgIf} from "@angular/common";
import {PostService} from "../../../services/post.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnChanges {
  @Input() post: PostModule | undefined;

  media: {url: string, file: File}[] = [];

  constructor(private postService: PostService) { }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['post'].firstChange && this.post) {
      await this.getMedia();
      this.displayMedia();
    }
  }

  async getMedia() {
    const mediaUrls: any | any[] | undefined = this.post!._links.media;

    if (mediaUrls === undefined) { return; }

    if (mediaUrls instanceof Array)
      for (const link of mediaUrls) {
        await this.getFile(link)
      }
    else
      await this.getFile(mediaUrls);
  }

  async getFile(url: any) {
    await lastValueFrom(
      this.postService
          .getMedia(url.href))
          .then((res) => {
            this.addFile(res)
          });
  }

  addFile(res: any) {
    if (res.status === 200) {
      this.media.push({url: '', file: res.body});
    }
  }

  displayMedia() {
    console.log(this.media);

    this.media.forEach((file, idx) => {
      const reader = new FileReader();

      console.log("HEY")

      reader.onloadend = (event) => {
        if (event.target && typeof event.target.result === "string") {
          this.media[idx].url = event.target.result;
        }
      }

      reader.readAsDataURL(file.file);
    })
  }

  viewImage(event: any) {
    const w = window.open("", "_blank");
    if (!w) { return; }

    w.document.title = 'Image';
    w.document.write(`
        <body style="
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            background-color: #1c1c1e"
        >
          <img style="height: 100vh" src="${event.target.src}" />
        </body>
    `);

    w.stop();
  }
}
