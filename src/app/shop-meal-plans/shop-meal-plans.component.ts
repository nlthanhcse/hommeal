import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Food} from "../shared/food.model";
import {FoodService} from "../shared/food.service";
import {AppModalComponent} from "../app-modal/app-modal.component";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {ChipModule} from "primeng/chip";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {AvatarModule} from "primeng/avatar";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-shop-meal-plans',
  standalone: true,
  imports: [CommonModule, FormsModule, AppModalComponent, IconFieldModule, InputIconModule, InputTextModule, ChipModule, CardModule, Button, TagModule, ToastModule, AvatarModule],
  templateUrl: './shop-meal-plans.component.html',
  styleUrls: ['./shop-meal-plans.component.css'],
  providers: [MessageService]
})
export class ShopMealPlansComponent {
  constructor(private foodService: FoodService, private messageService: MessageService) {}

  orderCreated: boolean = false;
  totalCalories = 0;
  searchQuery = '';
  foods: Food[] = [
    // Grains
    { name: 'Rice', category: 'Grains', calories: 130, image: 'assets/images/food/rice.png', price: 11 },
    { name: 'Vegetable Noodles', category: 'Grains', calories: 20, image: 'assets/images/food/vegetable-noodles.png', price: 24 },
    { name: 'Shirataki Noodles', category: 'Grains', calories: 350, image: 'assets/images/food/shirataki-noodles.png', price: 35 },
    { name: 'Mashed Potato', category: 'Grains', calories: 130, image: 'assets/images/food/mashed-potato.png', price: 22 },

    // Veggies
    { name: 'Oven-baked Vegetables', category: 'Veggies', calories: 151, image: 'assets/images/food/oven-baked-vegetables.png', price: 47 },
    { name: 'Strawberry Burrata Salad', category: 'Veggies', calories: 115, image: 'assets/images/food/strawberry-burrata-salad.png', price: 20 },
    { name: 'Vegetable Stir Fry', category: 'Veggies', calories: 160, image: 'assets/images/food/vegetable-stir-fry.png', price: 10 },

    // Protein
    { name: 'Salmon in Orange Sauce', category: 'Protein', calories: 206, image: 'assets/images/food/salmon-in-orange-sauce.png', price: 5 },
    { name: 'Beef with Black Pepper Sauce', category: 'Protein', calories: 250, image: 'assets/images/food/beef-with-black-pepper-sauce.png', price: 31 },
    { name: 'Baked Mushrooms Stuffed with Neat', category: 'Protein', calories: 266, image: 'assets/images/food/baked-mushrooms-stuffed-with-meat.png', price: 45 },
    { name: 'Gochujang Grilled Mackerel', category: 'Protein', calories: 215, image: 'assets/images/food/gochujang-grilled-mackerel.png', price: 50 }
  ];
  filteredFoods = this.foods;
  selectedFoods: { [key: string]: Food | null } = {
    Grains: null,
    Veggies: null,
    Protein: null
  };

  searchFoods() {
    this.filteredFoods = this.foods.filter(food =>
      food.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  filterByCategory(category: string) {
    this.filteredFoods = this.foods.filter(food => food.category === category);
  }

  selectFood(food: Food) {
    this.selectedFoods[food.category] = food;
    this.calculateTotalCalories();
  }

  calculateTotalCalories() {
    this.totalCalories = Object.values(this.selectedFoods).reduce((sum, food) => sum + (food ? food.calories : 0), 0);
  }

  orderMeal() {
    this.foodService.setFoods(Object.values(this.selectedFoods).filter(value => value !== null));
    this.messageService.add({ key: 'confirm', severity: 'success', summary: 'Your order is created. ' +
        'Please check your shopping cart for purchasing.' });
  }

  onReject() {
    this.messageService.clear('confirm');
    this.orderCreated = false;
  }
}
