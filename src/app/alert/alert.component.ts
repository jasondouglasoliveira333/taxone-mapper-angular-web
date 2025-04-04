import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';


@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
	imports: [CommonModule, FormsModule, PaginationComponent]
})

export class AlertComponent {
	private baseApi = environment.baseApi;
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();

	public notificationTypes: string[] = ['ALL', 'OK', 'ERROR'];
	
	public emails: any[] = [];
	public emailsFull: any[] = [];
	
	public email: any = {};
	
	constructor(private router: Router, private http: HttpClientWrapper){
		this.loadEmails();
	}
	
	loadEmails(){
		this.http.get(this.baseApi + 'emails?page=0&size=1000')
		.subscribe((response : any) => {
			this.emailsFull = response.content;
			this.totalPages = this.calcPages();
			//alert("this.totalPages:" + this.totalPages);
			this.emails = this.emailsFull.slice(0, this.pagination.size);
		});
	}
	
	calcPages(){
		let pages = Math.trunc(this.emailsFull.length / this.pagination.size);
		if (this.emailsFull.length%this.pagination.size != 0){
			pages++;
		}
		return pages;
	}
	
	valid(){
		if (!this.email.email || this.email.email == ''){
			return false;
		}
		
		if (!this.email.type || this.email.type == ''){
			return false;
		}
		
		return true;
	}
	
	onDelete(id: number){
		this.http.delete(this.baseApi + `emails/${id}`)
		.subscribe(() => {
			alert("Email excluido com sucesso");
			this.loadEmails();
		});
	}
	
	onAdd(){
		if (!this.valid()){
			alert("Todos os campos são oberigatório");
			return;
		}
		
		this.emailsFull.splice(0,0,this.email);
		this.email = {};
		this.totalPages = this.calcPages(); 
		this.onPage(this.pagination.page);
	}
	
	onSave(){
		this.http.post(this.baseApi +  'emails', this.emails)
		.subscribe((response : any) => {
			alert("Email salvo com sucesso");
		}, error => {
			alert("Erro salvando email");
		});

	}
	
	onPage(page: number){
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			let start = this.pagination.page*this.pagination.size;
			this.emails = this.emailsFull.slice(start, start + this.pagination.size);
		}
	}	
}