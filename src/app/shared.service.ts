import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private pageName = new Subject<any>();
  private likes = new Subject<any>();

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
}
