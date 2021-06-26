import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { Limit } from './limit';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private pageName = new Subject<any>();
  private likes = new Subject<any>();
  private shares = new Subject<any>();
  private comments = new Subject<any>();
  private keywords = new Subject<string>();
  private limit = new Subject<Limit>();
  private selectedType = new Subject<number>();

  
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

  sendSearchByKewords(keywords:string){
    this.keywords.next(keywords);
  }

  getSearchByKeywords(){
    return this.keywords.asObservable();
  }

  sendUpdateTypeEvent(selectedType: number) {
    this.selectedType.next(selectedType);
  }
  getUpdateTypeEvent() : Observable<any>{
    return this.selectedType.asObservable();
  }
  sendLimitLikes(limit:Limit){
    this.limit.next(limit);
  }

  getLimitLikes(){
    return this.limit.asObservable();
  }
}
