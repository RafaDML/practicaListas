import { Component } from '@angular/core';
import { BuscarService} from '../service/buscar.service'
import { async } from 'q';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  variable1: any;
  variable2: any;
  constructor(private serv: BuscarService) {
    this.getData();
  }


  async getData(){
    const valores ={
      tipoMov:'getData2'
    };
  
    this.variable2 = await this.serv.postData(valores);
    console.log(this.variable2.result);
  }
  


}

