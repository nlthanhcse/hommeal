import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopMealPlansComponent } from './shop-meal-plans/shop-meal-plans.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop-meal-plans', component: ShopMealPlansComponent },
  { path: '**', redirectTo: '/home' } // Wildcard route for a 404 page
];
