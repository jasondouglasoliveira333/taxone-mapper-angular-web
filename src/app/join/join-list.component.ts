import { Component, inject, Self, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';


import { SimpleService } from '../components/simple.service';


@Component({
    selector: 'join-list',
    templateUrl: 'join-list.component.html',
	imports: [ CommonModule, FormsModule, RouterLink],
})
export class JoinListComponent {
	private baseApi = environment.baseApi;
	private schedules: Array<any> = [];
	private totalPages = 0; 
	js = [1,2,3];
	public file: any = null;

	
	constructor(private http: HttpClient){
/*
		this.http.get(this.baseApi + 'schedules', {params: {'name': 'WE'}, observe: 'response', headers: {'Connection': 'keep-alive'}})
		.subscribe((response : any) => {
			console.log(response);
			alert("this.schedules:" + JSON.stringify(response));
			this.schedules = response.body.content;
			alert("this.schedules:" + JSON.stringify(this.schedules));
			this.totalPages = response.body.totalPages;
		});
*/		
	}
	
	onSelectFiles(e: any) {
		let files = e.target.files;
        this.file = files.item(0);
    }

	upload(){
		const formData = new FormData();
		formData.append('file', this.file);
		this.http.post(this.baseApi + "uploads/progress", formData, { reportProgress: true,  observe: 'events' })
		.subscribe(response => {
			switch (response.type) {
				case HttpEventType.UploadProgress:
					console.log('Uploaded ' + response.loaded + ' out of ' + response.total + ' bytes');
					break;
				case HttpEventType.Response:
					console.log(response);
					alert("Upload realizado com sucesso");
					this.file = null;
					break;
			  }
		}, error => {
			console.log(error);
			alert("Error realizando o upload");
		});
	}

	download(){
		//let url = this.baseApi + "downloads/progress";
		let url = "http://localhost:4200/assets/zip/glassfish-7.0.23.zip";
		//let url = "https://drive.usercontent.google.com/download?id=1bQl3wVaNLTqjNTvns-b7Xmk4QOrLv8w0&export=downloadvauthuser=0&confirm=t&uuid=e013a0f8-a3d3-4ad6-afb2-9d362d43d100&at=APcmpoxkaBH6Fvg-5eDgfdibBHqE:1744225813661";
		this.http.get(url, { reportProgress: true,  observe: 'events' })
		.subscribe(response => {
			console.log(response);
			switch (response.type) {
				case HttpEventType.DownloadProgress:
					console.log('Uploaded ' + response.loaded + ' out of ' + response.total + ' bytes');
					break;
				case HttpEventType.Response:
					console.log(response);
					alert("Download realizado com sucesso");
					break;
			  }
		}, error => {
			console.log(error);
			alert("Error realizando o upload");
		});
	}


/*
	upload(){
		const formData = new FormData();
		formData.append('file', this.file);
		//formData.append('layoutVersion', '1');
		this.http.post(this.baseApi + "uploads/progress", formData)
		.subscribe(response => {
			console.log(response);
			alert("Upload realizado com sucesso");
			this.file = null;
		}, error => {
			console.log(error);
			alert("Error realizando o upload");
		});
	}
*/
	
	
}