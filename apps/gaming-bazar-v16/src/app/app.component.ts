import { Component } from '@angular/core';
import { GameProduct } from './models/game-product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  imgParent: string = 'https://w3schools.com/howto/img_avatar.png';
  toggleShowImg: boolean = true;
  products: GameProduct[] = [
    {
      id: 1,
      name: 'Game Name',
      img: 'https://example.com/game-image.png',
      price: 11,
    },
    {
      id: 2,
      name: 'Another Game',
      img: 'https://example.com/another-game-image.png',
      price: 20,
    },
    {
      id: 3,
      name: 'Third Game',
      img: 'https://example.com/third-game-image.png',
      price: 15,
    },
    {
      id: 4,
      name: 'Fourth Game',
      img: 'https://example.com/fourth-game-image.png',
      price: 25,
    },
    {
      id: 5,
      name: 'Fifth Game',
      img: 'https://example.com/fifth-game-image.png',
      price: 30,
    },
  ];

  onLoaded(img: string) {
    console.log('Image load event received in parent component.', img);
  }

  onToggleImage() {
    this.toggleShowImg = !this.toggleShowImg;
  }
}
