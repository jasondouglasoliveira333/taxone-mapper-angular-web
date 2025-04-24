import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../environments/environment';

import { Paginator } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';
import { ScheduleService } from './shared/schedule.service';


@Component({
    selector: 'schedule',
    templateUrl: 'schedule.component.html',
	imports: [CommonModule, FormsModule, PaginationComponent],
	providers: [ScheduleService]
})

export class ScheduleComponent {
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();
	
	public scheduleConfig: any = { safxTables : [], criterias : []};
	public availableTables: any[] = [];
	public selectedAvaiableTables = [];
	public selectedSelectedTables = [];
	
	public days: any[] = [
		{'value': '*', 'label': 'Todos'}, 
		{'value': '0', 'label': 'Segunda'},
		{'value': '1', 'label': 'Terça'},
		{'value': '2', 'label': 'Quarta'},
		{'value': '3', 'label': 'Quinta'},
		{'value': '4', 'label': 'Sexta'},
		{'value': '5', 'label': 'Sabado'},
		{'value': '6', 'label': 'Domingo'}
	];

	public hours: any[] = [
		{'value':'*', 'label': 'Todas'}
	];

	public selectedDays : any[] = [];
	public selectedHours : any[] = [];

	public criteriasOnePage : any[] = [];
	public safxColumns: any = [];
	public operators = ['=', '!=', '>=', '<=', 'between', 'not empty', 'empty'];
	
	public criteria : any = { 'safxColumn' : { 'safxTable' : {'id' : null } } };
	public valueType = 'inputText';
	public dateField = false;
	
//	public multivalues : string[] = ["0", "1"];
	public multivalues : any[] = [
		{"value": "0", "name": 'Zero'},
		{"value": "1", "name": 'One'}
	];
	public multivaluesSelected : string[] = ["0"];
	
	
	
	constructor(private router: Router, private route: ActivatedRoute, private ref: ChangeDetectorRef, private scheduleService: ScheduleService){
		this.pagination.size = 2;
		let scheduleId = this.route.snapshot.paramMap.get('id')!;
		let days = this.route.snapshot.paramMap.get('days')!;
		let hours = this.route.snapshot.paramMap.get('hours')!;
		//alert("received days:" + days);
		if (scheduleId){
			this.loadSelectedDays(days);
			this.fillHours();
			this.loadSelectedHours(hours);
			this.loadSchedule(scheduleId);
		}else{
			this.fillHours();
		}
		this.loadAvailableTables();
	}
	
	async loadSchedule(scheduleId: string){
		let done = false;
		this.scheduleService.schedule(scheduleId).subscribe((response : any) => {
			//alert(JSON.stringify(response));
			this.scheduleConfig = response;
			if (!this.scheduleConfig.safxTables){
				this.scheduleConfig.safxTables = [];
			}
			if (!this.scheduleConfig.criterias){
				this.scheduleConfig.criterias = [];
			}else{
				this.doCriteriaPagination();
			}
		});
	}
	
	
	loadSelectedDays(days_schedule:string){
		let days = days_schedule.split(",");
		days.forEach((day:any) => {
			this.selectedDays.push(day);
		});
	}
	
	loadSelectedHours(hours_schedule:string){
		let hours = hours_schedule.split(",");
		hours.forEach((hour:any) => {
			this.selectedHours.push(hour);
		});
	}
	
	generateDaysValue(){
		let days = '';
		//alert("this.selectedDays:" + JSON.stringify(this.selectedDays));
		this.selectedDays.forEach((day:any) => {
			days += day + ',';
		});
		
		if (days.length > 0){
			days = days.substring(0, days.length-1);
		}
		this.scheduleConfig.days = days;
	}

	generateHoursValue(){
		let hours = '';
		this.selectedHours.forEach((hour:any) => {
			hours += hour + ',';
		});
		
		if (hours.length > 0){
			hours = hours.substring(0, hours.length-1);
		}
		this.scheduleConfig.hours = hours;
	}
	
	doCriteriaPagination(){
		this.calcTotalPages();
		this.criteriasOnePage = this.scheduleConfig.criterias.slice(0, this.pagination.size);
	}
	
	calcTotalPages(){
		let cLength = this.scheduleConfig.criterias.length;
		let pages = Math.trunc(cLength / this.pagination.size);
		if (cLength%this.pagination.size != 0){
			pages++;
		}
		this.totalPages = pages;
		if (this.totalPages == 0){
			this.totalPages = 1;
		}
	}
	
	loadAvailableTables(){
		this.scheduleService.availableSAFXTables().subscribe((response : any) => {
			this.fillAvaliableTables(response.content);
		});
	}
	
	fillAvaliableTables(availableTables: any[]){
		this.availableTables = availableTables.filter((t:any) => this.scheduleConfig.safxTables.filter((at:any) => at.id == t.id).length == 0);
	}
	
	
	fillHours(){
		for (let x=0; x < 24; x++){
			let hour = x + ":00";
			if (hour.length == 4){
				hour = "0" + hour;
			}
			this.hours.push({ 'value': x + "", 'label': hour});
		}
	}

	onAddSelected(){
		this.selectedAvaiableTables.forEach(t => {
			let el = this.availableTables.filter((at:any) => at.id == t)[0];
			this.scheduleConfig.safxTables.push(el);
			let i = this.availableTables.indexOf(el);
			this.availableTables.splice(i, 1);
		});
		this.scheduleConfig.safxTables.sort((a:any,b:any) => a.id-b.id);
		this.selectedAvaiableTables = [];
	}
	
	onAddAvailable(){
		let someSafxTableUsedInCriteria = false;
		this.selectedSelectedTables.forEach(t => {
			this.scheduleConfig.criterias.forEach((criteria: any) => {
				if (criteria.safxColumn.safxTable.id == t){
					someSafxTableUsedInCriteria = true;
				}
			});
		});
		if (!someSafxTableUsedInCriteria){
			this.selectedSelectedTables.forEach(t => {
				let el = this.scheduleConfig.safxTables.filter((at:any) => at.id == t)[0];
				this.availableTables.push(el);
				let i = this.scheduleConfig.safxTables.indexOf(el);
				this.scheduleConfig.safxTables.splice(i, 1);
			});
			this.availableTables.sort((a:any,b:any) => a.id-b.id);
			this.selectedSelectedTables = [];
		}else{
			alert("Existe tabela que esta sendo usadas em critérios. Remover os critérios corespondentes");
		}
	}
	
	onAdd(){
		//alert(JSON.stringify(this.criteria));
		if (this.criteria.operator != 'empty' && this.criteria.operator != 'not empty' 
			&& (!this.criteria.value || this.criteria.value == '')){
			alert("Preencher o valor do critério");
			return;
		}
		if (this.criteria.operator == 'between' && (!this.criteria.additionalValue || this.criteria.additionalValue == '')){
			alert("Preencher o valor final do critério");
			return;
		}
		
		let safxColumnName = this.safxColumns.filter((c:any) => c.id == this.criteria.safxColumn.id)[0].name;
		this.criteria.safxColumn.name = safxColumnName;
		//update the main list
		this.scheduleConfig.criterias.splice(0, 0, this.criteria); 
		this.criteria = { 'safxColumn' : { 'safxTable' : {'id' : null } } };
		this.valueType = 'inputText';
		this.calcTotalPages();
		this.onPage(this.pagination.page);
	}

	onDelete(criteria: any){
		let criteriaFound = this.scheduleConfig.criterias.indexOf(criteria);
		//alert("criteriaFound:" + criteriaFound);
		this.scheduleConfig.criterias.splice(criteriaFound, 1);
		this.calcTotalPages();
		if (this.pagination.page == this.totalPages){
			this.pagination.page = this.totalPages-1;
		}
		this.onPage(this.pagination.page);
	}
	
	onBack(){
		this.router.navigate(['schedule-list']);
	}
	
	onOperatorChange(){
	}
	
	onPage(page: number){
		//alert("onPage:" + page);
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			let start = this.pagination.page*this.pagination.size;
			this.criteriasOnePage = this.scheduleConfig.criterias.slice(start, start + this.pagination.size);
		}
		
	}

	onSave(){
		//alert("scheduleConfig:" + JSON.stringify(this.scheduleConfig.criterias));
		if (!this.valid()){
			return;
		}
		this.generateDaysValue();
		this.generateHoursValue();
		this.scheduleService.save(this.scheduleConfig).subscribe((response:any) => {
			alert("Agendamento salvo com sucesso");
		});
		
	}
	
	valid(){
		if (!this.scheduleConfig.name || this.scheduleConfig.name == ''){
			alert("Nome obrigatório");
			return false;
		}
		
		if (this.scheduleConfig.safxTables.length == 0){
			alert("Adicione tabela SAFX");
			return false;
		}
		return true;
	}
	
	findTableName(id: any){
		return this.scheduleConfig.safxTables.filter((at:any) => at.id == id)[0].name;
	}

	onGetColumns(){
		this.scheduleService.safxColumns(this.criteria.safxColumn.safxTable.id).subscribe((response: any) => {
			this.safxColumns = response;
		});
	}
	
	onProcess(){
		/*this.http.get(this.baseApi + `schedules/${this.scheduleConfig.id}/process`)
		.subscribe((response : any) => {
			alert("Test de Execucao do Agendamento realizado com sucesso");
		});
		*/
	}
	
	onDateNumericKeydown(e: any){
	  //alert("e.keyCode:" + e.keyCode);
		console.log(e);
		return this.isNumericInputKey(e);
	}
	
	onDateCheck(){
		this.criteria.value = '';
		this.criteria.additionalValue = '';
	}
	
	isNumericInputKey(e: any){
		let specialKeys = [8, 37, 38, 39, 40, 46];
		let numberKeys = [49, 50, 51, 52, 53, 54, 55, 56, 57];
		if (specialKeys.includes(e.keyCode) ||
			numberKeys.includes(e.keyCode)){
			return true;
		}else{
			return false;
		}
	}
	
}