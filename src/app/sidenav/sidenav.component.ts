import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Options,LabelType } from "@angular-slider/ngx-slider";

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  valueLikes: number = 0;
  highValueLikes: number = 100;
  optionsLikes: Options = {
    floor: 0,
    ceil: 100,
    step: 10
  };
  
  valueComments: number = 0;
  highValueComments: number = 100;
  optionsComments: Options = {
    floor: 0,
    ceil: 100,
    step: 10
  };
  

  valueShares: number = 0;
  highValueShares: number = 100;
  optionsShares: Options = {
    floor: 0,
    ceil: 100,
    step: 10
  };

  dateRange: Date[] = this.customDateRange();
  value: number = this.dateRange[0].getTime();

  optionsDate: Options = {
    stepsArray: this.dateRange.map((date: Date) => {
      return { value: date.getTime() };
    }),
    translate: (value: number, label: LabelType): string => {
      return new Date(value).toDateString();
    }
  };

  @Input()
  private keywords: string | undefined
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }


  customDateRange(): Date[] {
    const dates: Date[] = [];
    for (let i: number = 1; i <= 31; i++) {
      dates.push(new Date(2021, 6, i));
    }
    return dates;
  }

  sortByPage(){
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

  sortByKeywords() {
    if(this.keywords){
    this.sharedService.sendSearchByKewords(this.keywords);
    }
  }
  
}
