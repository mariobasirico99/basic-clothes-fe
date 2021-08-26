import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Feedback } from '../_models/feedback';
import { FeedbackService } from '../_services/feedback.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dialog-info-mitt',
  templateUrl: './dialog-info-mitt.component.html',
  styleUrls: ['./dialog-info-mitt.component.css']
})
export class DialogInfoMittComponent implements OnInit {
  public feed: Feedback[] = [];
  public user : any;
  public vote = 0.0;
  done = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService : UserService,
    private feedbackService : FeedbackService) {
      
  }
  ngOnInit(): void {
    this.feedbackService.getRankingByUser(this.data).pipe(first()).subscribe((res)=>{
      if (res != null && res!=undefined && res != "NaN"){
        this.vote = res
      }
      else{
        this.vote = 0.0
      }
      
    })
    this.feedbackService.getByUser(this.data).pipe(first()).subscribe((res)=>{
      this.feed = res
      if (this.feed.length >0){
        this.user = this.feed[0].user
      }
      this.done = true
    })
  }

}
