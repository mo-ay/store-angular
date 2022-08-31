import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Purchase} from "./purchase";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private purchaseUrl = 'http://localhost:8080/store/purchases/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private http: HttpClient, private message: MessageService) { }
   log(message: string) {
    this.message.add(`PurchaseService: ${message}`);
  }
  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.purchaseUrl.concat('all'))
      .pipe(
        tap(_ => this.log('fetched purchases')),
        catchError(
          this.handleError<Purchase[]>('getPurchases', [])
        )
      );
  }
  getPurchase(id: number): Observable<Purchase> {
    const url = `${this.purchaseUrl}${id}`;
    return this.http.get<Purchase>(url).pipe(
      tap(_ => this.log(`fetched purchase id=${id}`)),
      catchError(this.handleError<Purchase>(`getPurchase id=${id}`))
    );
  }
  addPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.purchaseUrl.concat('add'), purchase,this.httpOptions).pipe(
      tap((newPurchase: Purchase) => this.log(`added purchase w/ id=${newPurchase.id}`)),
      catchError(this.handleError<Purchase>('addPurchase'))
    );
  }
  deletePurchase(id: number): Observable<Purchase> {
    const url = `${this.purchaseUrl}${id}`;
    return this.http.delete<Purchase>(url,this.httpOptions).pipe(
      tap(_ => this.log(`deleted purchase id=${id}`)),
      catchError(this.handleError<Purchase>('deletePurchase'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
