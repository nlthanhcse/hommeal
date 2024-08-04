import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMealPlansComponent } from './shop-meal-plans.component';

describe('ShopMealPlansComponent', () => {
  let component: ShopMealPlansComponent;
  let fixture: ComponentFixture<ShopMealPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopMealPlansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopMealPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
