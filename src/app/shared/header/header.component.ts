import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService,
               private router: Router) {
    this.usuario = usuarioService.usuario;
   }

  // tslint:disable-next-line: typedef
  logOut() {
    this.usuarioService.logOut();
  }

  // tslint:disable-next-line: typedef
  buscar( termino: string ) {
    if (termino.length === 0) {
      this.router.navigateByUrl('/dashboard');
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }



}
