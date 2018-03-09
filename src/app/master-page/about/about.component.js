/**
 * Created by Bruno on 20/06/2017.
 */
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
var ng2_translate_1 = require("ng2-translate");
var utilities_1 = require("../../shared/utilities");
var AboutComponent = (function () {
    function AboutComponent(router, translate) {
        this.router = router;
        this.translate = translate;
        this.cargarLenguaje();
    }
    AboutComponent.prototype.cargarLenguaje = function () {
        utilities_1.Utilities.log("[about.component.ts] - cargarLenguaje: Start");
        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if (localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else {
            this.translate.use(this.translate.getDefaultLang());
        }
        utilities_1.Utilities.log("[about.component.ts] - cargarLenguaje: Finish");
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'about',
        templateUrl: 'about.component.html',
        styleUrls: ['about.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, ng2_translate_1.TranslateService])
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map