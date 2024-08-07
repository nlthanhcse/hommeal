import {Meal} from "./meal.model";
import {MealPlan} from "./meal-plan.model";
import {Contact} from "./contact.model";

export interface Order {
  id: string;
  firstItemName: string;
  totalPrice: number;
  status: string;
  showDetails: boolean;
  paymentMethod: string;
  mealPlans: MealPlan[];
  meals: Meal[];
  contact: Contact;
}
