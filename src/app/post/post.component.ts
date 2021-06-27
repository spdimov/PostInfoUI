import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  @Input() post: Post | undefined;

  constructor() { }

  ngOnInit(): void {}
  openFacebookUrl() {
    if (this.post) {
      window.open(
        this.post.URL, "_blank");
    }
  }

}
