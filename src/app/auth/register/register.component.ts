import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    checkTerminos: [true, Validators.required],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor( private formBuilder: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router
             ) { }

  crearUsuario(): void {
    this.formSubmitted = true;
    // console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario( this.registerForm.value ).subscribe( resp => {

      // Navegar al Dashboard
      this.router.navigateByUrl('/');

      // Mensajes de validación
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro exitoso!',
        showConfirmButton: false,
        timer: 1500
      });
    }, (err) => {
      // Si sucede un error
      Swal.fire({
        icon: 'error',
        text: 'Usuario ya existe'
      });
    });
  }

  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  validarCheck(): boolean {
    return !this.registerForm.get('checkTerminos').value && this.formSubmitted;
  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  passwordsIguales(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };

  }

}
