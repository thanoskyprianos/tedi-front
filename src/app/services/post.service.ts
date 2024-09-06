import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jobOff, postOf, postsFor, postsOf} from "../config/properties.file";

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

  getPost(userId: number, postId: number) {
    return this.http.get(postOf(userId, postId), {observe: 'response'});
  }

  getPostByUrl(url: string) {
    return this.http.get(url, {observe: 'response'});
  }

  getPostsFor(id: number, page: number) {
    return this.http.get(postsFor(id, page), {observe: 'response'});
  }

  getPostsOf(id: number) {
    return this.http.get(postsOf(id), {observe: 'response'});
  }

  getJobOffers(id: number, page: number) {
    return this.http.get(jobOff(id, page), {observe: 'response'});
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

  getComments(commentsUrl: string) {
    return this.http.get(commentsUrl, {observe: 'response'});
  }

  addComment(commentUrl: string, comment: any) {
    return this.http.post(commentUrl, comment, {observe: 'response'});
  }

  deleteComment(deleteUrl: string) {
    return this.http.delete(deleteUrl, {observe: 'response'});
  }

  addAsViewer(viewerUrl: string) {
    return this.http.put(viewerUrl, {observe: 'response'});
  }
}
