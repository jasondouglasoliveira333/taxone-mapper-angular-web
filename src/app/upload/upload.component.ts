import { Component, Inject } from '@angular/core';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator } from '../components/common/model';

@Component({
	selector: "upload",
	templateUrl : "upload.component.html"
})
export class UploadComponent {
	private baseApi = environment.baseApi;
	public file: any = null;
	public layoutVersion : string = '';
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();
	
	public uploads: any[] = [];
	
	constructor(private http: HttpClientWrapper){
		this.loadUploads();
	}
	
	loadUploads(){
		this.http.get(this.baseApi + `uploads?page=${this.pagination.page}&size=${this.pagination.size}`)
		.subscribe( (response : any) => {
			//alert("ok:" + response);
			this.uploads = response.content;
			this.totalPages = response.totalPages;
		});
	}
	
	onOpenUpload(){
		let fileInput = document.getElementById('fileInput');
		if (fileInput){
			fileInput.click();
		}
	}
	
    onSelectFiles(e: any) {
		let files = e.target.files;
        this.file = files.item(0);
    }

	onUpload(){
		if (!this.valid()){
			alert("Todos os campos são obrigatorios");
			return;
		}
		const formData = new FormData();
		formData.append('file', this.file);
		formData.append('layoutVersion', this.layoutVersion);
		this.http.post(this.baseApi + "uploads", formData)
		.subscribe(response => {
			alert("Upload realizado com sucesso");
			this.file = null;
			this.layoutVersion = '';
			this.loadUploads();
		}, error => {
			alert("Error realizando o upload");
		});
	}
	
	valid(){
		if (this.file == null || this.layoutVersion == ''){
			return false;
		}else{
			return true;
		}
	}
	
	onPage(page: number){
		//alert("onPage:" + page);
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			this.loadUploads();
		}
	}
}