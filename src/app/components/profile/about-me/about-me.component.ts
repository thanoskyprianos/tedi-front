import { Component, Input } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { UserSessionService} from "../../../services/user-session.service";
import { UserModule } from '../../../modules/user.module';

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

    this.session.updateAboutMe(this.session.user.id, aboutMeInfo).subscribe({
      next: () => {
        this.showSuccessMessage = true;
      },
      error: (err) => {
        console.error('Error while updating about me', err);
        this.showSuccessMessage = false;
      }
    });

    let avatarUrl = this.session.user._links.avatar;
    
    if (this.selectedFile)
    {
      this.session.uploadImage(avatarUrl.href, this.selectedFile)
    }
  }

}
