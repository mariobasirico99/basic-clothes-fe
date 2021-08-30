import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { OrdersService } from '../_services/orders.service';

@Component({
  selector: 'app-vendite',
  templateUrl: './vendite.component.html',
  styleUrls: ['./vendite.component.css']
})
export class VenditeComponent implements OnInit {

  displayedColumns: string[] = [
    'Mittente',
    'Destinatario',
    'Articolo',
    'Stato',
    'Pagamento'
  ];
  dataSource: any;
  loading = false;
  public user:any;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(
    private orderService : OrdersService,
    public matDialog: MatDialog
  ) { 
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit(): void {
    this.onOrdersLoading();
  }

  onOrdersLoading() {
    this.loading = true;
    this.dataSource = null;
      this.orderService
      .getByIdMitt(this.user.userId)
      .pipe(first())
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response);
        this.loading = false;
      });
  }
}
