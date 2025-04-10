import { Injectable } from '@angular/core';

@Injectable(
	//{ providedIn: 'root' }
)
export class SimpleService {
	
	log(value: string){
		console.log("In SimpleService.log:" + value);
	}
}