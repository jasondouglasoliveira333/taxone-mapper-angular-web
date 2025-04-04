import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';


@Component({
    selector: 'sourceconfig',
    templateUrl: 'sourceconfig.component.html',
	imports: [CommonModule, FormsModule, PaginationComponent]
})

export class SourceConfigComponent {
	private baseApi = environment.baseApi;
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();

	public dataSourceType : string = '';
	public dsTableId : number = 0;
	
	public dataSourceConfig : any;
	public dsTables: any[] = [];
	public dsColumns: any[] = [];
	
	constructor(private http: HttpClientWrapper, private route: ActivatedRoute, private router: Router){
		this.dataSourceType = this.route.snapshot.paramMap.get('sourceType')!;
		let operation = this.route.snapshot.paramMap.get('operation')!;
		if (operation == 'A') {
			this.dataSourceConfig = {
				dataSourceType: this.dataSourceType
			}
		}else{
			this.loadDataSourceConfig();
		}
		this.loadDSTables();
		
	}
	
	loadDataSourceConfig(){
		this.http.get(this.baseApi + `dataSourceConfigs/${this.dataSourceType}`)
		.subscribe( (response : any) => {
			//alert(JSON.stringify(response));
			this.dataSourceConfig = response;
		});
	}

	loadDSTables(){
		this.http.get(this.baseApi + `dataSourceConfigs/${this.dataSourceType}/dsTables`)
		.subscribe( (response : any) => {
			this.dsTables = response;
			if (this.dsTables.length > 0){
				this.dsTableId = this.dsTables[0].id;
				this.loadDSColumns();
			}
		});
	}

	loadDSColumns(){
		this.http.get(this.baseApi + `dataSourceConfigs/${this.dataSourceType}/dsTables/${this.dsTableId}/dsColumns
			?page=${this.pagination.page}&size=${this.pagination.size}`)
		.subscribe( (response : any) => {
			//alert("ok:" + response);
			this.dsColumns = response.content;
			this.totalPages = response.totalPages;
		});
	}
	
	valid(){
		let valid = false;
		if (!this.dataSourceConfig.url || this.dataSourceConfig.url == ''){
			return false;
		}
		if (!this.dataSourceConfig.resourceNames || this.dataSourceConfig.resourceNames == ''){
			return false;
		}

		if (this.dataSourceConfig.dataSourceType != 'TXT'){
			if (!this.dataSourceConfig.username || this.dataSourceConfig.username == ''){
				return false;
			}
			if (!this.dataSourceConfig.password || this.dataSourceConfig.password == ''){
				return false;
			}
		}
		return true;
	}

	onDSCnage(ev: any){
		this.dsTableId = ev.target.value;
		this.pagination.page = 0;
		this.loadDSColumns();
	}

	
	onGetMetadata(){
		if (!this.valid()){
			alert("Todos os campos são obrigatórios");
			return;
		}
		this.http.post(this.baseApi + `dataSourceConfigs/${this.dataSourceType}/metadata`, this.dataSourceConfig)
		.subscribe( (response : any) => {
			this.loadDSTables();
			alert("Metadata obtido com sucesso");
		}, error => {
			alert("Erro obtendo o metadata");
		});
	}
	
	onSave(){
		if (!this.valid()){
			alert("Todos os campos são obrigatórios");
			return;
		}
		this.http.post(this.baseApi + `dataSourceConfigs/${this.dataSourceType}`, this.dataSourceConfig)
		.subscribe( (response : any) => {
			alert("Datasource salvo com sucesso!");
			this.loadDSTables();
		}, error => {
			alert("Erro salvando Datasource");
		});
	}
	
	onPage(page: number){
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			this.loadDSColumns();
		}
	}

	onBack(){
		this.router.navigate(['sourceconfig-list']);
	}
	
}