import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Options } from "@angular-slider/ngx-slider";

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  value: number = 0;
  highValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10
  };

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
  }
  sortByPage(){
    this.sharedService.sendSortByPageEvent();
  }

  sortByLikes(){
    this.sharedService.sendSortByLikesEvent();
  }

  sortByShares(){
    this.sharedService.sendSortBySharesEvent();
  }

  sortByComments(){
    this.sharedService.sendSortByCommentsEvent();
  }
  
}
