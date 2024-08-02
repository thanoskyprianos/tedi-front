import { Routes } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {WelcomeComponent} from "./welcome/welcome.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ProfileComponent } from "./profile/profile.component";

export const routes: Routes = [
  { path: '', component: WelcomeComponent, title: 'NetWork' },
  { path: 'sign-in', component: SignInComponent, title: 'Sign In'},
  { path: 'sign-up', component: SignUpComponent, title: 'Sign Up'},
  { path: 'home-page', component: HomePageComponent, title: 'Home Page' },
  { path: 'profile-page', component: ProfileComponent, title: 'Profile'} ,
];

export default routes;

/* Όταν συνδέσουμε back-front θα πρέπει
να δημιουργηθούν ξεχωριστά URL βάσει του id
οπότε αλλαγή των routes */
