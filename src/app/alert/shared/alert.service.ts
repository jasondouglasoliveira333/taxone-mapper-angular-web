import { Injectable } from '@angular/core';

import { HttpClientWrapper } from '../../components/httpclientwrapper';
import { Email, EmailPage } from '../../components/common/model';

import { environment } from './../../../environments/environment';


@Injectable()
export class AlertService{
	private baseApi = environment.baseApi;
	
	constructor(private http: HttpClientWrapper){}
	
	loadEmails(){
		return this.http.getaa<EmailPage>(this.baseApi + 'emails?page=0&size=1000');
	}

	onDelete(id: number){
		return this.http.delete(this.baseApi + `emails/${id}`);
	}

	onSave(emails: Email[]){
		return this.http.postaa<Email[]>(this.baseApi +  'emails', emails);
	}

}
