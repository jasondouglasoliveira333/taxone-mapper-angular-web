import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator, Schedule, SchedulePage } from '../components/common/model';

import { LoadingService } from '../components/loading.service';
import { PaginationComponent } from '../components/pagination.component';
import { ScheduleService } from './shared/schedule.service';



@Component({
    selector: 'schedule-list',
    templateUrl: 'schedule.list.component.html',
	imports: [CommonModule, FormsModule, PaginationComponent],
	providers: [ScheduleService]
})
export class ScheduleListComponent {
	public schedules : any = [];
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();
	

	constructor(private router: Router, private loadingService: LoadingService, private scheduleService: ScheduleService){
		this.loadSchedules();
	}
	
	loadSchedules(){
		this.scheduleService.schedules(this.pagination).subscribe((response : SchedulePage) => {
			this.schedules = response.content;
			this.totalPages = response.totalPages;
		});
	}
	
	onAdd(){
		this.router.navigate(['schedule']);
	}
	
	onEdit(id: string){
		this.scheduleService.periods(id).subscribe((response : any) => {
			let days = response.days;
			let hours = response.hours;
			this.router.navigate(['schedule', { 'id' : id , 'days': days, 'hours': hours}]);
		});
		
	}

	onDelete(id: number){
		this.scheduleService.delete(id).subscribe(() => {
			alert("Deletado com sucesso");
			this.loadSchedules();
		});
	}
	
	onPage(page: number){
		alert("onPagex:" + page);
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			this.loadSchedules();
		}
	}	
}
