import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { BuscarService } from '../service/buscar.service';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
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
    usuario: '',
    nombre:'',
    correo:'',
    telefono:'',
    pass:'',
    tipoMov:'insertar'

  }

  DatosUsuarios: any;
  constructor(
    private serv: BuscarService,
    private storage: Storage,
    private navCtrl: NavController,
    public toastController: ToastController
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
      this.toastController.create({
        color: 'success',
        duration: 2000,
        message: 'Bienvenido',
        showCloseButton: true
      }).then(toast => {
        toast.present();
      });
      this.navCtrl.navigateRoot('home', { animated: true });
      this.storage.set('dataUsarios', this.DatosUsuarios.result);
    } else {
      /* console.log('no entrar'); */
      this.toastController.create({
        color: 'danger',
        duration: 2000,
        message: 'No existe Usuario',
        showCloseButton: true
      }).then(toast => {
        toast.present();
      });
    }
  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      this.toastController.create({
        color: 'danger',
        duration: 2000,
        message: 'Registro no válido',
        showCloseButton: true
      }).then(toast => {
        toast.present();
      });
      return;
    }
   
    console.log('entrar');
    this.DatosUsuarios = await this.serv.postData(this.registerUser);
    console.log(this.DatosUsuarios);
    
    
    
    if (this.DatosUsuarios.success) {
      console.log('no registrado por rt');
      // navegar al tabs
      this.toastController.create({
        color: 'success',
        duration: 2000,
        message: 'Completado',
        showCloseButton: true
      }).then(toast => {
        toast.present();
      });
      fRegistro.reset();
      //this.navCtrl.navigateRoot('home', { animated: true });
      this.storage.set('dataUsarios', this.DatosUsuarios.result);

    } else {
     
       console.log('no entrar');  this.toastController.create({
        color: 'warning',
        duration: 2000,
        message: 'Matricula No Registrada Por RT',
        showCloseButton: true
      }).then(toast => {
        toast.present();
      });
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