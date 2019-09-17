import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Config} from '../constants/config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL_BASE : string =  Config.URL;


  private HEADERS = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });


  constructor(public http: HttpClient) { }

  listTask(status: string, type: string = null, order: string = null) {
    const url  = this.URL_BASE + 'tasks/findAll';

    let body: any = {};

    if(type) { body.type = type }
    if(status) {body.status = status}
    if(order) {body.order = order}

    return this.http.post(url, JSON.stringify(body), {headers: this.HEADERS})
    .pipe(
      map( (json : any) => {
        if(!json.ok){ return json.err }
        return json.data;
      }) ,
      catchError(error => error ) , 
      );
  }

  getTaskById(id: string){
    const url = this.URL_BASE + 'tasks/' + id; 

    return this.http.get(url, {headers: this.HEADERS})
    .pipe( map( (json: any) =>{
      if(!json.ok){ return json.err }
      return json.data;
    }),
    catchError(error => error));
  }

  createTask(body: any){
    const url = this.URL_BASE + 'tasks'; 

    return this.http.post(url, JSON.stringify(body), {headers: this.HEADERS})
    .pipe(map( (json : any) => {
        if(!json.ok){ return json.err }
        return json.data;
      }) ,
      catchError(error => error ) , 
      );
  }

  updateTask(id:string, body: any){
    const url = this.URL_BASE + 'tasks/' + id; 

    return this.http.put(url, JSON.stringify(body), {headers: this.HEADERS})
    .pipe(map( (json : any) => {
        if(!json.ok){ return json.err }
        return json.data;
      }) ,
      catchError(error => error ) , 
      );
  }

  deleteTask(id:string){
    const url = this.URL_BASE + 'tasks/' + id; 

    return this.http.delete(url, {headers: this.HEADERS})
    .pipe(map( (json : any) => {
        if(!json.ok){ return json.err }
        return json.data;
      }) ,
      catchError(error => error ) , 
      );
  }

}
