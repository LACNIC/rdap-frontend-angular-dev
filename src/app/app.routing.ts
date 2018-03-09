import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MasterPageComponent} from "./master-page/master-page.component";
import {HomeComponent} from "./master-page/home/home.component";
import {ConsultaPorIPComponent} from './master-page/consulta-por-ip/consulta-por-ip.component';
import {ConsultaPorEntityComponent} from './master-page/consulta-por-entity/consulta-por-entity.component';
import {AboutComponent} from './master-page/about/about.component';
import {ResultadosIPComponent} from "./master-page/resultados-ip/resultados-ip.component";
import {ResultadosEntityComponent} from "./master-page/resultados-entity/resultados-entity.component";
import {ConsultaPorAutnumComponent} from "./master-page/consulta-por-autnum/consulta-por-autnum.component";
import {ResultadosAutnumComponent} from './master-page/resultados-autnum/resultados-autnum.component';
import {ResultadosIPMaskComponent} from './master-page/resultados-ip-mask/resultados-ip-mask.component';
import {PageNotFoundComponent} from './not-found.component';


const appRoutes: Routes = [
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
    {path: '**', component: PageNotFoundComponent}
];


export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);