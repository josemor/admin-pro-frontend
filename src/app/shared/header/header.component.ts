import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  /* public imgUrl = '';
  public nomUser = '';
  public correoUser = '';*/
  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
    /*this.imgUrl = usuarioService.usuario.imagenUrl;
    this.nomUser = usuarioService.usuario.nombre;
    this.correoUser = usuarioService.usuario.email;*/
   }

  logOut() {
    this.usuarioService.logOut();
  }

}
