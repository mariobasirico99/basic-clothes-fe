import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  loading = false;
  addForm: any;
  userAccount!: User;
  error: any;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.onLoadingUser();
  }
  get f() {
    return this.addForm!.controls;
  }
  onLoadingUser(){
    let user = JSON.parse(localStorage.getItem('user')!)
    console.log(user)
    this.loading = true;
    if (user){
      this.userService.getById(user.userId)
        .pipe(first())
        .subscribe((userAccount) => {
          console.log(userAccount)
          this.loading = false;
          this.userAccount = userAccount;
          this.addForm = this.formBuilder.group({
            id:[user.userId],
            email: [this.userAccount.email, Validators.required],
            cap: [this.userAccount.cap, Validators.required],
            indirizzo: [this.userAccount.indirizzo, Validators.required],
            city: [this.userAccount.city, Validators.required],
            username:[this.userAccount.username,Validators.required]
          });
        });
      }
  }
  onSubmit() { 
    this.userService
        .updateUser(this.addForm.value)
        .pipe(first())
        .subscribe({
          next: () => {
              console.log("Ci siamo")
              this.onLoadingUser();
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
          },
        });
      
  }

}
