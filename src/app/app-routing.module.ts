import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';
import { Path } from './_models/path';
import { SettingComponent } from './setting/setting.component';
import { OrderComponent } from './order/order.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { ConfirmPurchaseComponent } from './confirm-purchase/confirm-purchase.component';
import { AddClothesComponent } from './add-clothes/add-clothes.component';
import { DialogInfoMittComponent } from './dialog-info-mitt/dialog-info-mitt.component';


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
  {
    path: Path.Settings,
    component: SettingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Path.Feedback,
    component: FeedbackPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Path.AddClothes,
    component: AddClothesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Path.DialogInfoMitt,
    component: DialogInfoMittComponent,
    canActivate: [AuthGuard],
  },
{
    path: Path.ConfermaAcquisto + "/:id",
    component: ConfirmPurchaseComponent,
    canActivate: [AuthGuard],
},
  {
    path: Path.Orders,
    component: OrderComponent,
    canActivate: [AuthGuard],
  },

  // otherwise redirect to home
  { path: '**', redirectTo: Path.Home },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
