import { Injectable } from '@angular/core';

import { HttpClientWrapper } from '../../components/httpclientwrapper';
import { Paginator, SAFXTable, SAFXTablePage, SAFXColumn, DSTable, DSColumn, DSColumnPage } from '../../components/common/model';


import { environment } from './../../../environments/environment';


@Injectable()
export class MatcherService{
	private baseApi = environment.baseApi;
	
	constructor(private http: HttpClientWrapper){}
	
	safxTables(filter: string, pagination: Paginator){
		return this.http.get<SAFXTablePage>(this.baseApi + `safxTables?page=${pagination.page}&size=${pagination.size}` + filter);
	}

	safxTable(selectedTableId: number){
		return this.http.get<SAFXTable>(this.baseApi + `safxTables/${selectedTableId}`);
	}

	safxColumns(selectedTableId: number){
		return this.http.get<SAFXColumn[]>(this.baseApi + `safxTables/${selectedTableId}/safxColumns`);
	}

	dsTables(){
		return this.http.get<DSTable[]>(this.baseApi + 'dsTables');
	}
	
	dsColumns(selectedDsTableId: number, dsPagination: Paginator){
		return this.http.get<DSColumnPage>(this.baseApi + `dsTables/${selectedDsTableId}/dsColumns?
				page=${dsPagination.page}&size=${dsPagination.size}`);
	}

	saveDSTAble(selectedTableId: number, selectedDsTableId: number){
		return this.http.put(this.baseApi + `safxTables/${selectedTableId}/dsTables/${selectedDsTableId}`, null);
	}

	saveSAFXTAble(selectedTableId: number, safxColumnsFull : SAFXColumn[]) {
		return this.http.put<SAFXColumn[]>(this.baseApi + `safxTables/${selectedTableId}/safxColumns`, safxColumnsFull);
	}

}
