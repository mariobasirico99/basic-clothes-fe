import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: User;
    userFromApi!: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.user = this.authenticationService.userValue;
        console.log(this.user)
    }

    ngOnInit() {
    }
}
