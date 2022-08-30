import { Component, OnInit } from '@angular/core';
import {Customer} from "../customer";
import {CustomerService} from "../customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  mok_customers: Customer[] = [];



  constructor( private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers()
  }
  getCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => this.mok_customers = customers);
  }
  add(email: String, password: String){
    email= email.trim();
    password= password.trim();
    if (!email || !password) { return; }
    this.customerService.addCustomer({email, password} as Customer)
      .subscribe(customer => this.mok_customers.push(customer));
  }
  delete(customer: Customer): void {
    this.mok_customers = this.mok_customers.filter(c => c !== customer);
    this.customerService.deleteCustomer(customer.id).subscribe();
  }


}
