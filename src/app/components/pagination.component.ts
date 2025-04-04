import { Component, Input, Output, EventEmitter, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Paginator } from './common/model';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
	imports: [CommonModule]//, FormsModule
})

export class PaginationComponent {
	pagination =  input<Paginator>(new Paginator());
	totalPages = input<number>(0);
	x = output<number>({alias: 'page'});
	//@Output("page") page = new EventEmitter<number>();
	
	pages(){
		let pages = new Array();
		for (let x=this.pagination().page; x < this.pagination().page+3 && x < this.totalPages(); x++){
			pages.push(x);
		}
		let length = pages.length;
		for (let x=0; x < Math.min(3, this.totalPages()) - length; x++){
			pages.splice(0,0, pages[0]-1);
		}
		return pages;
	}
	
	onPage(page: number){
		this.x.emit(page);
	}

}


