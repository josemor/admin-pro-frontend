import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  ngOnInit() {
   this.btnClass = `btn ${this.btnClass}`;
  }

  // tslint:disable-next-line: no-inferrable-types
  // tslint:disable-next-line: no-input-rename

  /**
   * Para recibir agumentos del padre se pueden hacer de dos formas
   * 1. @Input()
   * 2. Renombrando la variable desde el padre hacia ek hijo
   *  @Input('nombre_nuevo')
   */
  // @Input('') progreso: number = 20;
  @Input('valor') progreso: number = 20;
  @Input() btnClass: string = 'btn-primary';
  // @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  
  // tslint:disable-next-line: typedef
  cambiarValor(valor: number) {

    if ( this.progreso >= 100 && valor >= 0 ) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if ( this.progreso <= 0 && valor < 0 ) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);

  }

  // tslint:disable-next-line: typedef
  onChange( nuevoValor: number ) {

    // tslint:disable-next-line: no-shadowed-variable
    if ( nuevoValor => 100) {
      this.progreso = 100;
    }else if ( nuevoValor <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit( this.progreso );
  }


}
