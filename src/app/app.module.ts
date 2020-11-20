import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ClipboardModule } from 'ngx-clipboard';
import { EmbedPageIframeCodeComponent } from './shared/components/embed-page-iframe-code/embed-page-iframe-code.component';


import { AppComponent } from './app.component';
import { appRoutingProviders, AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { HomeComponent } from './master-page/home/home.component';
import { AboutComponent } from './master-page/about/about.component';
import { ConsultaPorAutnumComponent } from './master-page/consulta-por-autnum/consulta-por-autnum.component';
import { ConsultaPorEntityComponent } from './master-page/consulta-por-entity/consulta-por-entity.component';
import { ConsultaPorIPComponent } from './master-page/consulta-por-ip/consulta-por-ip.component';
import { ResultadosAutnumComponent } from './master-page/resultados-autnum/resultados-autnum.component';
import { ResultadosEntityComponent } from './master-page/resultados-entity/resultados-entity.component';
import { ResultadosIPComponent } from './master-page/resultados-ip/resultados-ip.component';
import { ResultadosIPMaskComponent } from './master-page/resultados-ip-mask/resultados-ip-mask.component';
import { ConsultaPorNameserverComponent } from './master-page/consulta-por-nameserver/consulta-por-nameserver.component';
import { ConsultaPorDomainComponent } from './master-page/consulta-por-domain/consulta-por-domain.component';
import { ResultadosNameserverComponent } from './master-page/resultados-nameserver/resultados-nameserver.component';
import { ResultadosDomainComponent } from './master-page/resultados-domain/resultados-domain.component';
import { BusquedaPorEntitiesComponent } from './master-page/busqueda-por-entities/busqueda-por-entities.component';
import { BusquedaPorNameserversComponent } from './master-page/busqueda-por-nameservers/busqueda-por-nameservers.component';
import { BusquedaPorDomainsComponent } from './master-page/busqueda-por-domains/busqueda-por-domains.component';
import { ResultSrchDomainsComponent } from './master-page/result-srch-domains/result-srch-domains.component';
import { ResultSrchNameserversComponent } from './master-page/result-srch-nameservers/result-srch-nameservers.component';
import { ResultSrchEntitiesComponent } from './master-page/result-srch-entities/result-srch-entities.component';
import { QueryIpComponent } from './widget/query-ip/query-ip.component';
import { QueryEntityComponent } from './widget/query-entity/query-entity.component';
import { QueryAutnumComponent } from './widget/query-autnum/query-autnum.component';
import { QueryDomainComponent } from './widget/query-domain/query-domain.component';
import { QueryNameserverComponent } from './widget/query-nameserver/query-nameserver.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MasterPageComponent,
    HomeComponent,
    EmbedPageIframeCodeComponent,
    AboutComponent,
    ConsultaPorAutnumComponent,
    ConsultaPorEntityComponent,
    ConsultaPorIPComponent,
    ResultadosAutnumComponent,
    ResultadosEntityComponent,
    ResultadosIPComponent,
    ResultadosIPMaskComponent,
    ConsultaPorNameserverComponent,
    ConsultaPorDomainComponent,
    ResultadosNameserverComponent,
    ResultadosDomainComponent,
    BusquedaPorEntitiesComponent,
    BusquedaPorNameserversComponent,
    BusquedaPorDomainsComponent,
    ResultSrchDomainsComponent,
    ResultSrchNameserversComponent,
    ResultSrchEntitiesComponent,
    QueryIpComponent,
    QueryEntityComponent,
    QueryAutnumComponent,
    QueryDomainComponent,
    QueryNameserverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ClipboardModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }


// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
