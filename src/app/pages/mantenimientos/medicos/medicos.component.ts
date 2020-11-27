import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.models';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public cargando: boolean = true;

  constructor( private medicoService: MedicoService ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }



  // tslint:disable-next-line: typedef
  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe( medicos => {
      this.cargando = false;
      this.medicos = medicos;

    });
  }




  abrirSweetAlert() {}

}
