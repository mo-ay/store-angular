import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../customer.service";
import {Location} from "@angular/common";
import {Purchase} from "../purchase";
import {PurchaseService} from "../purchase.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  @Input() customer?: Customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private purchaseService: PurchaseService,
    private location: Location) { }

  ngOnInit(): void {
    this.getCustomer()
  }
  getCustomer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.customerService.getCustomer(id)
      .subscribe(customer => {
        this.customer = customer;
      });
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (!this.customer) return;
    this.customerService.updateCustomer(this.customer)
      .subscribe(() => this.goBack());
  }
  deletePurchase(purchase: Purchase): void {
    if (this.customer?.purchases) {
      this.customer.purchases = this.customer.purchases.filter(p => p !== purchase);
      this.purchaseService.deletePurchase(purchase.id)
        .subscribe(() => this.purchaseService.log("purchase deleted: " + purchase.id));
    }else{
      this.purchaseService.log("No purchases to delete form customer" + purchase);
    }

  }


}
