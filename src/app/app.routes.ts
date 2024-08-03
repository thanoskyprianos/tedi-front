import { Routes } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {WelcomeComponent} from "./welcome/welcome.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ProfileComponent } from "./profile/profile.component";
import {NetworkComponent} from "./network/network.component";
import {MessagesComponent} from "./messages/messages.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {SettingsComponent} from "./settings/settings.component";
import {AdsComponent} from "./ads/ads.component";
import {UserAuthService} from "./user/user-auth.service";

export const routes: Routes = [
  { path: '', component: WelcomeComponent, title: 'NetWork' },
  { path: 'sign-in', component: SignInComponent, title: 'Sign In' },
  { path: 'sign-up', component: SignUpComponent, title: 'Sign Up' },
  { path: 'home-page', component: HomePageComponent, title: 'Home Page', canActivate: [UserAuthService] },

  { path: 'profile-page', component: ProfileComponent, title: 'Profile' } ,
  { path: 'network-page', component: NetworkComponent, title: 'Network' } ,
  { path: 'messages-page', component: MessagesComponent, title: 'Messages' } ,
  { path: 'notification-page', component: NotificationsComponent, title: 'Notifications' } ,
  { path: 'settings-page', component: SettingsComponent, title: 'Settings' } ,
  { path: 'profile-page', component: ProfileComponent, title: 'Profile' } ,
  { path: 'ads-page', component: AdsComponent, title: 'Ads' } ,
];

export default routes;

/* Όταν συνδέσουμε back-front θα πρέπει
να δημιουργηθούν ξεχωριστά URL βάσει του id
οπότε αλλαγή των routes */
