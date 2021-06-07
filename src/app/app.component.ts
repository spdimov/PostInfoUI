import { Component, Output } from '@angular/core';
import { Post } from './post';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'postinfo';
  onScroll(){
  let pos =(document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  let max = document.documentElement.scrollHeight;
  
  if ( pos >= max ) {
    console.log("scrolled to bottom");
  }
  }
  

}
