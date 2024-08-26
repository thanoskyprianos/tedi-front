import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(
    private http: HttpClient
  ) { }

  accept(url: string) {
    return this.http.put(url, {observe: 'response'});
  }

  reject(url: string) {
    return this.http.delete(url, {observe: 'response'});
  }

  add(url: string) {
    return this.http.post(url, {observe: 'response'});
  }

  cancel(url: string) {
    return this.http.delete(url, {observe: 'response'});
  }
}
