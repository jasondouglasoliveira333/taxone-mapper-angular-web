import { Injectable } from '@angular/core';

import { HttpClientWrapper } from '../../components/httpclientwrapper';
import { Paginator } from '../../components/common/model';


import { environment } from './../../../environments/environment';


@Injectable()
export class ScheduleService{
	private baseApi = environment.baseApi;
	
	constructor(private http: HttpClientWrapper){}

	loadSchedules(pagination: Paginator){
		return this.http.get(this.baseApi + `schedules?page=${pagination.page}&size=${pagination.size}`);
	}	

	loadPeriods(id: string){
		return this.http.get(this.baseApi + `schedules/${id}/periodes`);
	}

	onDelete(id: number){
		return this.http.delete(this.baseApi + `schedules/${id}`);
	}

	loadSchedule(scheduleId: string){
		return this.http.get(this.baseApi + `schedules/${scheduleId}`);
	}

	loadAvailableTables(){
		return this.http.get(this.baseApi + `safxTables?page=0&size=1000`);
	}
	
	onSave(scheduleConfig: any){
		return this.http.post(this.baseApi + 'schedules', scheduleConfig);
	}
	
	onGetColumns(safxTableId: number){
		return this.http.get(this.baseApi + `safxTables/${safxTableId}/safxColumns?associated=true`);
	}
}
