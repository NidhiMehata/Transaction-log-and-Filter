import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TransactionService } from '../shared/transaction.service';
import { Transaction } from '../shared/transaction.model';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  selectedFilter: number = 1;
  selectedOperator: number = 0;
  selectedAmount: number = 0;
  count: number = 0;
  sum: number = 0;
  numberUsers : number = 0;
  user : string[] = [];
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {    
    this.refreshTransactionList();
  }
  
  submit(form: NgForm) {
    this.transactionService.getFilteredAmount(2,this.selectedOperator,this.selectedAmount,0).subscribe((res) => {
      this.transactionService.transactions = res as Transaction[];
      this.count = this.transactionService.transactions.length;
      let i;
      this.sum = 0;
      this.user.length = 0;
      for(i = 0; i < this.count; i++){
        this.sum += this.transactionService.transactions[i]['amount'];
        this.user.push(this.transactionService.transactions[i]['name']);
      }
      this.numberUsers = this.user.filter((v,i,a) => a.indexOf(v) === i).length;
      form.reset();
    });
  }
  

  refreshTransactionList() {
    this.transactionService.getFilteredTransaction(2).subscribe((res) => {
      // this.refreshTransactionList();
      this.transactionService.transactions = res as Transaction[];
      this.count = this.transactionService.transactions.length;
      let i;
      this.sum = 0;
      this.user.length = 0;
      for(i = 0; i < this.count; i++){
        this.sum += this.transactionService.transactions[i]['amount'];
        this.user.push(this.transactionService.transactions[i]['name']);
      }
      this.numberUsers = this.user.filter((v,i,a) => a.indexOf(v) === i).length;
    });
  }

  onEdit(tran: Transaction) {
    this.transactionService.selectedTransaction = tran;
  }

}
