import { Component, isDevMode } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from './../environments/environment';

import { LoadingService } from './components/loading.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterOutlet]
})
export class AppComponent {
  public resourcePath: string = '';
  public loading: boolean = false;
  public lat = -23.5438633;
  public lng = -46.8155989;
  public zoom = 16;
//  public lat = 51.678418;
//  public lng = 7.809007;
	
  constructor(private router: Router, public loadingService: LoadingService){
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
	  return sessionStorage.getItem("token") == null;
  }
	
  onNavigate(path: string){
    this.router.navigate([path]);
  }
}