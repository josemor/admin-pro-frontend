import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.models';
import { Hospital } from '../models/hospital.models';
import { Medico } from '../models/medico.models';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient,
              private router: Router) { }


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


  private transformarUsuarios( resultados: any[] ): Usuario[] {
    return resultados.map(
      user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
    );
  }

  private transformarHospitales( resultados: any[] ): Hospital[] {
    return resultados;

  }
  private transformarMedico( resultados: any[] ): Medico[] {
    return resultados;
  }

  // tslint:disable-next-line: typedef
  buscar(
    tipo: 'usuarios'|'medicos'|'hospitales',
    terminoBusqueda: string
    ) {
    const url = `${ BASE_URL }/todo/coleccion/${ tipo }/${terminoBusqueda}`;
    return this.http.get<any[]>( url, this.headers ).pipe(
      map( (resp: any) => {

        switch (tipo) {

          case 'usuarios':
            return this.transformarUsuarios( resp.resultados );

          case 'hospitales':
            return this.transformarHospitales( resp.resultados );

          case 'medicos':
            return this.transformarMedico( resp.resultados );

          default:
            return [];
        }
      } )
    );
  }
}

