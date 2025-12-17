import { Component, Input } from '@angular/core';
import { VideoGame } from '../../models/Videogame.model';
@Component({
  selector: 'app-game-product',
  templateUrl: './game-product.component.html',
  styleUrls: ['./game-product.component.sass'],
})
export class GameProductComponent {
  @Input() game!: VideoGame;
}
