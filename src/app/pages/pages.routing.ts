import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Modulo de mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';



const routes: Routes = [
  /* Se modifica el squema de rutas para que quede en un path especifico
      {
          path: '',
          component: PagesComponent,
          // rutas hijas: son las que pueden manejar el mismo diseño de la pagina.
          children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent},
            { path: 'grafica1', component: Grafica1Component },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
          ]
        }*/

  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    // rutas hijas: son las que pueden manejar el mismo diseño de la pagina.
    children: [
      {
        path: '',
        component: DashboardComponent,
        data:
        {
          titulo: 'Dashboard'
        }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data:
        {
          titulo: 'Progress'
        }
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data:
        {
          titulo: 'Gráfica #1'
        }
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data:
        {
          titulo: 'Promesas'
        }
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data:
        {
          titulo: 'RxJs'
        }
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data:
        {
          titulo: 'Ajuste de Cuenta'
        }
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        data:
        {
          titulo: 'Perfil de usuario'
        }
      },

      // Modulo de Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data:
        {
          titulo: 'Usuarios de aplicación'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

