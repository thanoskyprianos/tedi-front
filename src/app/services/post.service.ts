import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {posts} from "../config/properties.file";

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


  getPosts(postUrl: string) {
    return this.http.get<posted[]>(postUrl);
  }

  addPost(userId: number, postText: any): Observable<any> {
    return this.http.post(posts(userId), postText, {observe: 'response'});
  }

  addMedia(addMediaUrl: string, media: File) {
    const formData = new FormData();
    formData.append('file', media, media.name);

    return this.http.post(addMediaUrl, formData, {observe: 'response'});
  }
}
