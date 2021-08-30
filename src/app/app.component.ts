import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import { Role } from './_models/role';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
} from 'angular-animations';
import { Path } from './_models/path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    bounceInOnEnterAnimation({ anchor: 'searchBoxIn', duration: 400 }),
    bounceOutOnLeaveAnimation({ anchor: 'searchBoxOut', duration: 400 }),
  ],
})
export class AppComponent implements OnInit {
  title = 'Basic Clothes';
  isSearchBoxVisible = false;

  constructor(
    private authenticationService: AuthenticationService,
    public router: Router
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }
  user!: User;
  onSettingsRedirect(): void {
    this.router.navigateByUrl(Path.Settings);
  }
  
  onFeedbackRedirect(): void {
    this.router.navigateByUrl(Path.Feedback);
  }
  onOrdersRedirect(): void {
    this.router.navigateByUrl(Path.Orders); 
  }
  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }
  get isLogged(){
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.User);
  }
  get isUser(){
    return this.user && (this.user.role === Role.User);
  }
  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }
}
