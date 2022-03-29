import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator } from '../components/common/model';

@Component({
	selector: 'schedule-list',
	templateUrl: 'schedule.list.component.html'
})

export class ScheduleListComponent {
	private baseApi = environment.baseApi;
	public schedules : any = [];
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();

	
	constructor(private http: HttpClientWrapper, private router: Router){
		this.loadSchedules();
	}
	
	loadSchedules(){
		this.http.get(this.baseApi + `schedules?page=${this.pagination.page}&size=${this.pagination.size}`)
		.subscribe((response : any) => {
			this.schedules = response.content;
			this.totalPages = response.totalPages;
		});
	}
	
	onAdd(){
		this.router.navigate(['schedule']);
	}
	
	onEdit(id: string){
		this.http.get(this.baseApi + `schedules/${id}/periodes`)
		.subscribe((response : any) => {
			let days = response.days;
			let hours = response.hours;
			this.router.navigate(['schedule', { 'id' : id , 'days': days, 'hours': hours}]);
		});
		
	}

	onDelete(id: number){
		this.http.delete(this.baseApi + `schedules/${id}`)
		.subscribe(() => {
			alert("Deletado com sucesso");
			this.loadSchedules();
		});
	}
	
	onPage(page: number){
		//alert("onPage:" + page);
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			this.loadSchedules();
		}
	}	
}