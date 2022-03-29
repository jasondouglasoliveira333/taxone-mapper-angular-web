import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { HttpClientWrapper } from './components/httpclientwrapper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { SourceConfigListComponent } from './sourceconfig/sourceconfig.list.component';
import { SourceConfigComponent } from './sourceconfig/sourceconfig.component';
import { MatcherListComponent } from './matcher/matcher.list.component';
import { MatcherComponent } from './matcher/matcher.component';
import { ScheduleListComponent } from './schedule/schedule.list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AlertComponent } from './alert/alert.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { MonitoringDetailComponent } from './monitoring/monitoring.detail.component';

import { PaginationComponent } from './components/pagination.component';


import { LoadingInterceptor } from './components/loading.interceptor';
import { LoadingService } from './components/loading.service';


@NgModule({
  declarations: [
    AppComponent,
	LoginComponent,
	UploadComponent,
	SourceConfigListComponent,
	SourceConfigComponent,
	MatcherListComponent,
	MatcherComponent,
	ScheduleListComponent,
	ScheduleComponent,
	AlertComponent,
	MonitoringComponent,
	MonitoringDetailComponent,
	PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule
  ],
  providers: [HttpClientWrapper, LoadingService, LoadingInterceptor, 
	{
		provide: HTTP_INTERCEPTORS,
		useClass: LoadingInterceptor,
		multi: true
	}],
  bootstrap: [AppComponent]
})
export class AppModule { }
