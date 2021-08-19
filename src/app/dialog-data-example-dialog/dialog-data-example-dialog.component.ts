import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { DialogInfoMittComponent } from '../dialog-info-mitt/dialog-info-mitt.component';
import { ArticleService } from '../_services/article.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.component.html',
  styleUrls: ['./dialog-data-example-dialog.component.css']
})
export class DialogDataExampleDialogComponent implements OnInit {
  public user : any;
  public hrefemail ="";
  public done = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public _sanitizer: DomSanitizer,
    private articleService : ArticleService,
    private userService : UserService

  ) { 
    this.articleService.getUserbyId(this.data.id).pipe(first()).subscribe((response)=>{
      this.userService.getById(response).pipe(first()).subscribe((res)=>{
        this.user = res
        console.log(this.user)
        this.hrefemail="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to="+ res.email
        this.done = true
      })
    })
  }

  ngOnInit(): void {
    console.log(this.data);
  }
  infoMitt(){
    this.dialog.open(DialogInfoMittComponent, {
      data: this.user.id,
  }).afterClosed().subscribe(() => {});
  }
}
