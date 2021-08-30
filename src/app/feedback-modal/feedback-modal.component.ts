import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { FeedbackService } from '../_services/feedback.service'

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.css']
})
export class FeedbackModalComponent implements OnInit {
  form: any;
  user : any;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private feedbackService: FeedbackService,
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = JSON.parse(localStorage.getItem('user')!);
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [this.data.username, Validators.required],
      descrizione: ['', Validators.required],
      voto: ['', Validators.required],
      scrittore_id:['', Validators.required],
      id_utente:['', Validators.required]
    });
  }
  get f() {
    return this.form!.controls;
  }
  sendFeedback() {
    this.loading = true
    this.form.controls['id_utente'].setValue(this.data.mittente);
    this.form.controls['scrittore_id'].setValue(this.user.userId);
    if (
      !(this.f.descrizione.errors && this.f.descrizione.errors.required)
    ) {
      this.feedbackService
        .add(this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.dialogRef.closeAll();
          },
          error: () => {
            this.loading = false;
          },
        });
    }
  }
}
