import { Injectable, WritableSignal, signal } from '@angular/core'

import { BehaviorSubject } from 'rxjs';

import { Paginator } from '../components/common/model';


@Injectable({
	providedIn: "root"
})
export class LoadingService {

	public loading: BehaviorSubject<boolean> =  new BehaviorSubject <boolean>(false);
	public count : WritableSignal<number> = signal(0);
	public customer : WritableSignal<Paginator> = signal(new Paginator());
	public customers : WritableSignal<Paginator[]> = signal([new Paginator()]);

}

