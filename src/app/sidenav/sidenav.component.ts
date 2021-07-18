import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { MatRadioModule } from '@angular/material/radio';
import { PostsComponent } from '../posts/posts.component';
import { MatRadioChange } from '@angular/material/radio';
import { formatDate } from '@angular/common';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {


  valueLikes: number = 0;
  highValueLikes: number = 100000;
  optionsLikes: Options = {
    floor: 0,
    ceil: 100000,
    step: 100
  };

  valueComments: number = 0;
  highValueComments: number = 100000;
  optionsComments: Options = {
    floor: 0,
    ceil: 100000,
    step: 100
  };


  valueShares: number = 0;
  highValueShares: number = 100000;
  optionsShares: Options = {
    floor: 0,
    ceil: 100000,
    step: 100
  };

  selectedType = "Both";
  radio_opts = ["Both", "Image", "Video"];

  dateRange: Date[] = this.customDateRange();
  valueDate: number = this.dateRange[0].getMonth();
  highValueDate: number = this.dateRange[this.dateRange.length - 1].getTime();
  optionsDate: Options = {
    stepsArray: this.dateRange.map((date: Date) => {
      return { value: date.getTime() };
    }),
    translate: (value: number): string => {
      return new Date(value).toDateString();
    }
  };

  @Input()
  private keywords: string | undefined;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  customDateRange(): Date[] {
    const dates: Date[] = [];
    var today = new Date;
    var currYear: number = +today.getFullYear();
    for (let j: number = 0; j < 12; j++) {
      for (let i: number = 1; i <= 31; i++) {
        dates.push(new Date(currYear - 1, j, i));
      }
    }
    loop1:
    for (let j: number = 0; j < 12; j++) {
      loop2:
      for (let i: number = 0; i < 31; i++) {
        dates.push(new Date(currYear, j, i));
        if (j == today.getMonth() && i == today.getDate()) break loop1;
      }
    }
    return dates;


  }

  updateType($event: MatRadioChange) {
      this.sharedService.sendUpdateTypeEvent($event.value);
  }
  resetPosts(){
    this.sharedService.sendResetPostsEvent();

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
    if (this.keywords) {
      this.sharedService.sendSearchByKewords(this.keywords);
    }
  }

  limitLikes() {
    this.sharedService.sendLimitLikes({ bottom: this.valueLikes, top: this.highValueLikes });
  }

  limitShares() {
    this.sharedService.sendLimitShares({ bottom: this.valueShares, top: this.highValueShares });
  }

  limitComments() {
    this.sharedService.sendLimitComments({ bottom: this.valueComments, top: this.highValueComments });
  }
  limitDate(){
  const format = 'dd/MM/yyyy';
  const locale = 'en-US';
  this.sharedService.sendLimitDate({ bottom: formatDate(this.valueDate, format, locale), top: formatDate(this.highValueDate, format, locale)});
  }
}
