import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from './../../environments/environment';

import { HttpClientWrapper } from '../components/httpclientwrapper';
import { Paginator } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';
import { UploadService } from './shared/upload.service';

@Component({
    selector: "upload",
    templateUrl: "upload.component.html",
	imports: [CommonModule, FormsModule, PaginationComponent],
	providers: [UploadService]
})
export class UploadComponent {
	private baseApi = environment.baseApi;
	public file: any = null;
	public layoutVersion : string = '';
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();
	
	public uploads: any[] = [];
	
	constructor(private uploadService: UploadService){
		this.loadUploads();
	}
	
	loadUploads(){
		this.uploadService.uploads(this.pagination)
		.subscribe( (response : any) => {
			//alert("ok:" + response);
			this.uploads = response.content;
			this.totalPages = response.totalPages;
		});
	}
	
	showUps(){
		alert(JSON.stringify(this.uploads));
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
		this.uploadService.upload(formData)
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