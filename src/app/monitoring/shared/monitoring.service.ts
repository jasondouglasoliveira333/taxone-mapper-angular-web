import { Injectable } from '@angular/core';

import { HttpClientWrapper } from '../../components/httpclientwrapper';
import { Paginator } from '../../components/common/model';


import { environment } from './../../../environments/environment';


@Injectable()
export class MonitoringService{
	private baseApi = environment.baseApi;
	
	constructor(private http: HttpClientWrapper){}

	scheduleLogsStatisticts(){
		return this.http.get(this.baseApi + 'schedulelogs/statistics');
	}
	
	scheduleLogs(status: string, pagination: Paginator){
		return this.http.get(this.baseApi + `schedulelogs?status=${status}&page=${pagination.page}&size=${pagination.size}`)
	}

}

