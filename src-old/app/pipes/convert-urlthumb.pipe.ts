import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertURLthumb'
})
export class ConvertURLthumbPipe implements PipeTransform {

  transform(string: string, args?: any): any {
    let url = "assets/posts_images";
    for(let i=string.length-1; i>=0; i--){
      if(string[i]=='/') {url=url+string.slice(i,string.length); break;}
    }
    url=url.slice(0,-1);
    url = url + "_thumbnail.jpg"
    return url;
  }

}
