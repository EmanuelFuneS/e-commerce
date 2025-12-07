import { Component } from '@angular/core';
import { GameProduct } from '../../models/game-product.model';

@Component({
  selector: 'app-game-products',
  templateUrl: './game-products.component.html',
  styleUrls: ['./game-products.component.sass'],
})
export class GameProductsComponent {
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
    {
      id: 6,
      name: 'Sixth Game',
      img: 'https://example.com/sixth-game-image.png',
      price: 18,
    },
    {
      id: 7,
      name: 'Seventh Game',
      img: 'https://example.com/seventh-game-image.png',
      price: 22,
    },
    {
      id: 8,
      name: 'Eighth Game',
      img: 'https://example.com/eighth-game-image.png',
      price: 28,
    },
    {
      id: 9,
      name: 'Ninth Game',
      img: 'https://example.com/ninth-game-image.png',
      price: 19,
    },
    {
      id: 10,
      name: 'Tenth Game',
      img: 'https://example.com/tenth-game-image.png',
      price: 24,
    },
    {
      id: 11,
      name: 'Eleventh Game',
      img: 'https://example.com/eleventh-game-image.png',
      price: 32,
    },
    {
      id: 12,
      name: 'Twelfth Game',
      img: 'https://example.com/twelfth-game-image.png',
      price: 27,
    },
    {
      id: 13,
      name: 'Thirteenth Game',
      img: 'https://example.com/thirteenth-game-image.png',
      price: 21,
    },
    {
      id: 14,
      name: 'Fourteenth Game',
      img: 'https://example.com/fourteenth-game-image.png',
      price: 29,
    },
    {
      id: 15,
      name: 'Fifteenth Game',
      img: 'https://example.com/fifteenth-game-image.png',
      price: 16,
    },
    {
      id: 16,
      name: 'Sixteenth Game',
      img: 'https://example.com/sixteenth-game-image.png',
      price: 31,
    },
    {
      id: 17,
      name: 'Seventeenth Game',
      img: 'https://example.com/seventeenth-game-image.png',
      price: 23,
    },
  ];
}
