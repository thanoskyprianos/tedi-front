import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-avatar-input',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './avatar-input.component.html',
  styleUrl: './avatar-input.component.css'
})
export class AvatarInputComponent implements OnChanges, OnDestroy {
  @Input() selectedFile: File | null = null;
  @Output() selectedFileChange: EventEmitter<File | null> = new EventEmitter();

  @Input() verbose: boolean = true;

  avatarUrl: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedFile'].previousValue === null && this.selectedFile) {
      this.displayAvatar(this.selectedFile);
    }
  }

  ngOnDestroy() {
    if (this.avatarUrl) {
      URL.revokeObjectURL(this.avatarUrl);
    }
  }

  avatarSet(event: any) {
    this.displayAvatar(event.target.files[0]);
    this.selectedFile = event.target.files[0];
    this.selectedFileChange.emit(this.selectedFile);
  }

  displayAvatar(file: Blob) {
    this.avatarUrl = URL.createObjectURL(file);
  }

  avatarClear() {
    const avatarDisplay = document.querySelector("#avatar-display");

    if (avatarDisplay) {
      avatarDisplay.setAttribute('src', 'resource/user.png');
      this.selectedFile = null;
    }
  }
}
