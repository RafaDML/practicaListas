import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { BuscarService } from '../service/buscar.service';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal', { static: false }) slides: IonSlides;
  seleccion = true;
  loginUser = {
    usuario: '16683196',
    pass: '123',
    tipoMov: 'login'
  };
  registerUser = {
    usuario: '778899',
    nombre:'daniel',
    correo:'danielgmail.com',
    telefono:'98',
    pass:'123',
    tipoMov:'insertar'

  }

  DatosUsuarios: any;
  constructor(
    private serv: BuscarService,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    /* console.log(fLogin.valid); */
    if (fLogin.invalid) {
      return;
    }

    this.DatosUsuarios = await this.serv.postData(this.loginUser);
    console.log(this.DatosUsuarios);

    if (this.DatosUsuarios.success) {
      /* console.log('entrar');*/
      // navegar al tabs
      this.navCtrl.navigateRoot('home', { animated: true });
      this.storage.set('dataUsarios', this.DatosUsuarios.result);
    } else {
      /* console.log('no entrar'); */
    }
  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      return;
    }
    this.DatosUsuarios = await this.serv.postData(this.registerUser);
    console.log(this.DatosUsuarios);
    if (this.DatosUsuarios.success) {
      /* console.log('entrar');*/
      // navegar al tabs
      this.navCtrl.navigateRoot('home', { animated: true });
      this.storage.set('dataUsarios', this.DatosUsuarios.result);
    } else {
      /* console.log('no entrar'); */
    }
   
   
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.seleccion = false;
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.seleccion = true;
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
}