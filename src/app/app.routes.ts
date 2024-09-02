import { Routes } from '@angular/router';
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { ErrorComponent } from "./components/error/error.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { NetworkComponent } from "./components/network/network.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { AdsComponent } from "./components/ads/ads.component";
import { IsLoggedInGuardService } from "./guards/is-logged-in-guard.service";
import { IsLoggedOutService } from "./guards/is-logged-out.service";
import { AboutMeComponent } from './components/about-me/about-me.component';
import { AddPostComponent } from "./components/add-post/add-post.component";
import { SearchComponent } from "./components/search/search.component";
import {PostWithCommentsComponent} from "./components/post-with-comments/post-with-comments.component";
import {UserMessagesComponent} from "./components/messages/user-messages/user-messages.component";
import {AdminPageComponent} from "./components/admin-page/admin-page.component";
import {IsAdminGuardService} from "./guards/is-admin-guard.service";

export const routes: Routes = [
  { path: '', component: WelcomeComponent, title: 'NetWork', canActivate: [IsLoggedOutService] },
  { path: 'sign-in', component: SignInComponent, title: 'Sign In', canActivate: [IsLoggedOutService] },
  { path: 'sign-up', component: SignUpComponent, title: 'Sign Up', canActivate: [IsLoggedOutService] },
  { path: 'home-page', component: HomePageComponent, title: 'Home Page', canActivate: [IsLoggedInGuardService] },

  { path: 'error', component: ErrorComponent, title: 'Error', canActivate: [IsLoggedInGuardService] },

  { path: 'profile-page', component: ProfileComponent, title: 'Profile', canActivate: [IsLoggedInGuardService] } ,
  { path: 'network-page', component: NetworkComponent, title: 'Network', canActivate: [IsLoggedInGuardService] } ,
  { path: 'messages-page', component: MessagesComponent, title: 'Messages', canActivate: [IsLoggedInGuardService], children: [
      { path: ':id', component: UserMessagesComponent, title: 'Messages', canActivate: [IsLoggedInGuardService] }]} ,
  { path: 'notification-page', component: NotificationsComponent, title: 'Notifications', canActivate: [IsLoggedInGuardService] } ,
  { path: 'settings-page', component: SettingsComponent, title: 'Settings', canActivate: [IsLoggedInGuardService] } ,
  { path: 'profile-page/:id', component: ProfileComponent, title: 'Profile', canActivate: [IsLoggedInGuardService] },
  { path: 'ads-page', component: AdsComponent, title: 'Ads', canActivate: [IsLoggedInGuardService] } ,
  { path: 'about-me', component: AboutMeComponent, title: 'About Me', canActivate: [IsLoggedInGuardService]} ,
  { path: 'add-post', component: AddPostComponent, title: 'Add Post', canActivate: [IsLoggedInGuardService]},
  { path: 'search', component:SearchComponent, title:'Search', canActivate: [IsLoggedInGuardService]},
  { path: 'post/:userId/:postId', component: PostWithCommentsComponent, title: 'Post', canActivate: [IsLoggedInGuardService]},

  { path: 'admin', component: AdminPageComponent, title: 'Admin', canActivate: [IsLoggedInGuardService, IsAdminGuardService] },

  { path: '**', redirectTo: '/error', pathMatch: 'full' }
];

export default routes;
