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

export class DSColumns{
	public dsTable: DSTable | null = null;
	public name: string | null = null;
	public columnType: string | null = null;
	public size: number | null = null;
}

export class DSColumnsPage{
	public content: DSColumns[] = [];
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

export class Schedule{
	public id: number | null = null;
	public name: string | null = null;
	public userName: string | null = null;
	public status: string | null = null;
}

export class SchedulePage{
	public content: Schedule[] = [];
	public totalPages: number = 0;
}


