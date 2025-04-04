import { Component, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { LoadingService } from '../components/loading.service';

@Component({
    selector: 'sourceconfig-list',
    templateUrl: 'sourceconfig.list.component.html',
	imports: [CommonModule, FormsModule]
})

export class SourceConfigListComponent {
	private baseApi = environment.baseApi;
	
	public sourceTypes: string[] = ['Database', 'TXT', 'FTP'];
	
	public dataSourceConfigs: any[] = [];
	
	public sourceType: string = 'Database';
	
	incr = 1;

	//public doubleSignal : Signal<number> = computed(() => this.loadingService.count() * 3);
	public doubleSignal : Signal<number> = computed(() => this.loadingService.customer().shared * 3);

	
	constructor(private router: Router, private http: HttpClientWrapper, private loadingService: LoadingService){
		this.loadDataSources();
	}
	
	loadDataSources(){
		this.http.get(this.baseApi + "dataSourceConfigs").
		subscribe( (response : any) => {
			this.dataSourceConfigs = response;
			//remove the sourceTypes already used
			this.dataSourceConfigs.forEach(dsc => {
				let idx = this.sourceTypes.indexOf(dsc.dataSourceType);
				//this.sourceTypes.splice(idx, 1);
			});
		}, error => {
			alert("Error listing the datasources");
		});
	}
	
	onEdit(sourceType: string){
		this.router.navigate(['sourceconfig', sourceType, 'E']);
	}
	
	onAdd(sourceType: string){
		this.router.navigate(['sourceconfig', sourceType, 'A']);
	}

	increaseCount(){
		//this.count.update(value => value + 1);
		//this.loadingService.count.update(value => value + 1);
		
		let p = this.loadingService.customer();
		alert("p.shared:" + p.shared);
		p.shared = 10 * this.incr;
		this.incr++;
		//this.loadingService.customer.set(null);
		this.loadingService.customer.set(p);

		
	}
	
}