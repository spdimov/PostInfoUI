import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Limit, DateLimit } from '../limit';
import { Post } from '../post';
import { PostsService } from '../posts.service';
import { SharedService } from '../shared.service';
import { SidenavComponent } from '../sidenav/sidenav.component';


@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public minMaxLikes = [0,0];
  public show = 20;
  clickEventSubscription: Subscription | undefined;
  posts: Post[] = []
  postsCopy: Post[] = []
  postsShowType: Post[] = []
  searchResult: Post[] = []
  limitResult: Post[] = []
  

  constructor(
    private postsService: PostsService,
    private sharedService: SharedService,
  ) {
    
    this.clickEventSubscription = this.sharedService.getSortByDateEvent().subscribe(() => {this.sortByDate(); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getSortByLikesEvent().subscribe(() => { this.sortByLikes(); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getSortBySharesEvent().subscribe(() => { this.sortByShares(); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getSortByCommentsEvent().subscribe(() => { this.sortByComments(); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getSearchByKeywords().subscribe(keywords => { this.getByKeywords(keywords); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getLimitLikes().subscribe(limit => { this.limitByLikes(limit); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getUpdateTypeEvent().subscribe(selectedType => { this.updateType(selectedType); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getLimitShares().subscribe(limit => { this.limitByShares(limit); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getLimitComments().subscribe(limit => { this.limitByComments(limit); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getLimitDate().subscribe(limit => { this.limitByDate(limit); this.show = 20; })
    this.clickEventSubscription = this.sharedService.getResetPostsEvent().subscribe(() => {this.resetPosts(); this.show = 20; })
  }

  ngOnInit(): void {
      this.getPosts();
  }
  resetPosts() : void{
    this.posts = this.postsCopy;
    this.postsShowType = this.posts;
  }
  updateType(selectedType: string): void {
    this.posts = this.postsShowType;
    if (selectedType == "Both" || selectedType == null) {
      this.searchResult = this.postsShowType;
    }
    else {
    let intSelectedType=0;
    if (selectedType == "Image") intSelectedType=0;
    if (selectedType == "Video") intSelectedType=1;
      this.searchResult = [];
      this.posts.forEach(post => {
       if (post.type == intSelectedType) {
         this.searchResult.push(post);
        }
     });
    }
    this.posts = this.searchResult;
  }

  getMinMaxLikes(): [number, number] {
    this.postsCopy.sort((a, b) => {
      if (a.likes < b.likes) { return 1; }
      if (a.likes > b.likes) { return -1; }
      return 0;
    });
    let max = this.postsCopy[0].likes;
    let min = this.postsCopy[this.postsCopy.length - 1].likes;
    return [min, max];
  }

  async getPosts() {
    this.postsService.getPosts().then( 
      posts => {
      this.posts = posts;
      this.postsCopy = posts;
      this.postsShowType = posts;},);
    //.then(() => {this.minMaxLikes = this.getMinMaxLikes();}  );

  }

  sortByPageName(): void {
    this.posts.sort((a, b) => {
      if (a.page < b.page) { return -1; }
      if (a.page > b.page) { return 1; }
      return 0;
    });
  }
  sortByDate(): void {
    this.posts.sort((a, b) => {
      if (a.date < b.date) { return 1; }
      if (a.date > b.date) { return -1; }
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
    this.searchResult = [];
    keywords = keywords.trim();
    var keywordsArr = keywords.split(" ");

    this.postsCopy.forEach(post => {
      keywordsArr.forEach(keyword => {
        if (post.page.toUpperCase().includes(keyword.toUpperCase()) || post.text.toUpperCase().includes(keyword.toUpperCase())) {
          this.searchResult.push(post);
        }
      });
    });

    this.posts = this.searchResult;
    this.postsShowType = this.posts;
  }

  limitByLikes(limit: Limit): void {
    this.sortByLikes();
    this.limitResult = [];
    
    this.postsCopy.forEach(post => {
      if (post.likes < limit.top && post.likes > limit.bottom) {
        this.limitResult.push(post)
      }
    });

    this.posts = this.limitResult;
    this.postsShowType = this.posts;
  }

  limitByShares(limit: Limit): void {
    this.sortByShares();
    this.limitResult = [];

    this.postsCopy.forEach(post => {
      if (post.shares < limit.top && post.shares > limit.bottom) {
        this.limitResult.push(post)
      }
    });

    this.posts = this.limitResult;
    this.postsShowType = this.posts;
  }

  limitByComments(limit: Limit): void {
    this.sortByComments();
    this.limitResult = [];

    this.postsCopy.forEach(post => {
      if (post.comments < limit.top && post.comments > limit.bottom) {
        this.limitResult.push(post);
      }
    });

    this.posts = this.limitResult;
    this.postsShowType = this.posts;
  }

  limitByDate(limit: DateLimit) : void{

  console.log(limit);
    this.limitResult = [];
    let limitTop = new Date(limit.top);
    let limitBot = new Date(limit.bottom);
     
  console.log(limitTop);
   console.log(limit.top);
  console.log(limitTop.getTime());
   console.log(limit.bottom);
   console.log(limitBot);
    console.log(limitBot.getTime());
    
    this.postsCopy.forEach(post => {
    let currPostDate = new Date(post.date);
    if (currPostDate.getTime() < limitTop.getTime() && currPostDate.getTime() > limitBot.getTime()){
        this.limitResult.push(post);
      }
    })

    this.posts = this.limitResult;
    this.postsShowType = this.posts;
  }
  onScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos >= max) {
      this.show = this.show + 20;
    }
  }

}