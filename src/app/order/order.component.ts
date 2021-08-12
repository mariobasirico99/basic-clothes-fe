import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { OrdersService } from '../_services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = [
    'Mittente',
    'Destinatario',
    'Articolo',
    'Stato',
    'action',
  ];
  dataSource: any;
  loading = false;
  
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(
    private orderService : OrdersService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.onOrdersLoading();
  }

  onOrdersLoading() {
    this.loading = true;
    this.dataSource = null;

    this.orderService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response);
        this.loading = false;
      });
  }

  onOrderReso(id: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '200px';
    dialogConfig.width = '400px';
    dialogConfig.data = { order: id };
    const dialogRef = this.matDialog.open(OrderModalComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.onOrdersLoading();
    });    
  }
  onOrderFeedBack(id: number,username: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = { mittente: id, username: username};
    const dialogRef = this.matDialog.open(FeedbackModalComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.onOrdersLoading();
    }); 
       
  }
}
