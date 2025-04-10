import { Injectable } from '@angular/core';

import { HttpClientWrapper } from '../../components/httpclientwrapper';

import { environment } from './../../../environments/environment';


@Injectable()
export class AlertService{
	private baseApi = environment.baseApi;
	
	constructor(private http: HttpClientWrapper){}
	
	loadEmails(){
		return this.http.get(this.baseApi + 'emails?page=0&size=1000');
	}

	onDelete(id: number){
		return this.http.delete(this.baseApi + `emails/${id}`);
	}

	onSave(emails: any[]){
		return this.http.post(this.baseApi +  'emails', emails);
	}

}
