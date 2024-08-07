import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})

export class AboutMeComponent {
  aboutMeText: string = '';
  profileText: string = '';

  updateAboutMe() {
    this.profileText = this.aboutMeText;
  }
}
