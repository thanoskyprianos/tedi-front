import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {postsFor, postsOf} from "../config/properties.file";

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

  getPostsFor(id: number) {
    return this.http.get(postsFor(id), {observe: 'response'});
  }

  getPostsOf(id: number) {
    return this.http.get(postsOf(id), {observe: 'response'});
  }

  addPost(userId: number, postText: any): Observable<any> {
    return this.http.post(postsOf(userId), postText, {observe: 'response'});
  }

  getMedia(mediaUrl: string) {
    return this.http.get(mediaUrl, {observe: 'response', responseType: 'blob'});
  }

  addMedia(addMediaUrl: string, media: File) {
    const formData = new FormData();
    formData.append('file', media, media.name);

    return this.http.post(addMediaUrl, formData, {observe: 'response'});
  }

  deletePost(deleteUrl: string) {
    return this.http.delete(deleteUrl, {observe: 'response'});
  }

  likePost(likeUrl: string) {
    return this.http.post(likeUrl, {observe: 'response'});
  }
}
