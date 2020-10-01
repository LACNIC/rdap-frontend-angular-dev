import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MasterPageComponent,
    HomeComponent,
    AboutComponent,
    ConsultaPorAutnumComponent,
    ConsultaPorEntityComponent,
    ConsultaPorIPComponent,
    ResultadosAutnumComponent,
    ResultadosEntityComponent,
    ResultadosIPComponent,
    ResultadosIPMaskComponent
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
