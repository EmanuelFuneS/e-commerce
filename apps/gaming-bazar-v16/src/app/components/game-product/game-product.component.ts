import { Component, Input } from '@angular/core';
import { GameProduct } from '../../models/game-product.model';
@Component({
  selector: 'app-game-product',
  templateUrl: './game-product.component.html',
  styleUrls: ['./game-product.component.sass'],
})
export class GameProductComponent {
  @Input() game: GameProduct = {
    id: 0,
    name: '',
    img: '',
    price: 0,
  };
}
