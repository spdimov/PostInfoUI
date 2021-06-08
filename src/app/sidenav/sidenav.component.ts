import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input()
  private keywords: string[] | undefined;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }
  sortByPage() {
    this.sharedService.sendSortByPageEvent();
  }

  sortByLikes() {
    this.sharedService.sendSortByLikesEvent();
  }

  sortByShares() {
    this.sharedService.sendSortBySharesEvent();
  }

  sortByComments() {
    this.sharedService.sendSortByCommentsEvent();
  }

  sortByKeywords(keywords: string[]) {
    this.sharedService.sendSearchByKewords(keywords);
  }
}
