import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) { }

  readNotification(url: string) {
    return this.http.put(url, {observe: 'response'});
  }

  deleteNotification(url: string) {
    return this.http.delete(url, {observe: 'response'});
  }
}
