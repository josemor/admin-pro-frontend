import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { Usuario } from '../../../models/usuario.models';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public paginaDesde = 0;
  public cargando = true;
  public imgSubs: Subscription;

  constructor( private usuarioService: UsuarioService,
               private busquedasService: BusquedasService,
               private modalImagenService: ModalImagenService
             ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.actualizacionImagen
    .pipe(
      delay(100)
    )
    .subscribe( img => this.cargarUsuarios()
    );

  }

  // tslint:disable-next-line: typedef
  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.paginaDesde).subscribe(({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    });
  }

  // tslint:disable-next-line: typedef
  cambiarPaginacion(valor: number) {
    this.paginaDesde += valor;
    if (this.paginaDesde < 0) {
      this.paginaDesde = 0;
    } else if (this.paginaDesde >= this.totalUsuarios) {
      this.paginaDesde -= valor;
    }
    this.cargarUsuarios();

  }

  // tslint:disable-next-line: typedef
  buscar( termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedasService.buscar( 'usuarios', termino )
    .subscribe( (resp: Usuario[]) => {
      this.usuarios = resp;
    } );
  }

  // tslint:disable-next-line: typedef
  eliminarUsuario( usuario: Usuario ) {
    const text = `<b>${usuario.nombre}</b>`;
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire({
        html: `${ text } No se puede eliminar a sí mismo`,
        icon: 'error'
      });
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      html: `Esta a punto de borrar a ${ text }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario( usuario ).subscribe( () => {
          this.cargarUsuarios();
          Swal.fire({
            html: `${ text } fue eliminado correctamente`,
            icon: 'success'
          });
        });
      }
    });
  }

  // tslint:disable-next-line: typedef
  cambiarRole( usuario: Usuario ) {
    this.usuarioService.guardarUsuario( usuario ).subscribe( resp => {
      console.log(resp);

    });

  }


  // tslint:disable-next-line: typedef
  abrirModal( usuario: Usuario ) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }


}
