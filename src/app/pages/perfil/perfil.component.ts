import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {

    this.usuario = this.usuarioService.usuario;

  }

  ngOnInit(): void {

    this.perfilForm = this.formBuilder.group({

      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],

    });
  }


  // tslint:disable-next-line: typedef
  actualizarPerfil() {

    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(() => {
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cambios fueron guardados',
        showConfirmButton: false,
        timer: 1500
      });
    }, (err) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: err.error.msg,
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

  // tslint:disable-next-line: typedef
  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  // tslint:disable-next-line: typedef
  subirImagen() {
    this.fileUploadService
      .actualizarFotoPerfil(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Imagen de usuario actualizada',
          showConfirmButton: false,
          timer: 2000
        });
      }).catch(err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo subir la imagen',
          showConfirmButton: false,
          timer: 2000
        });

      });
  }

}
