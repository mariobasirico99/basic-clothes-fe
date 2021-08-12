import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.css']
})
export class FeedbackModalComponent implements OnInit {
  form: any;
  user : User | undefined;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [this.data.username, Validators.required],
      text: ['', Validators.required],
      id:['', Validators.required]
    });
  }
  get f() {
    return this.form!.controls;
  }
  onSubmit() {
    this.form.controls['counselor'].setValue(this.data.mittente);
    if (
      !(this.f.text.errors && this.f.text.errors.required)
    ) {
      
    }
  }
}
