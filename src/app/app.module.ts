import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardCounterComponent } from './dashboard-counter/dashboard-counter.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModalComponent } from './modal/modal.component';
import { ReagentsComponent } from './reagents/reagents.component';
import { CommonModule } from '@angular/common';
import {PatientService} from "./liste-patients/patient.service";
import {ListePatientsComponent} from "./liste-patients/liste-patients.component";
import { SamplesComponent } from './samples/samples.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { AnalyseMesuresComponent } from './analyse-mesures/analyse-mesures.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthInterceptorService} from "./security/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavBarComponent,
    SidebarComponent,
    DashboardCounterComponent,
    ModalComponent,
    ReagentsComponent,
    ListePatientsComponent,
    SamplesComponent,
    AnalyseComponent,
    AnalyseMesuresComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }


