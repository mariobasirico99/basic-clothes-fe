import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { Role } from '../_models/role';
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
  user:any;
  displayedColumns: string[] = [
    'Id',
    'Username',
    'Email',
    'action',
  ];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  error: any;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit(): void {
    this.onLoadingUser();
  }
  get f() {
    return this.addForm!.controls;
  }
  onLoadingUser(){
    if(!this.isAdmin){
      let user = JSON.parse(localStorage.getItem('user')!)
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
      
    else{
      this.loading = true;
      this.dataSource = null;
      console.log(this.isAdmin)
      this.userService
          .getAll()
          .pipe(first())
          .subscribe((response) => {
            this.dataSource = new MatTableDataSource(response);
            this.loading = false;
          });
    }
      
  }
  get isAdmin() {
    return (
      this.user &&
      (this.user.roles[0].role === Role.Admin)
    );
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
  deleteItem(id:any){
    this.userService.delete(id).pipe(first()).subscribe((res)=>{
      console.log(res)
    })
  }
}
