import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private pageName = new Subject<any>();
  private likes = new Subject<any>();
  private shares = new Subject<any>();
  private comments = new Subject<any>();
  private keywords = new Subject<string[]>();
  
  constructor() { }
  sendSortByPageEvent() {
    this.pageName.next();
  }

  getSortByPageEvent(): Observable<any> {
    return this.pageName.asObservable();
  }

  sendSortByLikesEvent() {
    this.likes.next();
  }

  getSortByLikesEvent(): Observable<any> {
    return this.likes.asObservable();
  }

  sendSortBySharesEvent(){
    this.shares.next();
  }

  getSortBySharesEvent(){
    return this.shares.asObservable();
  }

  sendSortByCommentsEvent(){
    this.comments.next();
  }

  getSortByCommentsEvent(){
    return this.comments.asObservable();
  }

  sendSearchByKewords(keywords:string[]){
    this.keywords.next();
  }

  getSearchByKeywords(){
    return this.keywords.asObservable();
  }
}
