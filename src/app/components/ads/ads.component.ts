import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PostsComponent } from "../posts/posts.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [RouterLink, PostsComponent, NgClass],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.css'
})

export class AdsComponent {

}
