import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';


@Component({
    selector: 'monitoring-detail',
    templateUrl: 'monitoring.detail.component.html',
	imports: [CommonModule, FormsModule, PaginationComponent]
})

export class MonitoringDetailComponent{
	private baseApi = environment.baseApi;
	public scheduleLog : any;
	public taxOneErrors : any;
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();
	
	constructor(private http: HttpClientWrapper, private router: Router, private route: ActivatedRoute){
		let id = parseInt(this.route.snapshot.paramMap.get("id")!);
		this.loadScheduleLog(id);
		this.loadTaxOneErrors(id);
	}

	loadScheduleLog(id: number){
		this.http.get(this.baseApi + `schedulelogs/${id}`)
		.subscribe((response: any) => {
			this.scheduleLog = response;
		});
	}

	loadTaxOneErrors(id: number){
		this.http.get(this.baseApi + `schedulelogs/${id}/taxOneErrors?page=${this.pagination.page}&size=${this.pagination.size}`)
		.subscribe((response: any) => {
			this.taxOneErrors = response.content;
			this.totalPages = response.totalPages;
		});
	}

	onPage(page: number){
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			this.loadTaxOneErrors(this.scheduleLog.id);
		}
	}
	
	onBack(){
		this.router.navigate(["monitoring"]);
	}
}