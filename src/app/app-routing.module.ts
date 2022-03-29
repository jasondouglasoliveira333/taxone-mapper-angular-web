import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from "./upload/upload.component";
import { SourceConfigListComponent } from './sourceconfig/sourceconfig.list.component';
import { SourceConfigComponent } from './sourceconfig/sourceconfig.component';
import { MatcherListComponent } from './matcher/matcher.list.component';
import { MatcherComponent } from './matcher/matcher.component';
import { ScheduleListComponent } from './schedule/schedule.list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AlertComponent } from './alert/alert.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { MonitoringDetailComponent } from './monitoring/monitoring.detail.component';

const routes: Routes = [
	{path : "", component: LoginComponent},
	{path : "upload", component: UploadComponent},
	{path : "sourceconfig-list", component: SourceConfigListComponent}, 
	{path : "sourceconfig/:sourceType/:operation", component: SourceConfigComponent}, 
	{path : "matcher-list", component: MatcherListComponent}, 
	{path : "matcher/:tableName", component: MatcherComponent},
	{path : "schedule-list", component: ScheduleListComponent},
	{path : "schedule", component: ScheduleComponent},
	{path : "monitoring", component: MonitoringComponent},
	{path : "monitoring-datail/:id", component: MonitoringDetailComponent},
	{path : "alert", component: AlertComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
