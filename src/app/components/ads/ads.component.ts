import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PostsComponent } from "../posts/posts.component";
import {NgClass, NgIf} from "@angular/common";
import {PostModule} from "../../modules/post.module";

@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [RouterLink, PostsComponent, NgClass, NgIf],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.css'
})

export class AdsComponent {
}
