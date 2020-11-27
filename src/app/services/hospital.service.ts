import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.models';


const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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
  cargarHospitales() {
    const url = `${BASE_URL}/hospitales`;
    return this.http.get(url, this.headers)
    .pipe(
      map( (resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales )
    );
  }
  // tslint:disable-next-line: typedef
  crearHospitales( nombre: string ) {
    const url = `${BASE_URL}/hospitales`;
    return this.http.post(url, {nombre}, this.headers);

  }
  // tslint:disable-next-line: typedef
  actualizarHospital(_id: string, nombre: string ) {
    const url = `${BASE_URL}/hospitales/${_id}`;
    return this.http.put(url, { nombre }, this.headers);
  }
  // tslint:disable-next-line: typedef
  borrarHospital(_id: string  ) {
    const url = `${BASE_URL}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);
  }


}
