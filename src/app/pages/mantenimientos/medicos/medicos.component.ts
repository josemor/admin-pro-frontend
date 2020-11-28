import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from 'src/app/models/medico.models';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;


  constructor( private medicoService: MedicoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService  ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.refrecarFoto();
  }

  // tslint:disable-next-line: typedef
  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe( medicos => {
      this.cargando = false;
      this.medicos = medicos;

    });
  }

  // metodo encargado mostrar en un modal las images a cambiar foto
  // tslint:disable-next-line: typedef
  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);

  }


  // tslint:disable-next-line: typedef
  buscar( termino: string) {

    if (termino.length === 0) {
      return this.cargarMedicos();
    }
    this.busquedasService.buscar( 'medicos', termino )
    .subscribe( resp => {
      this.medicos = resp;
    } );
  }

  // tslint:disable-next-line: typedef
  refrecarFoto() {
    this.imgSubs = this.modalImagenService.actualizacionImagen
    .pipe(
      delay(300)
    )
    .subscribe( () =>  this.cargarMedicos()
    );
  }

  // tslint:disable-next-line: typedef
  borrarMedico( medico ) {
    const text = `<b>${medico.nombre}</b>`;
    Swal.fire({
      title: '¿Borrar medico?',
      html: `Esta a punto de borrar a ${ text }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedicos( medico._id ).subscribe( () => {
          this.cargarMedicos();
          Swal.fire({
            html: `${ text } fue eliminado correctamente`,
            icon: 'success'
          });
        });
      }
    });
  }

}
