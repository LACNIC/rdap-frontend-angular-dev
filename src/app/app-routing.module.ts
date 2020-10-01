import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found.component';
import { MasterPageComponent } from "./master-page/master-page.component";
import { HomeComponent } from "./master-page/home/home.component";
import { AboutComponent } from './master-page/about/about.component';
import { ConsultaPorAutnumComponent } from "./master-page/consulta-por-autnum/consulta-por-autnum.component";
import { ConsultaPorEntityComponent } from './master-page/consulta-por-entity/consulta-por-entity.component';
import { ConsultaPorIPComponent } from './master-page/consulta-por-ip/consulta-por-ip.component';
import { ResultadosAutnumComponent } from './master-page/resultados-autnum/resultados-autnum.component';
import { ResultadosEntityComponent } from "./master-page/resultados-entity/resultados-entity.component";
import { ResultadosIPComponent } from "./master-page/resultados-ip/resultados-ip.component";
import { ResultadosIPMaskComponent } from './master-page/resultados-ip-mask/resultados-ip-mask.component';

const routes: Routes = [
  {
    path: '', component: MasterPageComponent,
    children: [
        {path: '', component: HomeComponent},
        {path: 'home', component: HomeComponent},
        {path: 'consulta-por-ip', component: ConsultaPorIPComponent},
        {path: 'consulta-por-entity', component: ConsultaPorEntityComponent},
        //{ path: 'consulta-entities-por-nombre', component: ConsultaEntitiesPorNombreComponent },
        {path: 'about', component: AboutComponent},
        {path: 'ip/:ip', component: ResultadosIPComponent},
        {path: 'ip/:ip/:mask', component: ResultadosIPMaskComponent},
        {path: 'entity/:entity', component: ResultadosEntityComponent},
        {path: 'consulta-por-autnum', component: ConsultaPorAutnumComponent},
        //{ path: 'reporte-asn/:country', component: ReporteASNComponent },
        {path: 'autnum/:autnum', component: ResultadosAutnumComponent},
    ]

  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({  
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})

export class AppRoutingModule { }
