import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';

import { LoadingService } from './loading.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

	constructor (private loadingService: LoadingService){
	
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
		this.loadingService.loading.next(true);
		console.log("in LoadingInterceptor.intercept");
		return next.handle(req)
		.pipe(delay(1), map((resp:any) => {
			//alert("resp:" + JSON.stringify(resp));
			this.loadingService.loading.next(false);
			return resp;
		}), 
		catchError((resp: any) => {
			this.loadingService.loading.next(false);
			return resp;
		})) as Observable<HttpEvent<any>>;
	}

}


