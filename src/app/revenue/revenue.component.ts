import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator } from '../components/common/model';

@Component({
    selector: 'revenue',
    templateUrl: 'revenue.component.html',
    imports: [CommonModule, FormsModule]
})
export class RevenueComponent {
	private baseApi = environment.baseApi;

	public resourcePath : any;
	public revenue : any = {};
	public resourceSources : Array<ResourceSource> = [];
	public quotas : Array<any>  = [];

	constructor(private http: HttpClientWrapper, private route: ActivatedRoute, private router: Router){
		this.treatImagePath(document.URL);
	}
	
	treatImagePath(url: string){
		let slashIdx = url.lastIndexOf("/");
		if  (slashIdx != -1){
			this.resourcePath = url.substring(0, slashIdx);
		}else{
			this.resourcePath = url;
		}
	}
	
	valid(){
		let valid = false;
		if (!this.revenue.reducedCode || this.revenue.reducedCode == ''){
			return false;
		}
		if (!this.revenue.degree || this.revenue.degree == ''){
			return false;
		}
		if (!this.revenue.openingDate || this.revenue.openingDate == ''){
			return false;
		}
		if (!this.revenue.description || this.revenue.description == ''){
			return false;
		}

		return true;
	}
	onSave(){
		if (!this.valid()){
			alert("Todos os campos são obrigatórios");
			return;
		}
		alert('JSON.stringify(this.revenue):' + JSON.stringify(this.revenue))
		
		this.http.post(this.baseApi + `revenues/`, this.revenue)
		.subscribe( (response : any) => {
			alert("Datasource salvo com sucesso!");
		}, error => {
			alert("Erro salvando Datasource");
		});
	}
	
	onEdit(id: string){
		alert('onEdit:' + id)
	}
	
	onBack(){
		this.router.navigate(['sourceconfig-list']);
	}
	
}

export class ResourceSource{
	dataSourceType: string = "";
	resourceSourceDescription: string = "";
	applicationDescription: string = "";
	percentual: string = "";
}