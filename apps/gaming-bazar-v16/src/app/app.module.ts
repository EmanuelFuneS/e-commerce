import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { GameProductComponent } from './components/game-product/game-product.component';
import { GameProductsComponent } from './components/game-products/game-products.component';
import { ImgComponent } from './components/img/img.component';
import { NavComponent } from './components/nav/nav.component';
import { VideogamesService } from './services/videogames.service';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    GameProductComponent,
    GameProductsComponent,
    NavComponent,
    FooterComponent,
    GameDetailComponent,
    LandingComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [VideogamesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
