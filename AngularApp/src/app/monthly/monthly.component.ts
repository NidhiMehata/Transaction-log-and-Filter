import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TransactionService } from '../shared/transaction.service';
import { Transaction } from '../shared/transaction.model';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css']
})
export class MonthlyComponent implements OnInit {
  selectedMonth: number = 4;
  selectedFilter: number = 1;
  selectedOperator: number = 0;
  selectedAmount: number = 0;
  temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  monthlyCount = [0, 0, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0];
  count: number = 0;
  sum: number = 0;
  loaded = false;
  numberUsers : number = 0;
  user : string[] = [];

  barChartOptions = {
    scaleShowVerticalLines: false,
    maintainAspectRatio : false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              callback: function (value) { if (Number.isInteger(value)) { return value; } },
              maxTicksLimit : 10,
              stepSize: 1,
              gridLines: {              
                  offsetGridLines: true,
                  scaleStepWidth: 5
              },
              barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 8,
              minBarLength: 2,
          }
      }]
    
  }
  };
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    {data: this.monthlyCount, label: 'Number of users',backgroundColor: [
      'burlywood','lightblue','bisque','lightgreen']},
  ];
  barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  ngOnChange() {
    this.plotgraph();
  }

  ngOnInit() {
    // this.resetForm();
    this.refreshTransactionList();
    this.monthlyCount.length = 0;
    this.user.length = 0;
    this.numberUsers = 0;
    let w = this.plotgraph();
    this.loaded = true;
  }

  constructor(private transactionService: TransactionService) { }

  submit(form: NgForm) {
    this.transactionService.getFilteredAmount(4, this.selectedOperator,this.selectedAmount,this.selectedMonth).subscribe((res) => {
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
  changeMonth(event: any) {
    this.selectedMonth = event.target.value;
    this.transactionService.getMonthlyTransaction(this.selectedMonth).subscribe((res) => {
      this.transactionService.transactions = res as Transaction[];
      this.count = this.transactionService.transactions.length;
      let i;
      this.sum = 0;
      this.user.length = 0;
      for (i = 0; i < this.count; i++){
        this.sum += this.transactionService.transactions[i]['amount'];
        this.user.push(this.transactionService.transactions[i]['name']);
      }
      this.numberUsers = this.user.filter((v,i,a) => a.indexOf(v) === i).length;
    });
  }

  refreshTransactionList() {
    this.transactionService.getFilteredTransaction(4).subscribe((res) => {
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

  plotgraph() {
    this.transactionService.plotgraph().subscribe((res) => {
      let total = res['length'], i;
      
      for(i = 0; i < total; i++){
        this.temp[res[i]['_id'] - 1] = res[i]['count'];
      }

      for(i = 0; i < 12; i++){
        if(this.temp[i] != 0){
          this.monthlyCount.push(this.temp[i]);
        }else{
          this.monthlyCount.push(0);
        }
      }
      
    });
    return 0;
  }

}


