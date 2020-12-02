import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.models';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone
  ) {
    this.googleInit();
  }

  // Metodo para obtener token
  get token(): string {
    return localStorage.getItem('token') || '';

  }

  // Metodo que obtiene uid de un usuario
  get uid(): string {
    return this.usuario.uid || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
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
  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  // Metodo para inicializar usuarios de google
  // tslint:disable-next-line: typedef
  googleInit() {

    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '103250112893-2aqrla524d9ptq9dvdspfmiqo5qn3a1c.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  // Metodo que se encarga de realizar el LogOut de un usuario
  // tslint:disable-next-line: typedef
  logOut() {
    // TODO: Borrar Menú
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
  // Metodo que se encarga de validar token existente
  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        this.guardarLocalStorage( resp.token, resp.menu );

        return true;
      }),

      catchError(error => of(false))
    );
  }

  // Metodo encargado actualizar los datos basicos de un usuario
  // tslint:disable-next-line: typedef
  actualizarPerfil(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }
  // Metodo en cargado de crear un usuario
  // tslint:disable-next-line: typedef
  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage( resp.token, resp.menu );
      })
    );
  }

  // Metodo encargado de realizar un login a la aplicación
  // tslint:disable-next-line: typedef
  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage( resp.token, resp.menu );
        })
      );
  }
  // Metodo que reliza la autenticación permedio de la API de Google
  // tslint:disable-next-line: typedef
  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage( resp.token, resp.menu );
        })
      );
  }

  // tslint:disable-next-line: typedef
  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers).pipe(
      map(resp => {
        const usuarios = resp.usuarios.map(
          user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
        );
        // console.log(resp);
        return {
          total: resp.total,
          usuarios
        };
      })
    );
  }

  // tslint:disable-next-line: typedef
  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }


  // tslint:disable-next-line: typedef
  guardarUsuario(usuario: Usuario) {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }


}
