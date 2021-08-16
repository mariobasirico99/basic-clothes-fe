import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ArticleService } from '../_services/article.service';
import { OrdersService } from '../_services/orders.service';
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
  secondFormGroup: FormGroup = new FormGroup({});
  info=false;
  user :any;
  loading= false;
  iduser : number = 0;
  idart : any;
  idmit : any;
  paramsObject:any;
  constructor(private _formBuilder: FormBuilder,
    private ordersService : OrdersService,
    private articleService : ArticleService,
    private router : Router,
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
        mittente:[this.idmit],
        destinatario:[this.user.id],
        articolo: [this.idart]
    });
    console.log("insert")
  }
  confirmPurchase() {
    this.loading=true;
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

}
