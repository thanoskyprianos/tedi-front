import { Routes } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {WelcomeComponent} from "./welcome/welcome.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

export const routes: Routes = [
  { path: '', component: WelcomeComponent, title: 'NetWork' },
  { path: 'sign-in', component: SignInComponent, title: 'Sign In'},
  { path: 'sign-up', component: SignUpComponent, title: 'Sign Up'},
];

export default routes;
