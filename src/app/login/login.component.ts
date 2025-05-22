import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { environment } from './../../environments/environment';

import { LoginService } from './shared/login.service';


@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
	imports: [CommonModule, FormsModule], 
	providers: [LoginService]
})

export class LoginComponent{
	private baseApi = environment.baseApi;
	public user: any = {};
	
	constructor(private router: Router, private loginService: LoginService){
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
		
		this.loginService.login(this.user)
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