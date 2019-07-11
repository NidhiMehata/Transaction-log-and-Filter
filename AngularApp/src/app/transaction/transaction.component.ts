
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TransactionService } from '../shared/transaction.service';
import { Transaction } from '../shared/transaction.model';

declare var M: any;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [TransactionService]
})

export class TransactionComponent implements OnInit {
  selectedFilter: number = 1;
  selectedOperator : number = 0;
  selectedAmount : number = 0;
  count : number = 0;
  sum : number = 0;
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.refreshTransactionList();

  }
  selectChangeHandler (event: any) {
    this.selectedFilter = event.target.value;
  }

  changeFilter(event : any){
    this.selectedFilter = event.target.value;
    this.transactionService.getFilteredTransaction(this.selectedFilter).subscribe((res) => {
      this.transactionService.transactions = res as Transaction[];
      this.count = this.transactionService.transactions.length;
      let i;
      this.sum = 0;
      for(i = 0; i < this.count; i++){
        this.sum += this.transactionService.transactions[i]['amount'];
      }
    });
  }

  submit(form: NgForm) {
    this.transactionService.getFilteredAmount(4,this.selectedOperator,this.selectedAmount,0).subscribe((res) => {
      // this.refreshTransactionList();
      this.transactionService.transactions = res as Transaction[];
      this.count = this.transactionService.transactions.length;
      let i;
      this.sum = 0;
      for(i = 0; i < this.count; i++){
        this.sum += this.transactionService.transactions[i]['amount'];
      }
      form.reset();
    });
  }

  refreshTransactionList() {
    this.transactionService.getTransactionList().subscribe((res) => {
      this.transactionService.transactions = res as Transaction[];
      this.count = this.transactionService.transactions.length;
      let i;
      this.sum = 0;
      for(i = 0; i < this.count; i++){
        this.sum += this.transactionService.transactions[i]['amount'];
      }
    });
  }

  onEdit(tran: Transaction) {
    this.transactionService.selectedTransaction = tran;
  }
}
