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

  get(url:string) {
    let aHeader = this.createAuthorizationHeader();
    return this.http.get(url, {
      headers: aHeader
    });
  }

  getaa<Type>(url:string) {
    let aHeader = this.createAuthorizationHeader();
    return this.http.get<Type>(url, {
      headers: aHeader
    });
  }

  post(url:string, data: any) {
    let aHeader = this.createAuthorizationHeader();
    return this.http.post(url, data, {
      headers: aHeader
    });
  }

  postaa<Type>(url:string, data: Type) {
    let aHeader = this.createAuthorizationHeader();
    return this.http.post<Type>(url, data, {
      headers: aHeader
    });
  }
  
  put(url:string, data: any) {
    let aHeader = this.createAuthorizationHeader();
    return this.http.put(url, data, {
      headers: aHeader
    });
  }
  
  putaa<Type>(url:string, data: Type) {
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