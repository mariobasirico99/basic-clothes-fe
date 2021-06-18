import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';
import { Path } from './_models/path';


const routes: Routes = [
  {
    path: Path.Home,
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Path.Admin,
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: Path.Login,
    component: LoginComponent,
  },

  // otherwise redirect to home
  { path: '**', redirectTo: Path.Home },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
