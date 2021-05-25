import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
  }

  sortByPage(){
    this.sharedService.sendSortByPageEvent();
  }

  sortByLikes(){
    this.sharedService.sendSortByLikesEvent();
  }

}
