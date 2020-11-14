import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



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
        // rutas hijas: son las que pueden manejar el mismo diseño de la pagina.
        children: [
          { path: '', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent},
          { path: 'grafica1', component: Grafica1Component },
          { path: 'account-settings', component: AccountSettingsComponent },
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

