import { Component } from '@angular/core';
import { BuscarService} from '../service/buscar.service'
import { async } from 'q';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Materia: any;
  respuesta: any;
  constructor(private serv: BuscarService) {
    this.getData();
  }


  async getData(){
    const valores ={
      tipoMov:'getData2'
    };
  
    this.respuesta = await this.serv.postData(valores);
    this.Materia= this.respuesta.result;

    console.log(this.respuesta.result);
  }
  


}

