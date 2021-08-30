import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  regForm:any;
  loading = false;
  submitted = false;
  status=true;
  error = '';
  error2 = '';
  isPasswordHidden = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }
  onChange() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.regForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      cap: ['',Validators.required],
      indirizzo: ['',Validators.required],
      city: ['',Validators.required],
      email: ['',Validators.required],
      initialRole: ['']
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm!.controls;
  }
  get freg() {
    return this.regForm!.controls;
  }
  changeStatus(){
    this.status = !this.status;
    this.error = ""
    this.error2 = ""
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  }
  onSubmitReg() {

    // stop here if form is invalid
    if (this.regForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.regForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.status = true;
          this.loading = false;
        },
        error: (error) => {
          this.error2 = error;
          this.loading = false;
        },
      });
  }
}
