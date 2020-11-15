import { ViewFlags } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { resolve } from 'dns';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    });

  }

  // tslint:disable-next-line: typedef
  getUsuarios() {
    // tslint:disable-next-line: no-shadowed-variable
    const promesa = new Promise( resolve => {
      fetch('https://reqres.in/api/users').then(resp => resp.json())
                                          .then(body => resolve(body.data));
    });
    return promesa;
  }

}
