import { Injectable } from '@angular/core';

import { HttpClientWrapper } from '../../components/httpclientwrapper';
import { Paginator, Schedule, SchedulePage } from '../../components/common/model';


import { environment } from './../../../environments/environment';



@Injectable()
export class ScheduleService{
	private baseApi = environment.baseApi;
	
	constructor(private http: HttpClientWrapper){}

	schedules(pagination: Paginator){
		return this.http.getaa<SchedulePage>(this.baseApi + `schedules?page=${pagination.page}&size=${pagination.size}`);
	}	

	periods(id: string){
		return this.http.get(this.baseApi + `schedules/${id}/periodes`);
	}

	delete(id: number){
		return this.http.delete(this.baseApi + `schedules/${id}`);
	}

	schedule(scheduleId: string){
		return this.http.getaa<Schedule>(this.baseApi + `schedules/${scheduleId}`);
	}

	availableSAFXTables(){
		return this.http.get(this.baseApi + `safxTables?page=0&size=1000`);
	}
	
	save(scheduleConfig: any){
		return this.http.post(this.baseApi + 'schedules', scheduleConfig);
	}
	
	safxColumns(safxTableId: number){
		return this.http.get(this.baseApi + `safxTables/${safxTableId}/safxColumns?associated=true`);
	}
}
