import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.sass'],
})
export class ImgComponent {
  @Input() img: string = '';
}
