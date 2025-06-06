import { Injectable } from '@angular/core';

import { HttpClientWrapper } from '../../components/httpclientwrapper';
import { Paginator, SourceConfig, DSTable, DSColumnPage } from '../../components/common/model';


import { environment } from './../../../environments/environment';


@Injectable()
export class SourceConfigService{
	private baseApi = environment.baseApi;
	
	constructor(private http: HttpClientWrapper){}

	dataSources(){
		return this.http.get<SourceConfig[]>(this.baseApi + "dataSourceConfigs");
	}

	dataSourceConfig(dataSourceType: string){
		return this.http.get<SourceConfig>(this.baseApi + `dataSourceConfigs/${dataSourceType}`);
	}

	dsTables(dataSourceType: string){
		return this.http.get<DSTable[]>(this.baseApi + `dataSourceConfigs/${dataSourceType}/dsTables`);
	}
	
	dsColumns(dataSourceType: string, dsTableId: number, paginator: Paginator){
		return this.http.get<DSColumnPage>(this.baseApi + `dataSourceConfigs/${dataSourceType}/dsTables/${dsTableId}/dsColumns
			?page=${paginator.page}&size=${paginator.size}`);
	}
	
	metadata(dataSourceType: string, dataSourceConfig: SourceConfig){
		return this.http.post<SourceConfig>(this.baseApi + `dataSourceConfigs/${dataSourceType}/metadata`, dataSourceConfig);
	}
	
	save(dataSourceType: string, dataSourceConfig: SourceConfig){
		return this.http.post<SourceConfig>(this.baseApi + `dataSourceConfigs/${dataSourceType}`, dataSourceConfig);
	}
}

