import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {PostsComponent} from "../posts/posts.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    PostsComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
}
