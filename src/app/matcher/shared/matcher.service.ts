import { Injectable } from '@angular/core';

import { HttpClientWrapper } from '../../components/httpclientwrapper';
import { Paginator, SAFXTable, SAFXTablePage, SAFXColumn, DSTable, DSColumn, DSColumnPage } from '../../components/common/model';


import { environment } from './../../../environments/environment';


@Injectable()
export class MatcherService{
	private baseApi = environment.baseApi;
	
	constructor(private http: HttpClientWrapper){}
	
	safxTables(filter: string, pagination: Paginator){
		return this.http.getaa<SAFXTablePage>(this.baseApi + `safxTables?page=${pagination.page}&size=${pagination.size}` + filter);
	}

	safxTable(selectedTableId: number){
		return this.http.getaa<SAFXTable>(this.baseApi + `safxTables/${selectedTableId}`);
	}

	safxColumns(selectedTableId: number){
		return this.http.getaa<SAFXColumn[]>(this.baseApi + `safxTables/${selectedTableId}/safxColumns`);
	}

	dsTables(){
		return this.http.getaa<DSTable[]>(this.baseApi + 'dsTables');
	}
	
	dsColumns(selectedDsTableId: number, dsPagination: Paginator){
		return this.http.getaa<DSColumnPage>(this.baseApi + `dsTables/${selectedDsTableId}/dsColumns?
				page=${dsPagination.page}&size=${dsPagination.size}`);
	}

	saveDSTAble(selectedTableId: number, selectedDsTableId: number){
		return this.http.put(this.baseApi + `safxTables/${selectedTableId}/dsTables/${selectedDsTableId}`, null);
	}

	saveSAFXTAble(selectedTableId: number, safxColumnsFull : SAFXColumn[]) {
		return this.http.putaa<SAFXColumn[]>(this.baseApi + `safxTables/${selectedTableId}/safxColumns`, safxColumnsFull);
	}

}
