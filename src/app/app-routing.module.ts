import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {DashboardCounterComponent} from "./dashboard-counter/dashboard-counter.component";
import {ReagentsComponent} from "./reagents/reagents.component";
import {ListePatientsComponent} from "./liste-patients/liste-patients.component";
import { SamplesComponent } from './samples/samples.component';
import {AnalyseMesuresComponent} from "./analyse-mesures/analyse-mesures.component";
import {AnalyseComponent} from "./analyse/analyse.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [

  { path: 'users', component: UsersComponent },
  { path: 'dashboard', component: DashboardCounterComponent },
  {path:"reagents",component:ReagentsComponent},
  { path: '', component: DashboardCounterComponent },
  {path:'patients',component:ListePatientsComponent},
  { path: 'samples', component: SamplesComponent },
  { path: 'analyseMesures', component: AnalyseMesuresComponent },
  { path: 'analyse', component: AnalyseComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
