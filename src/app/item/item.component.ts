import { Component, OnInit } from '@angular/core';
import {Item} from "../Item";
import {ItemService} from "../item.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: Item[] = [] ;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }
  getItems(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }
  add(name: String, priceP: String, quantityP: String): void {
    name= name.trim();
    priceP= priceP.trim();
    quantityP= quantityP.trim();
    if (!name || !priceP || !quantityP) { return; }
   let price = Number(priceP)
   let quantity = Number(quantityP)
    this.itemService.addItem({name, price, quantity} as Item)
      .subscribe(item => this.items.push(item));
  }
  delete(item: Item): void {
    this.items = this.items.filter(i => i !== item);
    this.itemService.deleteItem(item.id).subscribe();
  }
  update(name: String, price: number, quantity: number): void {
    name= name.trim();
    if (!name || !price || !quantity) { return; }
    let item = {name, price, quantity} as Item;
    this.items = this.items.map(i => { return i.id === item.id ? item : i; });
    this.itemService.updateItem(item)
      .subscribe(item => this.items.push(item));
  }

}
