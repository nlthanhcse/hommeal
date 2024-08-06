import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Meal} from "../shared/meal.model";
import {MealService} from "../shared/meal.service";
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {ApplicationUtils} from "../shared/util";
import {Button} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-order-meals',
  standalone: true,
  imports: [CommonModule, CarouselModule, TagModule, Button, ToastModule],
  templateUrl: './order-meals.component.html',
  styleUrls: ['./order-meals.component.css'],
  providers: [MessageService]
})
export class OrderMealsComponent implements OnInit {
  constructor(private mealService: MealService, private messageService: MessageService) {
  }

  responsiveOptions: any[] | undefined;

  meals: Meal[] = [
    // Add dummy meal data
    {
      id: "1",
      image: 'assets/images/meal/spicy-salmon-salad-rice-bowl.png',
      name: 'Spicy salmon salad rice bowl',
      description: 'It\'s the ultimate high-protein lunch with stir-fried salmon with special spicy sauce served with white rice and baked zucchini',
      tags: [],
      price: 59
    },
    {
      id: "2",
      image: 'assets/images/meal/szechuan-tofu-with-black-bean-bowl.png',
      name: 'Szechuan tofu with Black bean bowl',
      description: 'Soft, rich tofu with spicy chipotle black beans transform this vegetarian rice bowl into a verified flavor bomb! Perfect for any meal of the day',
      tags: ['vegan'],
      price: 59
    },
    {
      id: "3",
      image: 'assets/images/meal/shrimp-fajita-bowl.png',
      name: 'Shrimp Fajita bowl',
      description: 'These Mexican-inspired shrimp fajita bowls are filled with juicy shrimp, peppers, and onions, with avocado and salsa served over cilantro-lime rice. A family favorite!',
      tags: [],
      price: 59
    },
    {
      id: "4",
      image: 'assets/images/meal/honey-sriracha-roasted-salmon-rice-bowl.jpg',
      name: 'Honey Sriracha Roasted Salmon Rice Bowl',
      description: 'Sweet-spicy roasted salmon tossed in a honey sriracha glaze, served over a bed of fluffy rice. Topped with ours creamy avocado and cucumber, it\'s a tasty meal in one!',
      tags: [],
      price: 59
    },
    {
      id: "5",
      image: 'assets/images/meal/spicy-gochujang-tofu-bowl.png',
      name: 'Spicy Gochujang Tofu Bowl',
      description: 'These Korean-style gochujang tofu bowls are packed with plant-based protein, made with rice topped with spicy crumbled tofu, crunchy vegetables, and a squeeze of lime) - (Vegan, Gluten-Free',
      tags: [],
      price: 59
    },
    {
      id: "6",
      image: 'assets/images/meal/chicken-taco-poblano-rice-bowl.png',
      name: 'Chicken Taco Poblano Rice Bowl',
      description: 'Mild poblano peppers make a mouthwatering, smoky addition to these flavor-packed chicken taco bowls. Prepare ahead for delicious lunches all week!',
      tags: [],
      price: 59
    },
    {
      id: "7",
      image: 'assets/images/meal/spicy-sriracha-tofu-rice-bowl.png',
      name: 'Spicy Sriracha Tofu Rice Bowl',
      description: 'Looking for a new meatless meal to bring into regular rotation? Look no further than these spicy sriracha tofu bowls packed with flavor, easy to eat, and ready in no time',
      tags: ['vegan'],
      price: 59
    },
    {
      id: "8",
      image: 'assets/images/meal/korean-beef-bowl.png',
      name: 'Korean Beef Bowl',
      description: 'Flavorful Korean beef served over perfectly-cooked rice is healthy meal idea, with under 400 calories per serving. And don\'t worry, it still has TONS of flavor!',
      tags: [],
      price: 59
    },
    {
      id: "9",
      image: 'assets/images/meal/air-fryer-asian-meatball-bowl.png',
      name: 'Air Fryer Asian Meatball Bowl',
      description: 'Made with ground pork, rice and beans is a healthy dinner or lunch, perfect for meal prep!',
      tags: ['vegan'],
      price: 59
    },
  ];
  mealsPerPage = 10;
  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  addToCart(meal: any) {
    let meals = this.mealService.getMeals();

    meals.push(meal);
    this.mealService.setMeals(meals);

    this.messageService.add({ key: 'confirm', severity: 'success', summary: 'Added to cart.' +
        'Please check your shopping cart for purchasing.' });
  }

  mealExists(meal: any) {
    let meals = this.mealService.getMeals();
    return meals.find(meal => meal.id !== meal.id);
  }

  onReject() {
    this.messageService.clear('confirm');
  }

  protected readonly ApplicationUtils = ApplicationUtils;
}
