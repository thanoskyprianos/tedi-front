import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {messages, properties} from "../config/properties.file";

@Injectable({
  providedIn: 'root'
})
export class UserFetcherService {

  constructor(
    private http: HttpClient
  ) { }

  self() { // auto-set by interceptor
    return this.http.get(properties.self, {observe: 'response'});
  }

  userById(id: number) {
    return this.http.get(properties.user + id, {observe: 'response'});
  }

  userByUrl(url: string) {
    return this.http.get(url, {observe: 'response'});
  }

  avatar(url: string) {
    return this.http.get(url, {observe: 'response', responseType: 'blob'});
  }

  aboutMe(url: string) {
    return this.http.get(url, {observe: 'response'});
  }

  getReceived(receivedUrl: string) {
    return this.http.get(receivedUrl, {observe: 'response'});
  }

  connections(connectedUrl: string) {
    return this.http.get(connectedUrl, {observe: 'response'});
  }

  messages(userId: number) {
    return this.http.get(messages(userId), {observe: 'response'});
  }

  adminGetUsers() {
    return this.http.get(properties.admin + '/users/all', {observe: 'response'});
  }

  adminGetUsersByList(ids: number[]) {
    return this.http.post(properties.admin + '/users', ids, {observe: 'response'});
  }
}
