import {Food} from "./food.model";
import {Meal} from "./meal.model";
import {MealPlan} from "./meal-plan.model";

export interface Order {
  id: string;
  firstItemName: string;
  totalPrice: number;
  status: string;
  showDetails: boolean;
  paymentMethod: string;
  mealPlans: MealPlan[];
  meals: Meal[];
}
