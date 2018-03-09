"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
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
var appRoutes = [
    {
        path: '', component: master_page_component_1.MasterPageComponent,
        children: [
            { path: '', component: home_component_1.HomeComponent },
            { path: 'home', component: home_component_1.HomeComponent },
            { path: 'consulta-por-ip', component: consulta_por_ip_component_1.ConsultaPorIPComponent },
            { path: 'consulta-por-entity', component: consulta_por_entity_component_1.ConsultaPorEntityComponent },
            //{ path: 'consulta-entities-por-nombre', component: ConsultaEntitiesPorNombreComponent },
            { path: 'about', component: about_component_1.AboutComponent },
            { path: 'ip/:ip', component: resultados_ip_component_1.ResultadosIPComponent },
            { path: 'ip/:ip/:mask', component: resultados_ip_mask_component_1.ResultadosIPMaskComponent },
            { path: 'entity/:entity', component: resultados_entity_component_1.ResultadosEntityComponent },
            { path: 'consulta-por-autnum', component: consulta_por_autnum_component_1.ConsultaPorAutnumComponent },
            //{ path: 'reporte-asn/:country', component: ReporteASNComponent },
            { path: 'autnum/:autnum', component: resultados_autnum_component_1.ResultadosAutnumComponent },
        ]
    },
    { path: '**', component: not_found_component_1.PageNotFoundComponent }
];
exports.RoutingModule = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map