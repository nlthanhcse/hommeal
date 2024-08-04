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
    { name: 'Brown Rice', category: 'Grains', calories: 216, image: 'https://c1.wallpaperflare.com/preview/147/504/1015/rice-spoon-spoon-rice-eat.jpg', price: 11 },
    { name: 'Quinoa', category: 'Grains', calories: 120, image: 'https://c4.wallpaperflare.com/wallpaper/925/35/581/food-quinoa-hd-wallpaper-preview.jpg', price: 24 },
    { name: 'Oats', category: 'Grains', calories: 71, image: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/03/oats-701299_1920-768x562.jpg', price: 35 },
    { name: 'Barley', category: 'Grains', calories: 123, image: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/6159/ff717f2b-8a5b-4862-a65f-25b59e3f57b8.jpg', price: 22 },

    // Veggies
    { name: 'Broccoli', category: 'Veggies', calories: 55, image: 'https://c1.wallpaperflare.com/preview/1006/685/277/appetite-broccoli-brocoli-broccolli-calories.jpg', price: 47 },
    { name: 'Spinach', category: 'Veggies', calories: 23, image: 'https://c1.wallpaperflare.com/preview/158/999/779/bowl-green-healthy-leaf.jpg', price: 20 },
    { name: 'Carrots', category: 'Veggies', calories: 41, image: 'https://c1.wallpaperflare.com/preview/104/183/748/carrots-vegetables-harvest-healthy.jpg', price: 10 },
    { name: 'Bell Peppers', category: 'Veggies', calories: 20, image: 'https://c1.wallpaperflare.com/preview/654/599/746/food-cook-spice-ingredients.jpg', price: 15 },

    // Protein
    { name: 'Chicken Breast', category: 'Protein', calories: 165, image: 'https://c4.wallpaperflare.com/wallpaper/546/288/916/chicken-chicken-breast-food-healthy-eating-wallpaper-preview.jpg', price: 5 },
    { name: 'Salmon', category: 'Protein', calories: 206, image: 'https://c1.wallpaperflare.com/preview/180/267/642/fillet-food-foodie-grilled.jpg', price: 31 },
    { name: 'Tofu', category: 'Protein', calories: 76, image: 'https://c1.wallpaperflare.com/preview/668/495/832/slice-the-tofu-cut-a-part-conveyance-tofu-korean.jpg', price: 45 },
    { name: 'Eggs', category: 'Protein', calories: 155, image: 'https://c1.wallpaperflare.com/preview/161/255/755/egg-chicken-food-white.jpg', price: 50 }
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
