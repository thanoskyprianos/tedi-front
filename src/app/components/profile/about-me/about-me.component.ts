import { Component, Input } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { UserSessionService} from "../../../services/user-session.service";

// @ts-ignore
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})

export class AboutMeComponent {
  @Input() InXpInfo: string = '';
  @Input() InEdInfo: string = '';
  @Input() InSkInfo: string = '';
  showSuccessMessage: boolean = false;
  selectedFile: File | null = null;

  showXpInfo: boolean = true;
  showEdInfo: boolean = true;
  showSkInfo: boolean = true;
  
  constructor(
    protected session: UserSessionService     
  ) { }

  onSubmitAboutMe() {
    const aboutMeInfo = {
      xpInfo: this.InXpInfo,
      edInfo: this.InEdInfo,
      skInfo: this.InSkInfo
    };

    this.session.updateAboutMe(this.session.user.id, aboutMeInfo);
 
  }

  avatarSet(event: any) {
    const reader = new FileReader();
    const avatarDisplay = document.querySelector("#avatar-display");

    if (avatarDisplay) {
      reader.onloadend = (event) => {
        if (event.target && typeof event.target.result === "string") {
          avatarDisplay.setAttribute('src', event.target.result);
        }
      }
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
    }
  }


}
