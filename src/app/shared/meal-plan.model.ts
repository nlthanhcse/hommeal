import {Food} from "./food.model";

export interface MealPlan {
  id: string;
  name: string;
  foods: Food[];
}
