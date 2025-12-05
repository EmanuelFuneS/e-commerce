import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.sass'],
})
export class ImgComponent {
  @Input() img: string = '';

  imageError: boolean = false;

  onImageError() {
    console.log('Image failed to load.');
    this.imageError = true;
  }
}
