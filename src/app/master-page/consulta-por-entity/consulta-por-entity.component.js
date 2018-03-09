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
/**
 * Created by Bruno on 20/06/2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ng2_translate_1 = require("ng2-translate");
var utilities_1 = require("../../shared/utilities");
var mensaje_1 = require("../../shared/mensaje");
var error_1 = require("../../shared/error");
var ConsultaPorEntityComponent = (function () {
    function ConsultaPorEntityComponent(router, translate) {
        this.router = router;
        this.translate = translate;
        this.mensajes = new mensaje_1.Mensaje();
        this.cargarLenguaje();
    }
    ConsultaPorEntityComponent.prototype.cargarLenguaje = function () {
        utilities_1.Utilities.log("[consulta-por-entity.component.ts] - cargarLenguaje: Start");
        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if (localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else {
            this.translate.use(this.translate.getDefaultLang());
        }
        utilities_1.Utilities.log("[consulta-por-entity.component.ts] - cargarLenguaje: Finish");
    };
    ConsultaPorEntityComponent.prototype.limpiarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    ConsultaPorEntityComponent.prototype.buscar = function () {
        utilities_1.Utilities.log("[consulta-por-entity.component.ts] - buscar: Start");
        this.limpiarMensajes();
        this.validarDatoBuscado();
        utilities_1.Utilities.log("[consulta-por-entity.component.ts] - buscar: Finish");
    };
    ConsultaPorEntityComponent.prototype.validarDatoBuscado = function () {
        utilities_1.Utilities.log("[consulta-por-entity.component.ts] - validarDatoBuscado: Start");
        if (this.valorBuscado == null || this.valorBuscado == "") {
            this.traducirError("CONSULTAPORENTITY.Errores.valorBuscadoVacio");
        }
        else {
            this.buscarEntities();
        }
        utilities_1.Utilities.log("[consulta-por-entity.component.ts] - validarDatoBuscado: Finish");
    };
    ConsultaPorEntityComponent.prototype.traducirError = function (paraTraducir) {
        var _this = this;
        this.translate.get(paraTraducir)
            .subscribe(function (value) { return _this.mostrarError(value); }, function (error) { return _this.translateError(error); }, function () { return utilities_1.Utilities.log("[consulta-por-entity.component.ts] - translate.get: Completed"); });
    };
    ConsultaPorEntityComponent.prototype.mostrarError = function (errorDescription) {
        var error = new error_1.Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    };
    ConsultaPorEntityComponent.prototype.translateError = function (error) {
        utilities_1.Utilities.log("[consulta-por-entity.component.ts] - translateError | error: " + JSON.stringify(error));
    };
    ConsultaPorEntityComponent.prototype.buscarEntities = function () {
        this.router.navigate(['/entity', this.valorBuscado]);
    };
    return ConsultaPorEntityComponent;
}());
ConsultaPorEntityComponent = __decorate([
    core_1.Component({
        selector: 'consulta-por-entity',
        templateUrl: 'consulta-por-entity.component.html',
        styleUrls: ['consulta-por-entity.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, ng2_translate_1.TranslateService])
], ConsultaPorEntityComponent);
exports.ConsultaPorEntityComponent = ConsultaPorEntityComponent;
//# sourceMappingURL=consulta-por-entity.component.js.map