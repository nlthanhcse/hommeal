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

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AppModalComponent, TableModule, Button, DropdownModule, RadioButtonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private foodService: FoodService) {}

  userInitial = 'A'; // Placeholder for user initial, replace with actual data
  showUserDropdown = false;
  isCartOpen = false;
  selectedPaymentMethod: string | null = null;
  showOrderModal = false;
  showOrdersModal = false;
  cartItemsCount = 0; // Placeholder for cart items count, replace with actual data
  selectedFoods: Food[] = [];
  totalPrice = 0
  orders:Order[] = [];
  paymentMethods: string[] = ["Cash", "Visa", "MasterCard"];

  ngOnInit(): void {
    this.foodService.foods$.subscribe(foods => {
      this.selectedFoods = foods;
      this.cartItemsCount = foods.length;
    });
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    this.totalPrice = this.selectedFoods.reduce((acc, {price}) => acc + price, 0);
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  pay() {
    if (this.selectedPaymentMethod) {
      let firstFood: Food | null | undefined = this.selectedFoods.at(0)
      this.orders.push(
        {
          firstItemName: firstFood ? firstFood.name : "",
          showDetails: false,
          status: "Purchased",
          totalPrice: this.selectedFoods.reduce((acc, {price}) => acc + price, 0),
          items: this.selectedFoods
        }
      )

      this.selectedFoods = [];
      this.cartItemsCount = this.selectedFoods.length;
      this.totalPrice = this.selectedFoods.reduce((acc, {price}) => acc + price, 0);

      this.showOrderModal = true;
      setTimeout(() => this.showOrderModal = false, 3000); // Automatically close after 3 seconds
    }
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
}
