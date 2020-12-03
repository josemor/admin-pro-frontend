import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';




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
    canLoad: [ AuthGuard ],
    // rutas hijas: son las que pueden manejar el mismo diseño de la pagina.
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

