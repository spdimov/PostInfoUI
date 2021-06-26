import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Limit } from '../limit';
import { Post } from '../post';
import { PostsService } from '../posts.service';
import { SharedService } from '../shared.service';


@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public show = 20;
  clickEventSubscription: Subscription | undefined;
  posts: Post[] = []
  postsCopy: Post[] = []
  searchResult: Post[] = []
  limitResult: Post[] = []

  constructor(
    private postsService: PostsService,
    private sharedService: SharedService,
  ) {
    this.clickEventSubscription = this.sharedService.getSortByPageEvent().subscribe(() => { this.sortByPageName(); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getSortByLikesEvent().subscribe(() => { this.sortByLikes(); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getSortBySharesEvent().subscribe(() => { this.sortByShares(); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getSortByCommentsEvent().subscribe(() => { this.sortByComments(); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getSearchByKeywords().subscribe(keywords => { this.getByKeywords(keywords); this.show = 20;})
    this.clickEventSubscription = this.sharedService.getLimitLikes().subscribe(limit => {console.log(limit);this.limitByLikes(limit); this.show = 20;})
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getMinMaxLikes(): [number, number] {
    console.log(this.posts[1]);
    this.postsCopy.sort((a, b) => {
      if (a.likes < b.likes) { return 1; }
      if (a.likes > b.likes) { return -1; }
      return 0;
    });
    let max = this.postsCopy[0].likes;
    let min = this.postsCopy[this.postsCopy.length - 1].likes;
    return [min, max];
  }

  async getPosts(): Promise<void> {
    this.postsService.getPosts().subscribe(posts => { this.posts = posts; this.postsCopy = posts; console.log(new Date())});
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

  sortByShares(): void {
    this.posts.sort((a, b) => {
      if (a.shares < b.shares) { return 1; }
      if (a.shares > b.shares) { return -1; }
      return 0;
    });
  }

  sortByComments(): void {
    this.posts.sort((a, b) => {
      if (a.comments < b.comments) { return 1; }
      if (a.comments > b.comments) { return -1; }
      return 0;
    });
  }

  getByKeywords(keywords: string): void {
    this.posts = this.postsCopy;
    this.searchResult = [];
    keywords = keywords.trim();
    var keywordsArr = keywords.split(" ");

    this.posts.forEach(post => {
      keywordsArr.forEach(keyword => {
        if (post.page.toUpperCase().includes(keyword.toUpperCase()) || post.text.toUpperCase().includes(keyword.toUpperCase())) {
          this.searchResult.push(post);
        }
      });
    });

    this.posts = this.searchResult;
  }

  limitByLikes(limit:Limit): void{
    this.posts = this.postsCopy;
    this.limitResult = [];
    this.posts.forEach(post =>{
      if(post.likes<limit.top && post.likes>limit.bottom){
        this.limitResult.push(post)
      }
    });

    this.posts = this.limitResult;
  }

  onScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;

    if (pos >= max) {
      this.show = this.show + 20;
    }
  }

}