import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../Item";
import {ItemService} from "../item.service";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../customer.service";
import {Customer} from "../customer";
import {PurchaseDetail} from "../PurchaseDetail";
import {MessageService} from "../message.service";
import {Purchase} from "../purchase";
import {PurchaseService} from "../purchase.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  items: Item[] = []
  @Input() customer?: Customer;
  purchaseDetails: PurchaseDetail[] = [];

  constructor(
    private rout: ActivatedRoute,
    private itemService: ItemService,
    private customerService: CustomerService,
    private purchaseService: PurchaseService,
    private location: Location,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCustomer();
    this.getItems();
  }
  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }
  getCustomer(): void {
    const id = Number(this.rout.snapshot.paramMap.get('id'));
    this.customerService.getCustomer(id)
      .subscribe(customer => {
        this.customer = customer;
      });
  }
  save(id: number , quantityP: string): void {
    if (!this.customer) return;
    const quantityn = Number(quantityP);
    this.purchaseDetails.push(<PurchaseDetail>{itemId: id, quantity: quantityn});
    this.messageService.add(`your purchase has been added  now it is `
      + this.purchaseDetails.map(p => "* itemId: "+ p.itemId + " with quantity of:  " + p.quantity).join(". "));

  }
  confirm(): void {
    if (!this.customer || this.purchaseDetails.length == 0) {
      this.messageService.add("you must select at least one item to purchase");
      return
    }
    this.purchaseService.addPurchase(<Purchase>{customerId: this.customer.id, purchaseDetails: this.purchaseDetails})
      .subscribe(()=> this.goBack());
  }
  goBack(): void {
    this.location.back();
  }


}
