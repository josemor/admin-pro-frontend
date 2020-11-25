import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public modalImagenService: ModalImagenService,
               public fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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


  subirImagen() {

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService
    .actualizarFotoPerfil(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Imagen de usuario actualizada',
          showConfirmButton: false,
          timer: 2000
        });
        this.modalImagenService.actualizacionImagen.emit(img);
        this.cerrarModal();
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
