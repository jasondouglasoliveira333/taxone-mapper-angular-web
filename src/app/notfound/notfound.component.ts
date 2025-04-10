import { Component } from '@angular/core';
import { environment } from './../../environments/environment';



@Component({
    selector: 'notfound',
    templateUrl: 'notfound.component.html'
})
export class NotFoundComponent {
	
	constructor(){
		console.log('in NotFoundComponent.constructor');
	}

}