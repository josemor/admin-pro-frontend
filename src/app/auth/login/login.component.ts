import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    recordarme: [false]
  });

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private usuarioService: UsuarioService
  ) { }
  /**
   * Funcion que se encarga de logear un usuario
   */
  // tslint:disable-next-line: typedef
  login() {
    //  this.router.navigateByUrl('/');
    this.usuarioService.login(this.loginForm.value).subscribe( res => {
      console.log(res);
    }, (err) => {
      // tslint:disable-next-line: prefer-const
      let mensaje: string = err.error.msg;
      Swal.fire('Error', mensaje.toUpperCase(), 'error');
    });
  }


}
