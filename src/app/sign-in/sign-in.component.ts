import {Component, Input} from '@angular/core';
import { SignIn } from '../sign-in';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent {
  @Input() signIn! : SignIn
}
