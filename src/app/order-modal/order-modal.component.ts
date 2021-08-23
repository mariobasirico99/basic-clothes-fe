import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { OrdersService } from '../_services/orders.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit {
  public loading = false;
  constructor(
    private orderService : OrdersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialog,
  ) { }
  reso(){
    this.loading=true
      this.orderService.reso(this.data.order).pipe(first()).subscribe({
        next: () => {
          this.loading = false
          this.dialogRef.closeAll();
        },
        error: () => {
          this.loading = false
          alert("Errore con l'invio del Reso")
        },
      });
  }
  ngOnInit(): void {
  }

}
