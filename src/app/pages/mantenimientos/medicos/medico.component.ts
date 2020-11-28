import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];

  public hospitalSeleccionado: Hospital;
  public medicoSelecionado: Medico;

  constructor(private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private roter: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarMedico(id));

    this.medicoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.cargarHospitales();

    this.hospitalSeleccionar();
  }

  // tslint:disable-next-line: typedef
  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    });
  }

  // tslint:disable-next-line: typedef
  guardarMedico() {

    const { nombre } = this.medicoForm.value;
    const text = `<b> ${nombre}</b>`;

    if (this.medicoSelecionado) {
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSelecionado._id
      };
      Swal.fire({
        title: '¿Actualizar médico?',
        html: `Esta a punto de Actualizar el médico ${text}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, Crearlo!'
      }).then(() => {
        this.medicoService.actualizarMedicos(data).subscribe((resp) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            html: `El médico, ${text} fue Actualizado`,
            showConfirmButton: false,
            timer: 2000
          });
        });
      });
    } else {
      // crear
      Swal.fire({
        title: '¿Crear médico?',
        html: `Esta a punto de crear el médico ${text}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, Crearlo!'
      }).then(() => {
        this.medicoService.crearMedicos(this.medicoForm.value).subscribe((resp: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            html: `El médico, ${text} fue creado`,
            showConfirmButton: false,
            timer: 2000
          });
          this.roter.navigateByUrl(`/dashboard/medicos/${resp.medico._id}`);
        });
      });
    }
  }

  // tslint:disable-next-line: typedef
  hospitalSeleccionar() {
    this.medicoForm.get('hospital').valueChanges.subscribe(hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find(hospital => hospital._id === hospitalId);
      console.log(this.hospitalSeleccionado);
    });

  }


  cargarMedico(id: string) {
    this.medicoService.obtenerMedicoById(id).subscribe(medico => {
      console.log(medico);
      const { nombre, hospital: { _id } } = medico;
      this.medicoSelecionado = medico;
      this.medicoForm.setValue({ nombre, hospital: _id });
    });
  }

}
