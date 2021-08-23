import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { Role } from '../_models/role';
import { User } from '../_models/user';
import { FeedbackService } from '../_services/feedback.service';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent implements OnInit {

  displayedColumns: string[] = []
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  user: any;
  loading = false;
  dataSource:any;
  constructor(
    private feedbackService : FeedbackService
  ) { 
    this.user = JSON.parse(localStorage.getItem('user')!);
    if(this.isAdmin){
      this.displayedColumns = [
        'Scrittore',
        'Voto',
        'Descrizione',
        'action'
      ];
    }
    else{
      this.displayedColumns = [
        'Scrittore',
        'Voto',
        'Descrizione'
      ];
    }
  }

  ngOnInit(): void {
    this.onFeedbackLoading()
  }
  deleteItem(id:any){
    this.feedbackService.delete(id).pipe(first()).subscribe((res)=>{
      console.log(res)
      this.onFeedbackLoading();
    })
  }
  onFeedbackLoading() {
    this.loading = true;
    this.dataSource = null
    if(this.isAdmin){
      this.feedbackService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        console.log(response)
        this.dataSource = new MatTableDataSource(response);
        this.loading = false;
      });
    }
    else{
      this.feedbackService
      .getByUser(this.user.userId)
      .pipe(first())
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response);
        this.loading = false;
      });
    }
  }
  get isUser() {
    return (
      this.user &&
      (this.user.roles[0].role === Role.User)
    );
  }
  get isAdmin() {
    return (
      this.user &&
      (this.user.roles[0].role === Role.Admin)
    );
  }
}
