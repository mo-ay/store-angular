import { Injectable } from '@angular/core';
import {Customer} from "./customer";
import {MOK_CUSTOMER} from "./mok-customer";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersUrl = 'http://localhost:8080/store/customer/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }
  private log(message: string) {
    this.messageService.add(`CustomerService: ${message}`);
  }

  /**
   * Get All Customers
   * @returns {Observable<Customer[]>}
   */

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl.concat('all'))
      .pipe(
        tap(_ => this.log('fetched customers')),
        catchError(
        this.handleError<Customer[]>('getCustomers', [])
        )
      );
  }

  /**
   * GET customer by id. Will 404 if id not found
   * @param id
   * @returns {Observable<Customer>}
   */
  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }

  /**
   * Post: Add a new customer
   * @param customer
   */
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl.concat('add'), customer,this.httpOptions).pipe(
      tap((newCustomer: Customer) => this.log(`added customer w/ id=${newCustomer.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  /**
   * Put: update the customer on the server
   * @param customer
   * @returns {Observable<any>}
   */
  updateCustomer(customer: Customer): Observable<any> {
    return this.http.put(this.customersUrl.concat(customer.id.toString()), customer,this.httpOptions).pipe(
      tap(_ => this.log(`updated customer id=${customer.id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  deleteCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}${id}`;
    return this.http.delete<Customer>(url,this.httpOptions)
      .pipe(
      tap(_ => this.log(`deleted customer id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @returns {Observable<any>}
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
