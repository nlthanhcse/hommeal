import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppModalComponent} from "../app-modal/app-modal.component";
import {FoodService} from "../shared/food.service";
import {Order} from "../shared/order.model";
import {TableModule} from 'primeng/table';
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {MenuItem, MessageService} from "primeng/api";
import {OrderStatus} from "../shared/constant";
import {ApplicationUtils} from "../shared/util";
import {MealPlan} from "../shared/meal-plan.model";
import {MealService} from "../shared/meal.service";
import {Meal} from "../shared/meal.model";
import {DialogModule} from "primeng/dialog";
import {MenubarModule} from "primeng/menubar";
import {BadgeModule} from "primeng/badge";
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputTextModule} from "primeng/inputtext";
import {InputMaskModule} from "primeng/inputmask";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Contact} from "../shared/contact.model";
import {cloneDeep} from 'lodash-es';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AppModalComponent, TableModule, Button, DropdownModule, RadioButtonModule, FormsModule, ToastModule, DialogModule, MenubarModule, BadgeModule, AvatarModule, MenuModule, InputGroupModule, InputGroupAddonModule, InputTextModule, InputMaskModule, FloatLabelModule, InputTextareaModule],
  providers: [MessageService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private foodService: FoodService, private mealService: MealService, private messageService: MessageService) {}

  userInitial = 'A'; // Placeholder for user initial, replace with actual data
  isCartOpen = false;
  selectedPaymentMethod: string | null = null;
  showOrdersModal = false;
  cartItemsCount = 0; // Placeholder for cart items count, replace with actual data
  selectedMealPlans: MealPlan[] = [];
  selectedMeals: Meal[] = [];
  totalPrice = 0
  orders: Order[] = [];
  paymentMethods: string[] = ["Paypal", "Cash", "Visa", "MasterCard"];
  profileMenuItems: MenuItem[] | undefined;
  editShippingDetails: boolean = false;
  selectedShippingDetails: Contact = {
    id: '',
    name: '',
    phone: '',
    location: '',
    note: '',
  };

  contact: Contact = {
    id: '',
    name: '',
    phone: '',
    location: '',
    note: '',
  };

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

    this.profileMenuItems = [
      {
        items: [
          {
            label: 'Profile'
          },
          {
            label: 'Orders',
            command: () => this.toggleOrders()
          },
          {
            label: 'Logout'
          }
        ]
      }
    ];
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
      this.contact.id = uuidv4();

      if (this.inSufficientShippingDetails(this.contact)) {
        this.messageService.add({ key: 'toast-insufficient-shipping-details', severity: 'error', summary: 'Name, Phone, and Location are required for shipping.' });
        return;
      }

      this.orders.push(
        {
          id: `${this.orders.length + 1}`,
          firstItemName: "",
          showDetails: false,
          status: OrderStatus.PURCHASED,
          totalPrice: this.calculateTotalPrice(),
          paymentMethod: this.selectedPaymentMethod,
          mealPlans: this.selectedMealPlans,
          meals: this.selectedMeals,
          contact: this.contact
        }
      )

      this.reset();

      this.messageService.add({ key: 'toast-pay', severity: 'success', summary: 'You purchased the order successfully. Please check the progress in Orders.' });
    }
  }

  private reset() {
    this.mealService.setMeals([]);
    this.foodService.setFoods([]);
    this.selectedMealPlans = [];
    this.selectedMeals = [];
    this.cartItemsCount = 0;
    this.totalPrice = 0;
    this.selectedPaymentMethod = '';

    this.contact = {
      id: '',
      name: '',
      phone: '',
      location: '',
      note: '',
    };
  }

  toggleOrders() {
    this.showOrdersModal = !this.showOrdersModal;
  }

  toggleOrderDetails(order: { showDetails: boolean; }) {
    order.showDetails = !order.showDetails;
  }

  onReject() {
    this.messageService.clear('confirm');
  }

  removeMealPlan(mealPlan: MealPlan): void {
    let index = this.selectedMealPlans.findIndex(value => value.id === mealPlan.id);
    if (index > -1) {
      this.selectedMealPlans.splice(index, 1);
    }

    this.reCalculateAfterRemove();
  }

  private reCalculateAfterRemove() {
    this.totalPrice = this.calculateTotalPrice();
    this.cartItemsCount = this.selectedMeals.length + this.selectedMealPlans
      .map(value => value.foods)
      .flatMap(value => value)
      .length;

    if (this.selectedMealPlans.length == 0 && this.selectedMeals.length == 0) {
      this.selectedPaymentMethod = '';
    }
  }

  removeMeal(meal: Meal): void {
    let index = this.selectedMeals.findIndex(value => value.id === meal.id);
    if (index > -1) {
      this.selectedMeals.splice(index, 1);
    }

    this.reCalculateAfterRemove();
  }

  cancelEditShippingDetails() {
    this.selectedShippingDetails = {
      id: '',
      name: '',
      phone: '',
      location: '',
      note: '',
    };
    this.editShippingDetails = false;
  }

  openEditShippingDetails(shippingDetails: Contact): void {
    this.selectedShippingDetails = cloneDeep(shippingDetails);
    this.editShippingDetails = true;
  }

  saveShippingDetails(order: Order): void {
    if (this.inSufficientShippingDetails(this.selectedShippingDetails)) {
      this.messageService.add({ key: 'toast-insufficient-shipping-details', severity: 'error', summary: 'Name, Phone, and Location are required for shipping.' });
      return;
    }

    let index = this.orders.findIndex(value => value.contact.id === this.selectedShippingDetails.id);

    if (index > -1) {
      this.orders[index].contact = cloneDeep(this.selectedShippingDetails);
    }

    this.selectedShippingDetails = {
      id: '',
      name: '',
      phone: '',
      location: '',
      note: '',
    };
    this.editShippingDetails = false;
  }

  inSufficientShippingDetails(contact: Contact): boolean {
    return !contact.name.trim().length || !contact.phone.trim().length || !contact.location.trim().length;
  }

  protected readonly ApplicationUtils = ApplicationUtils;
}
