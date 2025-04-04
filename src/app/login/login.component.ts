import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    standalone: false
})

export class LoginComponent{
	private baseApi = environment.baseApi;
	public user: any = {};
	
	constructor(private http: HttpClient, private router: Router){
		//sessionStorage.removeItem("token");
		if (sessionStorage.getItem("token")){
			//alert("Has token");
			//this.router.navigate(['upload']);
		}
	}
	
	onLogin(){
		if (!this.valid()){
			alert("Todos os campos são obrigatórios");
			return;
		}
		
		this.http.post(this.baseApi + 'authenticate', this.user)
		.subscribe((response: any) => {
			//alert('response:' + JSON.stringify(response));
			console.log("response.token:" + response.token);
			sessionStorage.setItem("token", response.token);
			this.router.navigate(['upload']);
		}, error => {
			alert("Login inválido");
		});
	}
	
	valid(){
		if (!this.user.username ||  this.user.username == ''){
			return false;
		}
		if (!this.user.password ||  this.user.password == ''){
			return false;
		}
		return true;
	}
	
}