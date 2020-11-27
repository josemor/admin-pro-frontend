import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.models';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http: HttpClient ) { }

  // Metodo para obtener token
  get token(): string {
    return localStorage.getItem('token') || '';

  }
  // Metodo encargado de cargar los headers en los servicios
  // tslint:disable-next-line: typedef
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }
  // tslint:disable-next-line: typedef
  cargarMedicos() {
    const url = `${BASE_URL}/medicos`;
    return this.http.get(url, this.headers)
    .pipe(
      map( (resp: { ok: boolean, medicos: Medico[] }) => resp.medicos )
    );

  }
  // tslint:disable-next-line: typedef
  crearMedicos( medico: Medico ) {
    const url = `${BASE_URL}/medicos`;
    return this.http.post(url, medico, this.headers);
S
  }
  // tslint:disable-next-line: typedef
  actualizarMedicos( medico: Medico ) {
    const url = `${BASE_URL}/medicos/${_id}`;
    return this.http.put(url, medico, this.headers);
  }
  // tslint:disable-next-line: typedef
  borrarMedicos(_id: string  ) {
    const url = `${BASE_URL}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }

}
