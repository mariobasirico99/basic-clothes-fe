import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DialogInfoMittComponent } from '../dialog-info-mitt/dialog-info-mitt.component';
import { Path } from '../_models/path';
import { Role } from '../_models/role';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { FeedbackService } from '../_services/feedback.service';
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
  public ranking = 0.0;
  displayedColumns: string[] = [
    'Id',
    'Username',
    'Email',
  ];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  error: any;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private feedbackService: FeedbackService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.feedbackService.getRankingByUser(this.user.userId).pipe(first()).subscribe((res)=>{
      if (res != null && res!=undefined && res != "NaN"){
        this.ranking = res
      }
      else{
        this.ranking = 0.0
      }
      
    })
  }

  ngOnInit(): void {
    this.onLoadingUser();
  }
  get f() {
    return this.addForm!.controls;
  }
  infoMitt(){
    this.dialog.open(DialogInfoMittComponent, {
      data: this.user.userId,
  })
  }
  onLoadingUser(){
    if(!this.isAdmin){
      let user = JSON.parse(localStorage.getItem('user')!)
      this.loading = true;
      if (user){
        this.userService.getById(user.userId)
          .pipe(first())
          .subscribe((userAccount) => {
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
              this.onLoadingUser();
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
          },
        });
      
  }
}
