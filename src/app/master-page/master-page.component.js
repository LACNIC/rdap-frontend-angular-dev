"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var utilities_1 = require("../shared/utilities");
var ng2_translate_1 = require("ng2-translate");
var MasterPageComponent = (function () {
    function MasterPageComponent(router, translate) {
        this.router = router;
        this.translate = translate;
        this.cargarLenguaje();
    }
    MasterPageComponent.prototype.cargarLenguaje = function () {
        utilities_1.Utilities.log("[master-page.component.ts] - cargarLenguaje: Start");
        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        this.idiomaActual = 'es';
        if (localStorage.getItem('lenguaje') != null) {
            var idioma = localStorage.getItem('lenguaje');
            this.translate.use(idioma);
            this.idiomaActual = idioma;
        }
        utilities_1.Utilities.log("[master-page.component.ts] - cargarLenguaje: Finish");
    };
    MasterPageComponent.prototype.cambiarLenguaje = function (lenguaje) {
        utilities_1.Utilities.log("[master-page.component.ts] - cambiarLenguaje: Start");
        localStorage.setItem("lenguaje", lenguaje);
        this.translate.use(lenguaje);
        this.idiomaActual = lenguaje;
        utilities_1.Utilities.log("[master-page.component.ts] - cambiarLenguaje: Finish");
    };
    return MasterPageComponent;
}());
MasterPageComponent = __decorate([
    core_1.Component({
        selector: 'master-page',
        templateUrl: 'master-page.component.html',
        styleUrls: ['master-page.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, ng2_translate_1.TranslateService])
], MasterPageComponent);
exports.MasterPageComponent = MasterPageComponent;
//# sourceMappingURL=master-page.component.js.map