import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Item} from "./Item";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemUrl = 'http://localhost:8080/store/item/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    mode: 'allow'
  };

  constructor( private http: HttpClient, private message: MessageService) { }
  private log(message: string) {
    this.message.add(`ItemService: ${message}`);
  }
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUrl.concat('all'))
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(
          this.handleError<Item[]>('getItems', [])
        )
      );
  }
  getItem(id: number): Observable<Item> {
    const url = `${this.itemUrl}${id}`;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemUrl.concat('add'), item,this.httpOptions).pipe(
      tap((newItem: Item) => this.log(`added item w/ id=${newItem.id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }
  updateItem(item: Item): Observable<any> {
    return this.http.put<Item>(this.itemUrl.concat(item.id.toString()), item,this.httpOptions).pipe(
      tap(_ => this.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }
  deleteItem(id: number): Observable<Item> {
    const url = `${this.itemUrl}${id}`;
    return this.http.delete<Item>(url,this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
