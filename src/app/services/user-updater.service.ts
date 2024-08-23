import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserSessionService} from "./user-session.service";
import {Router} from "@angular/router";
import {info, infoPrivacy, properties} from "../config/properties.file";

@Injectable({
  providedIn: 'root'
})
export class UserUpdaterService {

  constructor(
    private http: HttpClient,
    private session: UserSessionService,
    private router: Router
  ) { }

  updateAboutMe(userId: number, aboutMe: any) {
    return this.http.put(info(userId), aboutMe, {observe: 'response'});
  }

  updateAboutMePrivacy(userId: number, privacy: any) {
    return this.http.put(infoPrivacy(userId), privacy, {observe: 'response'});
  }

  uploadImage(avatarUrl: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.put(avatarUrl, formData);
  }

  updateEmail(UrlEmail: string, newEmail: string) {
    this.http.put(UrlEmail ,newEmail);
    this.session.removeToken();
    this.router.navigate(['/login']);
  }

  updatePassword(UrlPassword: string, newPassword: string) {
    this.http.put(UrlPassword ,newPassword);
  }
}
