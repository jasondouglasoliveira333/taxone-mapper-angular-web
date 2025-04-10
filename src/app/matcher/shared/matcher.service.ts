import { Injectable } from '@angular/core';

import { HttpClientWrapper } from '../../components/httpclientwrapper';
import { Paginator } from '../../components/common/model';


import { environment } from './../../../environments/environment';


@Injectable()
export class MatcherService{
	private baseApi = environment.baseApi;
	
	constructor(private http: HttpClientWrapper){}
	
	loadSAFXTables(filter: string, pagination: Paginator){
		return this.http.get(this.baseApi + `safxTables?page=${pagination.page}&size=${pagination.size}` + filter);
	}

	loadSAFXTable(selectedTableId: number){
		return this.http.get(this.baseApi + `safxTables/${selectedTableId}`);
	}

	loadSAFXColumns(selectedTableId: number){
		return this.http.get(this.baseApi + `safxTables/${selectedTableId}/safxColumns`);
	}

	loadDSTables(){
		return this.http.get(this.baseApi + 'dsTables');
	}
	
	loadDSColumns(selectedDsTableId: number, dsPagination: Paginator){
		return this.http.get(this.baseApi + `dsTables/${selectedDsTableId}/dsColumns?
				page=${dsPagination.page}&size=${dsPagination.size}`);
	}

	saveDSTAble(selectedTableId: number, selectedDsTableId: number){
		return this.http.put(this.baseApi + `safxTables/${selectedTableId}/dsTables/${selectedDsTableId}`, null);
	}

	saveSAFXTAble(selectedTableId: number, safxColumnsFull : any[]) {
		return this.http.put(this.baseApi + `safxTables/${selectedTableId}/safxColumns`, safxColumnsFull);
	}

}
