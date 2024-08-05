import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserSessionService} from "../../services/user-session.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent {
  @Input() email: string = '';
  @Input() password: string = '';
  @Input() name: string = '';
  @Input() surname: string = '';
  @Input() confirmPassword: string = '';
  @Input() phoneNumber: number = 0;

  constructor(private session: UserSessionService) { }

  onSubmit() {
  }
  
}
