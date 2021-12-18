import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


function _window() : any {
  return window;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  get nativeWindow() : any {
    return _window();
 }

  baseURL = "http://localhost:8081/";

  constructor(private http: HttpClient, private cookie: CookieService) { }

  callapi(api:string, data:any)
  {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data);
    return this.http.post(this.baseURL + api, body, {'headers':headers});
  }

  getcookie(name:string){
    if(this.cookie.check(name)){
      return this.cookie.get(name);
    }
    else{
      return "";
    }
  }

  setcookie(name:string, value:string){
    return this.cookie.set(name, value, 2);
  }

  clearCookies()
  {
    this.cookie.deleteAll();
  }

}
