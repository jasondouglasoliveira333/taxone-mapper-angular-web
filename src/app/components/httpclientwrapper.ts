import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: "root"
})
export class HttpClientWrapper {

  constructor(private http: HttpClient) {}

  createAuthorizationHeader() {
	  let header = {};
	  let token = sessionStorage.getItem("token");
	  if (token){
		  header = {'Authorization': 'Bearer ' + sessionStorage.getItem("token")!}
	  }
	  return header;
  }

  get<Type>(url:string) {
    let aHeader = this.createAuthorizationHeader();
    return this.http.get<Type>(url, {
      headers: aHeader
    });
  }

  post<Type>(url:string, data: Type) {
    let aHeader = this.createAuthorizationHeader();
    return this.http.post<Type>(url, data, {
      headers: aHeader
    });
  }
  
  put<Type>(url:string, data: Type) {
    let aHeader = this.createAuthorizationHeader();
    return this.http.put<Type>(url, data, {
      headers: aHeader
    });
  }
  
  delete(url:string) {
    let aHeader = this.createAuthorizationHeader();
    return this.http.delete(url, {
      headers: aHeader
    });
  }

}