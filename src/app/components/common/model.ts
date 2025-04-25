export class Paginator{
	public page : number = 0;
	public size : number = 10;
	public shared = 1;
}


export class Upload{
	public id: number | null = null;
	public fileName: string | null = null;
	public layoutVersion: string | null = null;
	public creationDate: string | null = null;
	public userName: string | null = null;
	public status: string | null = null;
}

export class UploadPage{
	public content: Upload[] = [];
	public totalPages: number = 0;
}


export class SourceConfig{
	public dataSourceType: string | null = null;
	public resourceNames: string | null = null;
	public url: string | null = null;
	public username: string | null = null;
	public password: string | null = null;
}

export class DSTable{
	public id: number | null = null;
	public name: string | null = null ;
}

export class DSColumn{
	public dsTable: DSTable | null = null;
	public name: string | null = null;
	public columnType: string | null = null;
	public size: number | null = null;
}

export class DSColumnPage{
	public content: DSColumn[] = [];
	public totalPages: number = 0;
}

export class Email{
	public id: number | null = null;
	public email: string | null = null;
	public type: string | null = null;
}

export class EmailPage{
	public content: Email[] = [];
	public totalPages: number = 0;
}

export class SAFXTable{
	public id: number | null = null;
	public name: string | null = null;
	public description: string | null = null;
	public dsTableId: number | null = null;
	public dsTableName: string | null = null;
}

export class SAFXTablePage{
	public content: SAFXTable[] = [];
	public totalPages: number = 0;
}

export class SAFXColumn{
	public id: number | null = null;
	public name: string | null = null;
	public required: boolean | null = null;
	public size: number | null = null;
	public type: string | null = null;
	public dsColumnId: number | null = null;
	public dsColumnName: string | null = null;
}


export class Schedule{
	public id: number | null = null;
	public name: string | null = null;
	public userName: string | null = null;
	public status: string | null = null;
	public days: string | null = null;
	public hours: string | null = null;
	public safxTables: SAFXTable[] | null = null;
	public criterias: any[] | null = null;
}

export class SchedulePage{
	public content: Schedule[] = [];
	public totalPages: number = 0;
}


