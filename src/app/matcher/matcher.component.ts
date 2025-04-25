import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Paginator, SAFXTable, SAFXColumn, DSTable, DSColumnPage, DSColumn } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';
import { MatcherService } from './shared/matcher.service';

@Component({
    selector: 'matcher',
    templateUrl: 'matcher.component.html',
	imports: [CommonModule, FormsModule, PaginationComponent],
	providers: [MatcherService] 
})

export class MatcherComponent {
	
	public safxTableName: string = ''; 

	public safxColumnsFull : SAFXColumn[]  = [];
	
	public safxColumns : SAFXColumn[]  = [];

	public dsTables : DSTable[] = [];

	public dsColumns : DSColumn[] = [];

	public selectedTableId: number  = 0;
	
	public selectedDsTableId: number = 0;
	
	public selectedTable: number = 0;
	
	public safxTotalPages : number = 0;
	public safxPagination : Paginator = new Paginator();

	public dsTotalPages : number = 0;
	public dsPagination : Paginator = new Paginator();

	constructor(private route: ActivatedRoute, private router: Router, private matcherService: MatcherService){
		this.selectedTableId = parseInt(route.snapshot.paramMap.get('tableName')!);
		this.loadSAFXTable();
		this.loadSAFXColumns();
		this.loadDSTables();
		
	}
	
	loadSAFXTable(){
		this.matcherService.safxTable(this.selectedTableId)
		.subscribe( (response : SAFXTable) => {
			this.safxTableName = response.name!;
			this.selectedDsTableId = response.dsTableId!;
			this.selectedTable = this.selectedDsTableId;
			this.loadDSColumns();
		});
	}
	
	loadSAFXColumns(){
		this.matcherService.safxColumns(this.selectedTableId).
		subscribe( (response : SAFXColumn[]) => {
			this.safxColumnsFull = response;
			let pages = Math.trunc(response.length / this.safxPagination.size);
			if (response.length%this.safxPagination.size != 0){
				pages++;
			}
			this.safxTotalPages = pages;
			this.safxColumns = this.safxColumnsFull.slice(0, this.safxPagination.size);
		}, error => {
      alert("Error calling - " + JSON.stringify(error))
    });

	}
	
	loadDSTables(){
		this.matcherService.dsTables().
		subscribe( (response : DSTable[]) => {
			this.dsTables = response;
			if (this.selectedDsTableId == null){
				this.selectedDsTableId = this.dsTables[0].id!;
				this.loadDSColumns();
			}
		});
	}
	
	loadDSColumns(){
		if (this.selectedDsTableId){
			this.matcherService.dsColumns(this.selectedDsTableId, this.dsPagination).
			subscribe( (response : DSColumnPage) => {
				this.dsColumns = response.content;
				this.dsTotalPages = response.totalPages;
			});
		}
	}

	onPageSAFX(page: number){
		if (page >= 0 && page < this.safxTotalPages){
			this.safxPagination.page=page;
			let start = this.safxPagination.page*this.safxPagination.size;
			this.safxColumns = this.safxColumnsFull.slice(start, start + this.safxPagination.size);
		}
	}

	onPageDS(page: number){
		if (page >= 0 && page < this.dsTotalPages){
			this.dsPagination.page=page;
			this.loadDSColumns();
		}
	}

	onRemoveAssociation(field: any){
		field.dsColumnId = null;
		field.dsColumnName = null;
	}

	onSave(){
		if (!this.valid()){
			alert("Todos os campos marcados com * são obrigatórios");
			return;
		}
		this.matcherService.saveDSTAble(this.selectedTableId, this.selectedDsTableId)
		.subscribe( () => {
		},error => {
			alert("Erro salvando SAFX");
		});
		
		this.matcherService.saveSAFXTAble(this.selectedTableId, this.safxColumnsFull)
		.subscribe( () => {
			alert("Mapeamento salvo com sucesso!");
		},error => {
			alert("Erro salvando SAFX");
		});
	}

	valid(){
		let valid = true;
		this.safxColumnsFull.forEach(safxColumn => {
			if (safxColumn.required == true && safxColumn.dsColumnId == null){
				valid = false;
			}
		});
		return valid;
	}
	
	onDSCnage(ev: any){
		if (this.selectedDsTableId != ev.target.value){
			if (window.confirm("Substituindo a tabela irá apagar associações já feitas. Deseja continuar?")){
				this.selectedDsTableId = ev.target.value;
				this.safxColumnsFull.forEach (safxColumn => {
					safxColumn.dsColumnId = null;
					safxColumn.dsColumnName = null;
				});
				this.loadDSColumns();
			}else{
				//put the original value back
				setTimeout(()=> this.selectedTable = this.selectedDsTableId, 1);
			}
		}
	}
	
	onBack(){
		this.router.navigate(['matcher-list']);
	}

	
	//drag and drop
	allowDrop(ev: any) {
	  ev.preventDefault();
	}

	drag(ev: any, sField: any) {
		let fData = {
			'id': sField.id,
			'name': sField.name
		};
	  ev.dataTransfer.setData("value", JSON.stringify(fData));
	}
	
	drop(ev: any, field: any) {
	  ev.preventDefault();
	  let fData = JSON.parse(ev.dataTransfer.getData("value"));
	  field.dsColumnId = fData.id;
	  field.dsColumnName = fData.name;
	}

	
}