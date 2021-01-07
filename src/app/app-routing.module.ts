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
import { ConsultaPorNameserverComponent} from './master-page/consulta-por-nameserver/consulta-por-nameserver.component';
import { ConsultaPorDomainComponent} from './master-page/consulta-por-domain/consulta-por-domain.component';
import { ResultadosNameserverComponent } from './master-page/resultados-nameserver/resultados-nameserver.component';
import { ResultadosDomainComponent } from './master-page/resultados-domain/resultados-domain.component';
import { BusquedaPorEntitiesComponent } from './master-page/busqueda-por-entities/busqueda-por-entities.component';
import { BusquedaPorDomainsComponent } from './master-page/busqueda-por-domains/busqueda-por-domains.component';
import { BusquedaPorNameserversComponent } from './master-page/busqueda-por-nameservers/busqueda-por-nameservers.component';
import { ResultSrchDomainsComponent } from './master-page/result-srch-domains/result-srch-domains.component';
import { ResultSrchNameserversComponent } from './master-page/result-srch-nameservers/result-srch-nameservers.component';
import { ResultSrchEntitiesComponent } from './master-page/result-srch-entities/result-srch-entities.component';

import { QueryIpComponent } from './widget/query-ip/query-ip.component';
import { QueryEntityComponent } from './widget/query-entity/query-entity.component';
import { QueryAutnumComponent } from './widget/query-autnum/query-autnum.component';
import { QueryDomainComponent } from './widget/query-domain/query-domain.component';
import { QueryNameserverComponent } from './widget/query-nameserver/query-nameserver.component';

const routes: Routes = [
  {
    path: '', component: MasterPageComponent,
    children: [
        {path: '', component: HomeComponent},
        {path: 'home', redirectTo: 'rdap/home', pathMatch: 'full'},
        {path: 'rdap/home', component: HomeComponent},

        {path: 'consulta-por-ip', redirectTo: 'rdap/consulta-por-ip', pathMatch: 'full'},
        {path: 'rdap/consulta-por-ip', component: ConsultaPorIPComponent},

        {path: 'consulta-por-entity', redirectTo: 'rdap/consulta-por-entity', pathMatch: 'full'},
        {path: 'rdap/consulta-por-entity', component: ConsultaPorEntityComponent},

        //{ path: 'consulta-entities-por-nombre', component: ConsultaEntitiesPorNombreComponent },
        {path: 'about', redirectTo: 'rdap/about', pathMatch: 'full'},
        {path: 'rdap/about', component: AboutComponent},

        {path: 'ip/:ip', redirectTo: 'rdap/ip/:ip', pathMatch: 'full'},
        {path: 'rdap/ip/:ip', component: ResultadosIPComponent},

        {path: 'ip/:ip/:mask', redirectTo: 'rdap/ip/:ip/:mask', pathMatch: 'full'},
        {path: 'rdap/ip/:ip/:mask', component: ResultadosIPMaskComponent},

        {path: 'entity/:entity', redirectTo: 'rdap/entity/:entity', pathMatch: 'full'},
        {path: 'rdap/entity/:entity', component: ResultadosEntityComponent},

        {path: 'consulta-por-autnum', redirectTo: 'rdap/consulta-por-autnum', pathMatch: 'full'},
        {path: 'rdap/consulta-por-autnum', component: ConsultaPorAutnumComponent},

        //{ path: 'reporte-asn/:country', component: ReporteASNComponent },
        {path: 'autnum/:autnum', redirectTo: 'rdap/autnum/:autnum', pathMatch: 'full'},
        {path: 'rdap/autnum/:autnum', component: ResultadosAutnumComponent},

        {path: 'consulta-por-nameserver', redirectTo: 'rdap/consulta-por-nameserver', pathMatch: 'full'},
        {path: 'rdap/consulta-por-nameserver', component: ConsultaPorNameserverComponent},

        {path: 'consulta-por-domain', redirectTo: 'rdap/consulta-por-domain', pathMatch: 'full'},
        {path: 'rdap/consulta-por-domain', component: ConsultaPorDomainComponent},

        {path: 'nameserver/:nameserver',redirectTo: 'rdap/nameserver/:nameserver', pathMatch: 'full'},
        {path: 'rdap/nameserver/:nameserver', component: ResultadosNameserverComponent},

        {path: 'domain/:domain', redirectTo: 'rdap/domain/:domain', pathMatch: 'full'},
        {path: 'rdap/domain/:domain', component: ResultadosDomainComponent},

        {path: 'busqueda-por-entities',redirectTo: 'rdap/busqueda-por-entities', pathMatch: 'full'},
        {path: 'rdap/busqueda-por-entities', component: BusquedaPorEntitiesComponent},

        {path: 'busqueda-por-domains', redirectTo: 'rdap/busqueda-por-domains', pathMatch: 'full'},
        {path: 'rdap/busqueda-por-domains', component: BusquedaPorDomainsComponent},

        {path: 'busqueda-por-nameservers', redirectTo: 'rdap/busqueda-por-nameservers', pathMatch: 'full'},
        {path: 'rdap/busqueda-por-nameservers', component: BusquedaPorNameserversComponent},

        {path: 'domains/:domain', redirectTo: 'rdap/domains/:domain', pathMatch: 'full'},
        {path: 'rdap/domains/:domain', component: ResultSrchDomainsComponent},

        {path: 'nameservers/:nameserver', redirectTo: 'rdap/nameservers/:nameserver', pathMatch: 'full'},
        {path: 'rdap/nameservers/:nameserver', component: ResultSrchNameserversComponent},

        {path: 'entities/:entity', redirectTo: 'rdap/entities/:entity', pathMatch: 'full'},
        {path: 'rdap/entities/:entity', component: ResultSrchEntitiesComponent},       

    ]

  },
  {path: 'rdap/query-ip/:ip', component: QueryIpComponent},
  {path: 'rdap/query-entity/:entity', component: QueryEntityComponent},
  {path: 'rdap/query-autnum/:autnum', component: QueryAutnumComponent},
  {path: 'rdap/query-domain/:domain', component: QueryDomainComponent},
  {path: 'rdap/query-nameserver/:nameserver', component: QueryNameserverComponent},
  {path: '**', component: NotFoundComponent},
  
];

@NgModule({  
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})

export class AppRoutingModule { }

import { EmbedPageIframeCodeService } from './shared/services/embed-page-iframe-code.service';
import { CollapsibleContainerService } from './shared/services/collapsible-container.service';

// Exporto routing providers
export const appRoutingProviders: any[] = [
  EmbedPageIframeCodeService,
  CollapsibleContainerService
];
