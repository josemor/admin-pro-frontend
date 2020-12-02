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
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';



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
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajuste de Cuenta' } },
      { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },

      // Modulos de Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Matenimiento de Hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Matenimiento de Médicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Matenimiento de Médicos' } },

      // usuarios admin
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

