import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../Item";
import {ItemService} from "../item.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  @Input() item?: Item;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.getItem()
  }
  getItem(){
    const id = Number (this.route.snapshot.paramMap.get('id'))
    this.itemService.getItem(id)
      .subscribe(item => this.item= item)
  }
  goBack(): void {
    this.location.back();
  }
  save(): void{
    if (!this.item) return;
    this.itemService.updateItem(this.item)
      .subscribe(()=> this.goBack())
  }

}
