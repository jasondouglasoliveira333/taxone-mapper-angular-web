import { Component, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';

import { LoadingService } from './components/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public resourcePath: string = '';
  public loading: boolean = false;
	
  constructor(private router: Router, public loadingService: LoadingService){
    if (isDevMode()){
		alert("isDevMode");
	}else{
		alert("production");
	}
	
	this.treatImagePath(document.URL);
	this.loadingService.loading
	.subscribe((loading: boolean) => {
		this.loading = loading;
	});
  }
	
  treatImagePath(url: string){
	let slashIdx = url.lastIndexOf("/");
	if  (slashIdx != -1){
		this.resourcePath = url.substring(0, slashIdx);
	}else{
		this.resourcePath = url;
	}
  }

  isLogged(){
	  return sessionStorage.getItem("token") != null;
  }
	
  onNavigate(path: string){
    this.router.navigate([path]);
  }
}