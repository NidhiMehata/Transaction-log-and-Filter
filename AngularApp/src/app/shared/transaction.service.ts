import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Transaction } from './transaction.model';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class TransactionService {
  selectedTransaction: Transaction;
  transactions: Transaction[];
  sum : number = 0;
  count : number = 0;
  readonly baseURL = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) { }

  postTransaction(tran: Transaction) {
    return this.http.post(this.baseURL, tran);
  }

  getTransactionList() {
    return this.http.get(this.baseURL)._catch(this.errorHandler);
  }

  putTransaction(tran: Transaction) {
    return this.http.put(this.baseURL + `/${tran._id}`,tran);
  }

  deleteTransaction(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  getFilteredTransaction(filter : number){
    return this.http.get(this.baseURL + '/getFiltered' + `/${filter}`)._catch(this.errorHandler);
  }

  getFilteredAmount(filter: number, op: number, Amount: number, Month: number) {
    return this.http.get(this.baseURL + '/getAmount' + `/${filter}/${op}/${Amount}/${Month}`);
  }

  getMonthlyTransaction(month: number) {
    return this.http.get(this.baseURL + '/getMonthly' + `/${month}`);
  }

  plotgraph() {
    return this.http.get(this.baseURL + '/plotgraph');
  }

  errorHandler(error: HttpErrorResponse){
  
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      alert('Please check whether you are connected to the internet or there might be a problem with the server')

    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      alert('Cannot connect to MongoDb');
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}