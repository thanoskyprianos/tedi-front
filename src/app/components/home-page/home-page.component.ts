import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {PostsComponent} from "../posts/posts.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    PostsComponent,
    NgIf
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent {
}
