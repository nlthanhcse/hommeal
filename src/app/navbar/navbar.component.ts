import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AppModalComponent} from "../app-modal/app-modal.component";
import {FoodService} from "../shared/food.service";
import {Food} from "../shared/food.model";
import {Order} from "../shared/order.model";
import { TableModule } from 'primeng/table';
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {Constant, OrderStatus} from "../shared/constant";
import {ApplicationUtils} from "../shared/util";
import {MealPlan} from "../shared/meal-plan.model";
import {MealService} from "../shared/meal.service";
import {Meal} from "../shared/meal.model";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AppModalComponent, TableModule, Button, DropdownModule, RadioButtonModule, FormsModule, ToastModule, DialogModule],
  providers: [MessageService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private foodService: FoodService, private mealService: MealService, private messageService: MessageService) {}

  userInitial = 'A'; // Placeholder for user initial, replace with actual data
  showUserDropdown = false;
  isCartOpen = false;
  selectedPaymentMethod: string | null = null;
  showOrdersModal = false;
  cartItemsCount = 0; // Placeholder for cart items count, replace with actual data
  selectedMealPlans: MealPlan[] = [];
  selectedMeals: Meal[] = [];
  totalPrice = 0
  orders: Order[] = [];
  paymentMethods: string[] = ["Cash", "Visa", "MasterCard"];

  ngOnInit(): void {
    this.foodService.foods$.subscribe(foods => {
      if (foods && foods.length > 0) {
        this.selectedMealPlans.push(
          {
            id: `${this.selectedMealPlans.length + 1}`,
            name: `Custom ${this.selectedMealPlans.length + 1}`,
            foods: foods
          }
        )
      }

      this.cartItemsCount = this.selectedMealPlans
        .map(value => value.foods)
        .flatMap(value => value)
        .length + this.selectedMeals.length;
    });

    this.mealService.meals$.subscribe(meals => {
      if (meals && meals.length > 0) {
        this.selectedMeals = meals;
      }

      this.cartItemsCount = this.selectedMeals.length + this.selectedMealPlans
        .map(value => value.foods)
        .flatMap(value => value)
        .length;
    });
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;

    this.totalPrice = this.calculateTotalPrice();
  }

  private calculateTotalPrice() {
    let mealPlansTotalPrice = this.selectedMealPlans.map(
      mealPlan => mealPlan.foods
    ).flatMap(value => value).reduce((acc, {price}) => acc + price, 0);

    let mealTotalPrice = this.selectedMeals.reduce((acc, {price}) => acc + price, 0);
    return mealPlansTotalPrice + mealTotalPrice;
  }

  pay() {
    if (this.selectedPaymentMethod) {
      this.orders.push(
        {
          id: `${this.orders.length + 1}`,
          firstItemName: "",
          showDetails: false,
          status: OrderStatus.PURCHASED,
          totalPrice: this.calculateTotalPrice(),
          paymentMethod: this.selectedPaymentMethod,
          mealPlans: this.selectedMealPlans,
          meals: this.selectedMeals
        }
      )

      this.reset();

      this.messageService.add({ key: 'confirm', severity: 'success', summary: '' });
    }
  }

  private reset() {
    this.mealService.setMeals([]);
    this.foodService.setFoods([]);
    this.selectedMealPlans = [];
    this.selectedMeals = [];
    this.cartItemsCount = 0;
    this.totalPrice = 0;
  }

  toggleOrders() {
    this.showOrdersModal = !this.showOrdersModal;
  }

  toggleOrderDetails(order: { showDetails: boolean; }) {
    order.showDetails = !order.showDetails;
  }

  openNotifications() {
    // Add notification logic here
  }

  onReject() {
    this.messageService.clear('confirm');
  }

  removeMealPlan(mealPlan: MealPlan): void {
    let index = this.selectedMealPlans.findIndex(value => value.id === mealPlan.id);
    if (index > -1) {
      this.selectedMealPlans.splice(index, 1);
    }

    this.totalPrice = this.calculateTotalPrice();
  }

  removeMeal(meal: Meal): void {
    let index = this.selectedMeals.findIndex(value => value.id === meal.id);
    if (index > -1) {
      this.selectedMeals.splice(index, 1);
    }

    this.totalPrice = this.calculateTotalPrice();
  }

  protected readonly ApplicationUtils = ApplicationUtils;
}
