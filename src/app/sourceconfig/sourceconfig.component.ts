import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator, SourceConfig, DSColumn, DSColumnPage, DSTable } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';
import { SourceConfigService } from './shared/sourceconfig.service';


@Component({
    selector: 'sourceconfig',
    templateUrl: 'sourceconfig.component.html',
	imports: [CommonModule, FormsModule, PaginationComponent],
	providers: [SourceConfigService]
})

export class SourceConfigComponent {
	private baseApi = environment.baseApi;
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();

	public dataSourceType : string = '';
	public dsTableId : number = 0;
	
	public dataSourceConfig : SourceConfig = new SourceConfig();
	public dsTables: DSTable[] = [];
	public dsColumns: DSColumn[] = [];
	
	constructor(private route: ActivatedRoute, private router: Router, private sourceConfigService: SourceConfigService){
		this.dataSourceType = this.route.snapshot.paramMap.get('sourceType')!;
		let operation = this.route.snapshot.paramMap.get('operation')!;
		if (operation == 'A') {
			this.dataSourceConfig = new SourceConfig();
			this.dataSourceConfig.dataSourceType = this.dataSourceType;
		}else{
			this.loadDataSourceConfig();
		}
		this.loadDSTables();
		
	}
	
	loadDataSourceConfig(){
		this.sourceConfigService.dataSourceConfig(this.dataSourceType)
		.subscribe( (response : SourceConfig) => {
			this.dataSourceConfig = response;
		});
	}

	loadDSTables(){
		this.sourceConfigService.dsTables(this.dataSourceType)
		.subscribe( (response : DSTable[]) => {
			this.dsTables = response;
			if (this.dsTables.length > 0 && this.dsTables[0].id != null){
				this.dsTableId = this.dsTables[0].id;
				this.loadDSColumns();
			}
		});
	}

	loadDSColumns(){
		this.sourceConfigService.dsColumns(this.dataSourceType, this.dsTableId, this.pagination)
		.subscribe( (response : DSColumnPage) => {
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
		this.sourceConfigService.metadata(this.dataSourceType, this.dataSourceConfig)
		.subscribe( () => {
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
		
		this.sourceConfigService.save(this.dataSourceType, this.dataSourceConfig)
		.subscribe( () => {
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