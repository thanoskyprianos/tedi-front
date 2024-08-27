import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private http: HttpClient) { }

  search(searchUrl: string, name: string) {
    return this.http.get<any[]>(`${searchUrl}?name=${name}`);
  }

}
