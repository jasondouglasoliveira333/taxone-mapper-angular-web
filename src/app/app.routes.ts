import { Routes, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';

//import { LoginComponent } from './login/login.component';
import { UploadComponent } from "./upload/upload.component";
import { SourceConfigListComponent } from './sourceconfig/sourceconfig.list.component';
import { SourceConfigComponent } from './sourceconfig/sourceconfig.component';
import { MatcherListComponent } from './matcher/matcher.list.component';
import { MatcherComponent } from './matcher/matcher.component';
import { ScheduleListComponent } from './schedule/schedule.list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { MonitoringDetailComponent } from './monitoring/monitoring.detail.component';
import { RevenueComponent } from './revenue/revenue.component';
import { AlertComponent } from './alert/alert.component';
import { NotFoundComponent } from './notfound/notfound.component';

const resolvedChildATitle: ResolveFn<string> = () => Promise.resolve('child a');


export const OURGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log("In OURGuardFunction");
  return true;
}

export const routes: Routes = [
	{path : "", component: AlertComponent},
	{path : "upload", component: UploadComponent},
	{path : "sourceconfig-list", component: SourceConfigListComponent}, 
	{path : "sourceconfig/:sourceType/:operation", component: SourceConfigComponent}, 
	{path : "matcher-list", component: MatcherListComponent}, 
	{path : "matcher/:tableName", component: MatcherComponent},
	{path : "schedule-list", component: ScheduleListComponent},
	{path : "schedule", component: ScheduleComponent},
	{path : "monitoring", component: MonitoringComponent},
	{path : "monitoring-datail/:id", component: MonitoringDetailComponent},
	{path : "revenue", component: RevenueComponent},
	{path : "alert", component: AlertComponent},
	{path : "**", component: NotFoundComponent}
];


