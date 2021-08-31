import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
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
  user!: any;
  onSettingsRedirect(): void {
    this.router.navigateByUrl(Path.Settings);
  }
  
  onFeedbackRedirect(): void {
    this.router.navigateByUrl(Path.Feedback);
  }
  onVenditeRedirect(): void {
    this.router.navigateByUrl(Path.Vendite);
  }
  onOrdersRedirect(): void {
    this.router.navigateByUrl(Path.Orders); 
  }
  get isAdmin() {
    if(this.user == null || this.user == undefined){
      this.logout()
    }
    return (
      this.user &&
      (this.user.roles[0].role === Role.Admin)
    );
  }
  get isLogged(){
    if(this.user == null || this.user == undefined){
      this.logout()
    }
    return this.user && (this.user.roles[0].role === Role.Admin || this.user.roles[0].role === Role.User);
  }
  get isUser(){
    if(this.user == null || this.user == undefined){
      this.logout()
    }
    return this.user && (this.user.roles[0].role === Role.User);
  }
  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }
}
