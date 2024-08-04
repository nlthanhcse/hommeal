// food.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Food} from "./food.model";

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodSubject = new BehaviorSubject<Food[]>([]);
  foods$ = this.foodSubject.asObservable();

  setFoods(foods: Food[]): void {
    this.foodSubject.next(foods);
  }
}
