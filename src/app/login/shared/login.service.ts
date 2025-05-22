import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';


@Injectable()
export class LoginService{
	private baseApi = environment.baseApi;
	
	constructor(private http: HttpClient){}
	

	login(user: any){
		return this.http.post(this.baseApi + 'authenticate', user);
	}

}
