// meal.service.ts
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Meal} from "./meal.model";

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private mealSubject = new BehaviorSubject<Meal[]>([]);
  meals$ = this.mealSubject.asObservable();

  setMeals(meals: Meal[]): void {
    this.mealSubject.next(meals);
  }

  getMeals(): Meal[] {
    return this.mealSubject.getValue();
  }
}
