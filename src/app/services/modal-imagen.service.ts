import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {


  // tslint:disable-next-line: variable-name
  private _ocultarModal: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;

  public actualizacionImagen: EventEmitter<String> = new EventEmitter<String>();

  // tslint:disable-next-line: typedef
  get ocultarModal() {
    return this._ocultarModal;
  }

  // tslint:disable-next-line: typedef
  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-user'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${ BASE_URL }/upload/${ tipo }/${ img }`;
    }
    // this.img = img;


  }

  // tslint:disable-next-line: typedef
  cerrarModal() {
    this._ocultarModal = true;
  }


  constructor() { }
}
