import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserSessionService} from "./user-session.service";
import {Router} from "@angular/router";
import {info, infoPrivacy} from "../config/properties.file";

@Injectable({
  providedIn: 'root'
})
export class UserUpdaterService {

  constructor(
    private http: HttpClient
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
    return this.http.put(UrlEmail ,newEmail);
  }

  updatePassword(UrlPassword: string, newPassword: string) {
    return this.http.put(UrlPassword ,newPassword);
  }
}
