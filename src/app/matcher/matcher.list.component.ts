import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Paginator, SAFXTable, SAFXTablePage } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';
import { MatcherService } from './shared/matcher.service';

import { environment } from './../../environments/environment';

@Component({
    selector: "matcher-list",
    templateUrl: "matcher.list.component.html",
	imports: [CommonModule, FormsModule, PaginationComponent],
	providers: [MatcherService] 
})
export class MatcherListComponent {
	private baseApi = environment.baseApi;

	public tableName : string = '';
	public justAssociated: boolean = false;
	public safTables: SAFXTable[]  = [];
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();
	
	constructor(private router: Router, private matcherService: MatcherService){
		this.loadSAFXTables();
	}
	
	loadSAFXTables(){
		let filter = '';
		if (this.tableName != ''){
			filter = '&tableName=' + this.tableName;
		}
		filter += '&justAssociated=' + this.justAssociated;
		
		this.matcherService.safxTables(filter, this.pagination)
		.subscribe( (response : SAFXTablePage) => {
			this.safTables = response.content;
			this.totalPages = response.totalPages;
		});
	}
	
	onFilter(){
		this.loadSAFXTables();
	}

	onPage(page: number){
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			this.loadSAFXTables();
		}
	}
	
	onEdit(id: number | null){
		this.router.navigate(['matcher', id]);
	}
	
}