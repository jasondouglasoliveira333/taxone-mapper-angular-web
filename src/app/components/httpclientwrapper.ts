import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpClientWrapper {

  constructor(private http: HttpClient) {}

  createAuthorizationHeader() {
	  let header = {};
	  let token = sessionStorage.getItem("token");
	  if (token){
		  header = {'Authorization': 'Bearer ' + sessionStorage.getItem("token")!}
		  //header = {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXNvbiIsImV4cCI6MTYzMjI1MjAwMSwiaWF0IjoxNjMyMjM0MDAxfQ.Q-W2Dz-I7Oe0cJAerMNZUbu-LBAM1e-emDK0dgU9SvD2CQibeJ0sUzy1wFwHwP2XiLcGSAPiNsYKauXQ7RGqIA'}
	  }
	  return header;
  }

  get(url:string) {
    let aHeader = this.createAuthorizationHeader();
	//alert("sessionStorage.getItem(\"token\"):" + sessionStorage.getItem("token") + " headers:" + JSON.stringify(aHeader));
    return this.http.get(url, {
      headers: aHeader
    });
  }

  post(url:string, data: any) {
    let aHeader = this.createAuthorizationHeader();
    return this.http.post(url, data, {
      headers: aHeader
    });
  }
  
  put(url:string, data: any) {
    let aHeader = this.createAuthorizationHeader();
    return this.http.put(url, data, {
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