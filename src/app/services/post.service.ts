import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface posted {
  post_id: number;
  description: string;
  author: string;
  media: string;
  likes: number;
  comments: number;
}

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(
    private http: HttpClient,
  ) { }


  getPosts(postUrl: string): Observable<posted[]> {
    return this.http.get<posted[]>(postUrl);
  }

  addPost(postUrl: string, postedData: posted): Observable<any> {
    return this.http.post(postUrl, postedData);
  }
  
}