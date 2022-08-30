import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerComponent} from "./customer/customer.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CustomerDetailsComponent} from "./customer-details/customer-details.component";
import {ItemComponent} from "./item/item.component";
import {ItemDetailsComponent} from "./item-details/item-details.component";
import {PurchaseComponent} from "./purchase/purchase.component";

const routes: Routes = [
  {path : '', redirectTo : '/dashboard', pathMatch : 'full'},
  {path : 'customer', component : CustomerComponent},
  {path : 'item', component : ItemComponent},
  {path:'dashboard', component : DashboardComponent},
  {path : 'purchase/:id', component : PurchaseComponent},
  { path: 'detail/:id', component: CustomerDetailsComponent },
  {path: 'item/detail/:id', component:ItemDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
