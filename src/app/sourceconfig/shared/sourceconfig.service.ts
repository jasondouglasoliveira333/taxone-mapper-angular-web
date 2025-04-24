import { Injectable } from '@angular/core';

import { HttpClientWrapper } from '../../components/httpclientwrapper';
import { Paginator } from '../../components/common/model';


import { environment } from './../../../environments/environment';


@Injectable()
export class SourceConfigService{
	private baseApi = environment.baseApi;
	
	constructor(private http: HttpClientWrapper){}

	loadDataSources(){
		return this.http.get(this.baseApi + "dataSourceConfigs");
	}

	loadDataSourceConfig(dataSourceType: string){
		return this.http.get(this.baseApi + `dataSourceConfigs/${dataSourceType}`);
	}

	loadDSTables(dataSourceType: string){
		return this.http.get(this.baseApi + `dataSourceConfigs/${dataSourceType}/dsTables`);
	}
	
	loadDSColumns(dataSourceType: string, dsTableId: number, paginator: Paginator){
		return this.http.get(this.baseApi + `dataSourceConfigs/${dataSourceType}/dsTables/${dsTableId}/dsColumns
			?page=${paginator.page}&size=${paginator.size}`);
	}
	
	metadata(dataSourceType: string, dataSourceConfig: any){
		return this.http.post(this.baseApi + `dataSourceConfigs/${dataSourceType}/metadata`, dataSourceConfig)
	}
	
	save(dataSourceType: string, dataSourceConfig: any){
		return this.http.post(this.baseApi + `dataSourceConfigs/${dataSourceType}`, dataSourceConfig);
	}
}

