import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {Http, HttpModule, JsonpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {RoutingModule} from './app.routing';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from "ng2-translate";
import {DataService} from "./shared/services/data.service";
import {MasterPageComponent} from './master-page/master-page.component';
import {HomeComponent} from './master-page/home/home.component';
import {ConsultaPorIPComponent} from './master-page/consulta-por-ip/consulta-por-ip.component';
import {ConsultaPorEntityComponent} from './master-page/consulta-por-entity/consulta-por-entity.component';
import {AboutComponent} from './master-page/about/about.component';
import {ResultadosIPComponent} from './master-page/resultados-ip/resultados-ip.component';
import {ResultadosEntityComponent} from './master-page/resultados-entity/resultados-entity.component';
import {ConsultaPorAutnumComponent} from './master-page/consulta-por-autnum/consulta-por-autnum.component';
import {ResultadosAutnumComponent} from './master-page/resultados-autnum/resultados-autnum.component';
import {ResultadosIPMaskComponent} from './master-page/resultados-ip-mask/resultados-ip-mask.component';
import {PageNotFoundComponent} from './not-found.component';


export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './src/i18n', '.json');
}

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http],
    }), RoutingModule],
    declarations: [
        AppComponent, MasterPageComponent, HomeComponent, ConsultaPorIPComponent, ConsultaPorEntityComponent, ResultadosIPMaskComponent,
        AboutComponent, ResultadosIPComponent, ResultadosEntityComponent, PageNotFoundComponent, ConsultaPorAutnumComponent, ResultadosAutnumComponent
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})

export class AppModule {

}
