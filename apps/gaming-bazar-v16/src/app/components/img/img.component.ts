import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.sass'],
})
export class ImgComponent implements OnChanges, OnInit {
  img: string = '';

  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
  }
  @Output() loaded = new EventEmitter<string>();
  imgDefault: string = './assets/images/default.png';
  imageError: boolean = false;

  counter: number = 0;
  //counterFn: number | undefined;

  onImageError() {
    console.log('Image failed to load.');
    this.imageError = true;
  }

  onImageLoad() {
    console.log('Image loaded successfully.');
    this.loaded.emit(this.img);
  }

  //LIFE CYCLE HOOKS
  //before render
  constructor() {
    // not run asynchronous code
    //this run once time
    console.log('Constructor: ImgComponent created');
  }
  //before and during render
  ngOnChanges(changes: SimpleChanges) {
    //run when input properties change every time property change
    console.log('ngOnChanges: ImgComponent input properties changed');
    /* this.counterFn = window.setInterval(() => {
      this.counter += 1;
      //console.log('Counter: ', this.counter);
    }, 1000); */
    console.log(changes);
  }
  //after render
  ngOnInit() {
    // run asynchronous code
    // run once time after component created
    console.log('ngOnInit: ImgComponent initialized');
  }
  //after render and child components
  ngAfterViewInit() {
    // run after the component's view (and child views) has been initialized
    console.log('ngAfterViewInit: ImgComponent view initialized');
  }
  //on destroy
  ngOnDestroy() {
    // cleanup just before Angular destroys the component
    console.log('ngOnDestroy: ImgComponent about to be destroyed');
    // window.clearInterval(this.counterFn);
  }
}
