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

  user(id: number) {
    return this.http.get(properties.user + id, {observe: 'response'});
  }

  avatar(url: string) {
    return this.http.get(url, {observe: 'response', responseType: 'blob'});
  }
}
