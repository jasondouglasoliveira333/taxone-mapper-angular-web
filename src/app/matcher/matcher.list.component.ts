import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';


@Component({
    selector: "matcher-list",
    templateUrl: "matcher.list.component.html",
	imports: [CommonModule, FormsModule, PaginationComponent]
})
export class MatcherListComponent {
	private baseApi = environment.baseApi;

	public tableName : string = '';
	public justAssociated: boolean = false;
	public safTables: any[]  = [];
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();
	
	constructor(private router: Router, private http: HttpClientWrapper){
		this.loadSAFXTables();
	}
	
	loadSAFXTables(){
		let filter = '';
		if (this.tableName != ''){
			filter = '&tableName=' + this.tableName;
		}
		filter += '&justAssociated=' + this.justAssociated;
		
		this.http.get(this.baseApi + `safxTables?page=${this.pagination.page}&size=${this.pagination.size}` + filter)
		.subscribe( (response : any) => {
			//alert("ok:" + response);
			this.safTables = response.content;
			this.totalPages = response.totalPages;
		});
	}
	
	onFilter(){
		this.loadSAFXTables();
	}

	onPage(page: number){
		//alert("onPage:" + page);
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			this.loadSAFXTables();
		}
	}
	
	onEdit(id: number){
		this.router.navigate(['matcher', id]);
	}
	
}