import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Path } from '../_models/path';
import { ArticleService } from '../_services/article.service';
import { OrdersService } from '../_services/orders.service';
import { PaymentService } from '../_services/payment.service';
import { UserService } from '../_services/user.service';

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
  payForm: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  info=false;
  user :any;
  loading= false;
  card=false;
  iduser : number = 0;
  idart : any;
  idmit : any;
  paramsObject:any;
  constructor(private _formBuilder: FormBuilder,
    private ordersService : OrdersService,
    private articleService : ArticleService,
    private router : Router,
    private paymentService : PaymentService,
    private userService : UserService,
    private route: ActivatedRoute) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.iduser = this.user.userId;
      this.userService
        .getById(this.iduser)
        .pipe()
        .subscribe((response) => {
          console.log(response)
          this.user = response;
      });
  }

  ngOnInit() {
    this.loading=true;
    this.payForm = this._formBuilder.group({
      num: [""],
      mese: [""],
      anno: [""],
      cvc: [""],
    });
    this.route.paramMap.subscribe(params => { 
        this.idart = parseInt(params.get('id')!);
        this.articleService.getUserbyId(this.idart).pipe(first())
        .subscribe((response) => {
          this.idmit = response;
          this.firstFormGroup = this._formBuilder.group({
            nome: [this.user.username],
            indirizzo: [this.user.indirizzo],
            cap: [this.user.cap],
            city: [this.user.city],
            mittente:[this.idmit],
            pagamento:[""],
            destinatario:[this.user.id],
            articolo: [this.idart]
          });
          this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['contanti']
          });
          
          this.loading=false;
        });
        
    });
    
      
  }
  changeInfoSaved(){
      this.info= false;
      this.firstFormGroup = this._formBuilder.group({
        nome: [this.user.username],
        indirizzo: [this.user.indirizzo],
        cap: [this.user.cap],
        city: [this.user.city],
        mittente:[this.idmit],
        pagamento:[""],
        destinatario:[this.user.id],
        articolo: [this.idart]
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
        pagamento:[""],
        mittente:[this.idmit],
        destinatario:[this.user.id],
        articolo: [this.idart]
    });
    console.log("insert")
  }
  change(s:string){
    if(s === "card"){
      this.card = true
      this.payForm = this._formBuilder.group({
        num: ["", Validators.required],
        mese: ["", Validators.required],
        anno: ["", Validators.required],
        cvc: ["", Validators.required],
      });
    }
    else{
      this.card = false
      this.payForm = this._formBuilder.group({
        num: [""],
        mese: [""],
        anno: [""],
        cvc: [""],
      });
    }
  }
  confirmPurchase(s:string) {
    this.loading=true;
    this.firstFormGroup.controls['pagamento'].setValue(s);
    console.log(this.firstFormGroup.value)
    this.ordersService
        .add(this.firstFormGroup.value)
        .pipe()
        .subscribe({
          next: () => {
            this.loading=false;
          },
          error: () => {
            this.loading=false;
            alert("error")
          },
        });
  }
  chargeCreditCard() {
    this.loading=true;
    (<any>window).Stripe.card.createToken({
      number: this.payForm.value.num,
      exp_month: this.payForm.value.mese,
      exp_year: this.payForm.value.anno,
      cvc: this.payForm.value.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        this.articleService.getById(this.idart).pipe(first()).subscribe((res)=>{
          console.log(res)
          let token = response.id;
          this.chargeCard(token,res.prezzo);
        })
        
      } else {
        this.loading = false;
      }
    });
  }
  chargeCard(token: string, amount : any) {
    this.paymentService.payment(token,amount.toString(10)).pipe(first()).subscribe(resp => {
      console.log(resp);
      this.confirmPurchase("PAGATO")
    });
    
  }
}
