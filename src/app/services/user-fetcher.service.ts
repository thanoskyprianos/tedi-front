import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {properties} from "../config/properties.file";

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

}
