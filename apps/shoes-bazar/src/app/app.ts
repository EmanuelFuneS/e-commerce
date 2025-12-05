import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Img } from './components/img/img';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Img],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  protected readonly title = signal('shoes-bazar');
}
