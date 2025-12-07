import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameProductsComponent } from './game-products.component';

describe('GameProductsComponent', () => {
  let component: GameProductsComponent;
  let fixture: ComponentFixture<GameProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameProductsComponent]
    });
    fixture = TestBed.createComponent(GameProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
