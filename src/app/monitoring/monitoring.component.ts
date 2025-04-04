import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';


@Component({
    selector: 'monitoring',
    templateUrl: 'monitoring.component.html',
    imports: [CommonModule, FormsModule, PaginationComponent]
})

export class MonitoringComponent implements OnInit{
	private baseApi = environment.baseApi;
	public scheduleLogs : any = [];
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();
	
	private statusAgendamentos : any[] = [];

	private statuses : any[] = [
		{'name':'PROCESSING', 'value':'Processando'},
		{'name':'PROCESSING_ERROR', 'value':'Erro no processamento'},
		{'name':'SENT', 'value':'Enviado'},
		{'name':'PROCESSED', 'value':'Processado'},
		{'name':'ERROR_TAXONE', 'value':'Erro no retorno TaxOne'},
	];

	private status: string = 'PROCESSED';

	
	constructor(private http: HttpClientWrapper, private router: Router, private elementRef:ElementRef){
		
	}
	
	ngOnInit(){
		this.loadScheduleLogsStatisticts();
		this.loadScheduleLogs();
		
	}
	
	loadScheduleLogsStatisticts(){
		this.http.get(this.baseApi + 'schedulelogs/statistics')
		.subscribe((response:any) => {
			this.loadScheduleLogsArray(response);
			this.createChartElement();
		});

	}
	
	loadScheduleLogsArray(statistics: any){
		let PROCESSING_ST = this.findScheduleLogsByStatus(statistics, 'PROCESSING');
		let PROCESSING = null;
		if (PROCESSING_ST){
			PROCESSING = [this.translateStatus(PROCESSING_ST.status), PROCESSING_ST.quantity];
		}else{
			PROCESSING = [this.translateStatus('PROCESSING'), 0];
		}
		this.statusAgendamentos.push(PROCESSING);
		let PROCESSING_ERROR_ST = this.findScheduleLogsByStatus(statistics, 'PROCESSING_ERROR');
		let PROCESSING_ERROR = [this.translateStatus(PROCESSING_ERROR_ST.status), PROCESSING_ERROR_ST.quantity];
		this.statusAgendamentos.push(PROCESSING_ERROR);
		let SENT_ST = this.findScheduleLogsByStatus(statistics, 'SENT');
		let SENT = null;
		if (SENT_ST){
			SENT = [this.translateStatus(SENT_ST.status), SENT_ST.quantity];
		}else{
			SENT = [this.translateStatus('SENT'), 0];
		}
		this.statusAgendamentos.push(SENT);
		let PROCESSED_ST = this.findScheduleLogsByStatus(statistics, 'PROCESSED');
		let PROCESSED = [this.translateStatus(PROCESSED_ST.status), PROCESSED_ST.quantity];
		this.statusAgendamentos.push(PROCESSED);
		let ERROR_TAXONE_ST = this.findScheduleLogsByStatus(statistics, 'ERROR_TAXONE');
		let ERROR_TAXONE = [this.translateStatus(ERROR_TAXONE_ST.status), ERROR_TAXONE_ST.quantity];
		this.statusAgendamentos.push(ERROR_TAXONE);
	}

	findScheduleLogsByStatus(statistics: any, status:string){
		for (let x=0; x < statistics.length; x++){
			if(statistics[x].status == status){
				return statistics[x];
			}
		}
	}
	
	createChartElement(){
		var s = document.createElement("script");
		s.type = "text/javascript";
		let script = "var chartData = [['Task', 'Hours per Day'],";
		this.statusAgendamentos.forEach(sa => {
			script += "['"  + sa[0] + "'," + sa[1] + "],";
		});
		script += "];";
		script += `
				var id = 'piechart';
				loadChart();
			    var options = {'title':'Status Agendamentos', 'width':500, 'height':400, is3D: true,
					slices: {
						0: { color: 'blue' },
						1: { color: 'red' },
						2: { color: 'orange' },
						3: { color: 'green' },
						4: { color: 'purple' },
					}		
				};
		`;
		s.text = script;
		this.elementRef.nativeElement.appendChild(s);
	}
	
	loadScheduleLogs(){
		this.http.get(this.baseApi + `schedulelogs?status=${this.status}&page=${this.pagination.page}&size=${this.pagination.size}`)
		.subscribe((response:any) => {
			this.scheduleLogs = response.content;
			this.transleteStatusSchedules();
			this.totalPages = response.totalPages;
		});
	}
	
	transleteStatusSchedules(){
		this.scheduleLogs.forEach((sl : any) => {
			sl.status = this.translateStatus(sl.status);
		});
	}
	
	onChartFilter(status: string){
		this.status = status;
		this.loadScheduleLogs();
	}
	
	onPage(page: number){
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			this.loadScheduleLogs();
		}
	}	
	
	translateStatus(status: string){
		for (let x=0; x < this.statuses.length; x++){
			let lStatus = this.statuses[x];
			if (lStatus.name == status){
				return lStatus.value;
			}
		}
	}
	
	onView(id: number){
		this.router.navigate(['monitoring-datail', id]);
	}
	
}