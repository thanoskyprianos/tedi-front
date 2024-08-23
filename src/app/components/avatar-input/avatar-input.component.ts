import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-avatar-input',
  standalone: true,
  imports: [],
  templateUrl: './avatar-input.component.html',
  styleUrl: './avatar-input.component.css'
})
export class AvatarInputComponent {
  @Input() selectedFile: File | null = null;
  @Output() selectedFileChange: EventEmitter<File | null> = new EventEmitter();

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
      this.selectedFileChange.emit(this.selectedFile);
    }
  }

  avatarClear() {
    const avatarDisplay = document.querySelector("#avatar-display");

    if (avatarDisplay) {
      avatarDisplay.setAttribute('src', 'resource/user.png');
      this.selectedFile = null;
    }
  }
}
