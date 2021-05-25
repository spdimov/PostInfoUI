import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post';
import { PostsService } from '../posts.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  clickEventSubscription:Subscription | undefined;

  posts: Post[] = []

  constructor(
    private postsService: PostsService,
    private sharedService:SharedService
    ) {
      this.clickEventSubscription = this.sharedService.getSortByPageEvent().subscribe(()=>{this.sortByPageName();})
      this.clickEventSubscription = this.sharedService.getSortByLikesEvent().subscribe(()=>{this.sortByLikes();})
     }

  

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postsService.getPosts().subscribe(posts => this.posts = posts);
  }

  sortByPageName(): void {
    this.posts.sort((a, b) => {
      if (a.page < b.page) { return -1; }
      if (a.page > b.page) { return 1; }
      return 0;
    });
  }

  sortByLikes(): void {
    this.posts.sort((a, b) => {
      if (a.likes < b.likes) { return 1; }
      if (a.likes > b.likes) { return -1; }
      return 0;
    });
  }
}
