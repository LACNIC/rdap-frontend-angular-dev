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
var data_service_1 = require("../../shared/services/data.service");
var utilities_1 = require("../../shared/utilities");
var mensaje_1 = require("../../shared/mensaje");
var error_1 = require("../../shared/error");
var ConsultaPorIPComponent = (function () {
    function ConsultaPorIPComponent(dataService, router, translate) {
        this.dataService = dataService;
        this.router = router;
        this.translate = translate;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = true;
        this.cargarLenguaje();
        this.cargarIpActual();
    }
    ConsultaPorIPComponent.prototype.cargarLenguaje = function () {
        utilities_1.Utilities.log("[consulta-por-ip.component.ts] - cargarLenguaje: Start");
        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if (localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else {
            this.translate.use(this.translate.getDefaultLang());
        }
        utilities_1.Utilities.log("[consulta-por-ip.component.ts] - cargarLenguaje: Finish");
    };
    ConsultaPorIPComponent.prototype.limpiarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    ConsultaPorIPComponent.prototype.cargarIpActual = function () {
        var _this = this;
        this.dataService.getBuscarMiIP()
            .subscribe(function (res) { return _this.parseGetBuscarMiIPOk(res); }, function (error) { return _this.parseGetBuscarMiIPError(error); }, function () { return utilities_1.Utilities.log("[consulta-por-ip.component.ts] - getBuscarMiIP: Completed"); });
    };
    ConsultaPorIPComponent.prototype.parseGetBuscarMiIPOk = function (response) {
        utilities_1.Utilities.log("[consulta-por-ip.component.ts] - parseGetBuscarMiIPOk | response: " + JSON.stringify(response));
        this.valorBuscado = response.ip;
        utilities_1.Utilities.log("[consulta-por-ip.component.ts] - parseGetBuscarMiIPOk | this.valorBuscado: " + this.valorBuscado);
        this.loading = false;
    };
    ConsultaPorIPComponent.prototype.parseGetBuscarMiIPError = function (error) {
        utilities_1.Utilities.log("[consulta-por-ip.component.ts] - parseGetBuscarMiIPError| error: " + JSON.stringify(error));
        this.valorBuscado = "";
        this.loading = false;
    };
    ConsultaPorIPComponent.prototype.buscar = function () {
        utilities_1.Utilities.log("[consulta-por-ip.component.ts] - buscar: Start");
        this.limpiarMensajes();
        this.validarDatoBuscado();
        utilities_1.Utilities.log("[consulta-por-ip.component.ts] - buscar: Finish");
    };
    ConsultaPorIPComponent.prototype.validarDatoBuscado = function () {
        utilities_1.Utilities.log("[consulta-por-ip.component.ts] - validarDatoBuscado: Start");
        if (this.valorBuscado == null || this.valorBuscado == "") {
            this.traducirError("CONSULTAPORIP.Errores.valorBuscadoVacio");
        }
        else {
            this.buscarIP();
        }
        utilities_1.Utilities.log("[consulta-por-ip.component.ts] - validarDatoBuscado: Finish");
    };
    ConsultaPorIPComponent.prototype.traducirError = function (paraTraducir) {
        var _this = this;
        this.translate.get(paraTraducir)
            .subscribe(function (value) { return _this.mostrarError(value); }, function (error) { return _this.translateError(error); }, function () { return utilities_1.Utilities.log("[consulta-por-ip.component.ts] - translate.get: Completed"); });
    };
    ConsultaPorIPComponent.prototype.mostrarError = function (errorDescription) {
        var error = new error_1.Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    };
    ConsultaPorIPComponent.prototype.translateError = function (error) {
        utilities_1.Utilities.log("[consulta-por-ip.component.ts] - translateError | error: " + JSON.stringify(error));
    };
    ConsultaPorIPComponent.prototype.buscarIP = function () {
        this.router.navigate(['/ip', this.valorBuscado]);
    };
    return ConsultaPorIPComponent;
}());
ConsultaPorIPComponent = __decorate([
    core_1.Component({
        selector: 'consulta-por-ip',
        templateUrl: 'consulta-por-ip.component.html',
        styleUrls: ['consulta-por-ip.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, ng2_translate_1.TranslateService])
], ConsultaPorIPComponent);
exports.ConsultaPorIPComponent = ConsultaPorIPComponent;
//# sourceMappingURL=consulta-por-ip.component.js.map