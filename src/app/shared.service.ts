import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { DateLimit, Limit } from './limit';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private pageName = new Subject<any>();
  private posts = new Subject<any>();
  private date = new Subject<any>();
  private likes = new Subject<any>();
  private shares = new Subject<any>();
  private comments = new Subject<any>();
  private keywords = new Subject<string>();
  private limitLikes = new Subject<Limit>();
  private limitShares = new Subject<Limit>();
  private limitComments = new Subject<Limit>();
  private limitDate = new Subject<DateLimit>();
  private selectedType = new Subject<string>();

  
  constructor() { }
  sendSortByDateEvent() {
    this.date.next();
  }

  getSortByDateEvent(){
    return this.date.asObservable();
  }

  sendSortByLikesEvent() {
    this.likes.next();
  }

  getSortByLikesEvent(){
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
  sendResetPostsEvent(){
    this.posts.next();
  }

  getResetPostsEvent(){
    return this.posts.asObservable();
  }
  sendSearchByKewords(keywords:string){
    this.keywords.next(keywords);
  }

  getSearchByKeywords(){
    return this.keywords.asObservable();
  }

  sendUpdateTypeEvent(selectedType: string) {
    this.selectedType.next(selectedType);
  }

  getUpdateTypeEvent(){
    return this.selectedType.asObservable();
  }

  sendLimitLikes(limit:Limit){
    this.limitLikes.next(limit);
  }

  getLimitLikes(){
    return this.limitLikes.asObservable();
  }

  sendLimitShares(limit:Limit){
    this.limitShares.next(limit);
  }

  getLimitShares(){
    return this.limitShares.asObservable();
  }

  sendLimitComments(limit:Limit){
    this.limitComments.next(limit);
  }

  getLimitComments(){
    return this.limitComments.asObservable();
  }

  getLimitDate(){
    return this.limitDate.asObservable();
  }
  
  sendLimitDate(limit:DateLimit){
    this.limitDate.next(limit);
  }
  
}
