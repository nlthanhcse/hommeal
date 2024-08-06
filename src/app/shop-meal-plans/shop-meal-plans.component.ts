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
import {Constant} from "../shared/constant";
import {ApplicationUtils} from "../shared/util";

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

  totalCalories = 0;
  searchQuery = '';
  foods: Food[] = [
    // Grains
    {
      id: "1",
      name: 'Rice',
      category: 'Grains',
      calories: 130,
      image: 'assets/images/food/rice.png',
      price: 15
    },
    {
      id: "2",
      name: 'Shirataki Noodles',
      category: 'Grains',
      calories: 20,
      image: 'assets/images/food/shirataki-noodles.png',
      price: 25
    },
    {
      id: "3",
      name: 'Vegetable Noodles',
      category: 'Grains',
      calories: 350,
      image: 'assets/images/food/vegetable-noodles.png',
      price: 20
    },
    {
      id: "4",
      name: 'Mashed Potato',
      category: 'Grains',
      calories: 130,
      image: 'assets/images/food/mashed-potato.png',
      price: 20
    },
    {
      id: "5",
      name: 'Brown Rice',
      category: 'Grains',
      calories: 130,
      image: 'assets/images/food/brown-rice.png',
      price: 20
    },

    // Veggies
    {
      id: "6",
      name: 'Oven-baked Vegetables',
      category: 'Veggies',
      calories: 151,
      image: 'assets/images/food/oven-baked-vegetables.png',
      price: 22 },
    {
      id: "7",
      name: 'Strawberry Burrata Salad',
      category: 'Veggies',
      calories: 115,
      image: 'assets/images/food/strawberry-burrata-salad.png',
      price: 25 },
    {
      id: "8",
      name: 'Vegetable Stir Fry',
      category: 'Veggies',
      calories: 160,
      image: 'assets/images/food/vegetable-stir-fry.png',
      price: 20 },
    {
      id: "9",
      name: 'Air Fry Potatoes',
      category: 'Veggies',
      calories: 160,
      image: 'assets/images/food/air-fry-potatoes.png',
      price: 20 },
    {
      id: "10",
      name: 'Boiled Broccoli',
      category: 'Veggies',
      calories: 80,
      image: 'assets/images/food/boiled-broccoli.png',
      price: 18 },
    {
      id: "11",
      name: 'Oyster Sauce Broccoli',
      category: 'Veggies',
      calories: 60,
      image: 'assets/images/food/oyster-sauce-broccoli.png',
      price: 20 },

    // Protein
    {
      id: "12",
      name: 'Salmon in Orange Sauce',
      category: 'Protein',
      calories: 206,
      image: 'assets/images/food/salmon-in-orange-sauce.png',
      price: 38 },
    {
      id: "13",
      name: 'Beef with Black Pepper Sauce',
      category: 'Protein',
      calories: 250,
      image: 'assets/images/food/beef-with-black-pepper-sauce.png',
      price: 38 },
    {
      id: "14",
      name: 'Baked Mushrooms Stuffed with Neat',
      category: 'Protein',
      calories: 266,
      image: 'assets/images/food/baked-mushrooms-stuffed-with-meat.png',
      price: 32 },
    {
      id: "15",
      name: 'Gochujang Grilled Mackerel',
      category: 'Protein',
      calories: 215,
      image: 'assets/images/food/gochujang-grilled-mackerel.png',
      price: 35 },
    {
      id: "16",
      name: 'Teriyaki chicken breast',
      category: 'Protein',
      calories: 188,
      image: 'assets/images/food/teriyaki-chicken-breast.png',
      price: 35 },
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

    Object.keys(this.selectedFoods).forEach(key => {
      this.selectedFoods[key] = null;
    });
    this.calculateTotalCalories();
  }

  notAllowAddToCart() {
    return Object.values(this.selectedFoods).filter(value => value !== null).length < Object.keys(this.selectedFoods).length;
  }

  onReject() {
    this.messageService.clear('confirm');
  }

  protected readonly Constant = Constant;
  protected readonly ApplicationUtils = ApplicationUtils;
}
