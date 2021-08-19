import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Angular Material Module
import { AngularMaterialModule } from './angular-material.module';

/* FontAwesome Library */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormsModule } from '@angular/forms';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BdcWalkModule } from 'bdc-walkthrough';
import { SettingComponent } from './setting/setting.component';
import { OrderComponent } from './order/order.component';
import { PageSpinnerComponent } from './page-spinner/page-spinner.component';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { DialogDataExampleDialogComponent } from './dialog-data-example-dialog/dialog-data-example-dialog.component';
import { ConfirmPurchaseComponent } from './confirm-purchase/confirm-purchase.component';
import { MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { AddClothesComponent } from './add-clothes/add-clothes.component';
import { DialogInfoMittComponent } from './dialog-info-mitt/dialog-info-mitt.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    HomeComponent,
    SettingComponent,
    OrderComponent,
    PageSpinnerComponent,
    OrderModalComponent,
    FeedbackModalComponent,
    FeedbackPageComponent,
    DialogDataExampleDialogComponent,
    ConfirmPurchaseComponent,
    AddClothesComponent,
    DialogInfoMittComponent,
  ],
  imports: [
    MatStepperModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    RouterModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AngularMaterialModule,
    FormsModule,
    BdcWalkModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

