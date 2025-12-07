import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameProductComponent } from './components/game-product/game-product.component';
import { ImgComponent } from './components/img/img.component';
import { GameProductsComponent } from './components/game-products/game-products.component';

@NgModule({
  declarations: [AppComponent, ImgComponent, GameProductComponent, GameProductsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
