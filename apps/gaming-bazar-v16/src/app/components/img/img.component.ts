import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.sass'],
})
export class ImgComponent {
  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault: string = './assets/images/default.png';
  imageError: boolean = false;

  onImageError() {
    console.log('Image failed to load.');
    this.imageError = true;
  }

  onImageLoad() {
    console.log('Image loaded successfully.');
    this.loaded.emit(this.img);
  }
}
