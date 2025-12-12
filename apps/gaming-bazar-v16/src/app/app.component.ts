import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  imgParent: string = 'https://w3schools.com/howto/img_avatar.png';
  toggleShowImg: boolean = true;

  onLoaded(img: string) {
    console.log('Image load event received in parent component.', img);
  }

  onToggleImage() {
    this.toggleShowImg = !this.toggleShowImg;
  }
}
