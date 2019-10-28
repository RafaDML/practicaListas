import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  server = 'http://pitfic.com/practicas/api-server.php';
  constructor(private http:HttpClient) { }

postData(body){
  const file = 'api-696New.php';
  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  //console.log(body);
  return new Promise(resolve =>{
    this.http
      .post(this.server + file, JSON.stringify(body),options)
      .subscribe(data => {
        resolve(data);

      })

  })

}

}
