import { Component, Input, inject, Self, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';


import { SimpleService } from '../components/simple.service';


@Component({
    selector: 'join-inner',
    templateUrl: 'join-inner.component.html',
	imports: [CommonModule, FormsModule]
})
export class JoinInnerComponent {
	
	//simpleService = inject(SimpleService, { optional: true});
	
	constructor(@Optional() private simpleService: SimpleService){}
	
	log(){
		this.simpleService?.log("Here!");
	}
}


@Component({
    selector: 'join',
    templateUrl: 'join.component.html',
	imports: [ CommonModule, FormsModule, JoinInnerComponent],
	providers: [ SimpleService ]
})
export class JoinComponent {
	
	simpleService = inject(SimpleService, { optional: true});
	
	constructor(){
		console.log('in JoinComponent.constructor');
	}
	
	@Input()
	set name(j: string) {
		console.log('in JoinComponent.name:' + j);
	}
	
	log(){
		//this.simpleService?.log("Here!");
	}

}