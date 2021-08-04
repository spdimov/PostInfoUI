import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsUrl = "https://postinfoserver.herokuapp.com/posts";

  constructor(private http: HttpClient) { }

  async getPosts(): Promise<Post[]> {
    const data = await this.http.get<Post[]>(this.postsUrl).toPromise();
    return data;
  }
}
