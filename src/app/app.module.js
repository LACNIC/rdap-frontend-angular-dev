"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var ng2_translate_1 = require("ng2-translate");
var data_service_1 = require("./shared/services/data.service");
var master_page_component_1 = require("./master-page/master-page.component");
var home_component_1 = require("./master-page/home/home.component");
var consulta_por_ip_component_1 = require("./master-page/consulta-por-ip/consulta-por-ip.component");
var consulta_por_entity_component_1 = require("./master-page/consulta-por-entity/consulta-por-entity.component");
var about_component_1 = require("./master-page/about/about.component");
var resultados_ip_component_1 = require("./master-page/resultados-ip/resultados-ip.component");
var resultados_entity_component_1 = require("./master-page/resultados-entity/resultados-entity.component");
var consulta_por_autnum_component_1 = require("./master-page/consulta-por-autnum/consulta-por-autnum.component");
var resultados_autnum_component_1 = require("./master-page/resultados-autnum/resultados-autnum.component");
var resultados_ip_mask_component_1 = require("./master-page/resultados-ip-mask/resultados-ip-mask.component");
var not_found_component_1 = require("./not-found.component");
function createTranslateLoader(http) {
    return new ng2_translate_1.TranslateStaticLoader(http, './src/i18n', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, ng2_translate_1.TranslateModule.forRoot({
                provide: ng2_translate_1.TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [http_1.Http],
            }), app_routing_1.RoutingModule],
        declarations: [
            app_component_1.AppComponent, master_page_component_1.MasterPageComponent, home_component_1.HomeComponent, consulta_por_ip_component_1.ConsultaPorIPComponent, consulta_por_entity_component_1.ConsultaPorEntityComponent, resultados_ip_mask_component_1.ResultadosIPMaskComponent,
            about_component_1.AboutComponent, resultados_ip_component_1.ResultadosIPComponent, resultados_entity_component_1.ResultadosEntityComponent, not_found_component_1.PageNotFoundComponent, consulta_por_autnum_component_1.ConsultaPorAutnumComponent, resultados_autnum_component_1.ResultadosAutnumComponent
        ],
        providers: [data_service_1.DataService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map