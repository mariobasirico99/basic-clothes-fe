import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../_services/orders.service';

@Component({
  selector: 'app-confirm-purchase',
  templateUrl: './confirm-purchase.component.html',
  styleUrls: ['./confirm-purchase.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
}]
})
export class ConfirmPurchaseComponent implements OnInit {
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  info=false;
  user :any;
  paramsObject:any;
  constructor(private _formBuilder: FormBuilder,
    private ordersService : OrdersService,
    private route: ActivatedRoute) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        console.log(params);
    });
      this.firstFormGroup = this._formBuilder.group({
          nome: [this.user.username],
          indirizzo: [this.user.indirizzo],
          cap: [this.user.cap],
          city: [this.user.city],
      });
      this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['contanti']
      });
  }
  changeInfoSaved(){
      this.info= false;
      this.firstFormGroup = this._formBuilder.group({
        nome: [this.user.username],
        indirizzo: [this.user.indirizzo],
        cap: [this.user.cap],
        city: [this.user.city],
    });
      console.log("saved")
  }
  changeInfoInsert(){
    this.info= true;
    this.firstFormGroup = this._formBuilder.group({
        nome: ["", Validators.required],
        indirizzo: ["", Validators.required],
        cap: ["", Validators.required],
        city: ["", Validators.required],
    });
    console.log("insert")
  }
  confirmPurchase() {
      if(this.info){

      }
      else{

      }
  }

}
