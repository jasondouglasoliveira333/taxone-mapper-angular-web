import { Injectable } from '@angular/core';

import { HttpClientWrapper } from '../../components/httpclientwrapper';
import { Paginator, UploadPage } from '../../components/common/model';


import { environment } from './../../../environments/environment';


@Injectable()
export class UploadService{
	private baseApi = environment.baseApi;
	
	constructor(private http: HttpClientWrapper){}

	uploads(pagination: Paginator){
		return this.http.getaa<UploadPage>(this.baseApi + `uploads?page=${pagination.page}&size=${pagination.size}`);
	}
	
	upload(formData: FormData){
		return this.http.postaa<FormData>(this.baseApi + "uploads", formData);
	}
}

