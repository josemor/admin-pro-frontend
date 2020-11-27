import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.models';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando = true;
  private  imgSubs: Subscription;

  constructor(  private hospitalService: HospitalService,
                private modalImagenService: ModalImagenService,
                private busquedasService: BusquedasService ) {
                 // this.cargarHospitales();
                }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.actualizacionImagen
    .pipe(
      delay(300)
    )
    .subscribe( img =>  this.cargarHospitales()
    );
  }

  // tslint:disable-next-line: typedef
  buscar( termino: string) {

    if (termino.length === 0) {
      return this.cargarHospitales();
    }
    this.busquedasService.buscar( 'hospitales', termino )
    .subscribe( resp => {
      this.hospitales = resp;
    } );
  }
  // tslint:disable-next-line: typedef
  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
        // console.log( this.hospitales);
      });
  }

  // tslint:disable-next-line: typedef
  guardarCambios(hospital: Hospital) {
    console.log(hospital._id);
    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre ).subscribe(resp => {
      const text = `<b> ${hospital.nombre }</b>`;
      Swal.fire({
        position: 'center',
        icon: 'success',
        html: `El hospital, ${text} fue actualizado`,
        showConfirmButton: false,
        timer: 2000
      });
      }
    );
  }



   // tslint:disable-next-line: typedef
   eliminarCambios(hospital: Hospital) {
    const text = `<b> ${hospital.nombre }</b>`;
    console.log(hospital._id);
    Swal.fire({
      title: '¿Borrar hospital?',
      html: `Esta a punto de borrar el hospital ${ text }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then(( result ) => {
      if (result.isConfirmed) {
        this.hospitalService.borrarHospital(hospital._id).subscribe(resp => {
          this.cargarHospitales();
          Swal.fire({
            position: 'center',
            icon: 'success',
            html: `El hospital, ${text} fue eliminado`,
            showConfirmButton: false,
            timer: 2000
          });
          }
        );
      }
    });
  }

  // tslint:disable-next-line: typedef
  async abrirSweetAlert() {
    const { value = ''} = await Swal.fire<string>({
      titleText: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });
    if (value.trim().length > 0) {
      this.hospitalService.crearHospitales( value ).subscribe( (resp: any) => {
        this.hospitales.push( resp.hospital);

      });
    }
  }

  // tslint:disable-next-line: typedef
  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);

  }

}
