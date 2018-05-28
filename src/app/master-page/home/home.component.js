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
var data_service_1 = require("../../shared/services/data.service");
var ng2_translate_1 = require("ng2-translate");
var utilities_1 = require("../../shared/utilities");
var mensaje_1 = require("../../shared/mensaje");
var error_1 = require("../../shared/error");
var HomeComponent = (function () {
    function HomeComponent(dataService, router, translate) {
        this.dataService = dataService;
        this.router = router;
        this.translate = translate;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = false;
        this.cargarLenguaje();
        this.tipoBuscado = 2;
    }
    HomeComponent.prototype.cargarLenguaje = function () {
        utilities_1.Utilities.log("[home.component.ts] - cargarLenguaje: Start");
        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if (localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else {
            this.translate.use(this.translate.getDefaultLang());
        }
        utilities_1.Utilities.log("[home.component.ts] - cargarLenguaje: Finish");
    };
    HomeComponent.prototype.limpiarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    HomeComponent.prototype.parseGetBuscarMiIPOk = function (response) {
        utilities_1.Utilities.log("[home.component.ts] - parseGetBuscarMiIPOk | response: " + JSON.stringify(response));
        this.valorBuscado = response.clientIP;
        utilities_1.Utilities.log("[home.component.ts] - parseGetBuscarMiIPOk | this.valorBuscado: " + this.valorBuscado);
        this.loading = false;
    };
    HomeComponent.prototype.parseGetBuscarMiIPError = function (error) {
        utilities_1.Utilities.log("[home.component.ts] - parseGetBuscarMiIPError| error: " + JSON.stringify(error));
        this.valorBuscado = "";
        this.loading = false;
    };
    HomeComponent.prototype.buscar = function () {
        utilities_1.Utilities.log("[home.component.ts] - buscar: Start");
        this.limpiarMensajes();
        this.validarDatoBuscado();
        utilities_1.Utilities.log("[home.component.ts] - buscar: Finish");
    };
    HomeComponent.prototype.validarDatoBuscado = function () {
        utilities_1.Utilities.log("[home.component.ts] - validarDatoBuscado: Start");
        if (this.valorBuscado == null || this.valorBuscado == "") {
            this.traducirError("HOME.Errores.valorBuscadoVacio");
        }
        else {
            if (this.tipoBuscado == 1) {
                this.buscarAutnum();
            }
            if (this.tipoBuscado == 2) {
                this.buscarIP();
            }
            if (this.tipoBuscado == 3) {
                this.buscarEntity();
            }
            //if(this.tipoBuscado == 6){ //Si está buscando por Entities by Name
            //  this.buscarEntitiesByName();
            //}
        }
        utilities_1.Utilities.log("[home.component.ts] - validarDatoBuscado: Finish");
    };
    HomeComponent.prototype.traducirError = function (paraTraducir) {
        var _this = this;
        this.translate.get(paraTraducir)
            .subscribe(function (value) { return _this.mostrarError(value); }, function (error) { return _this.translateError(error); }, function () { return utilities_1.Utilities.log("[home.component.ts] - translate.get: Completed"); });
    };
    HomeComponent.prototype.mostrarError = function (errorDescription) {
        var error = new error_1.Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    };
    HomeComponent.prototype.translateError = function (error) {
        utilities_1.Utilities.log("[home.component.ts] - translateError | error: " + JSON.stringify(error));
    };
    HomeComponent.prototype.buscarIP = function () {
        this.router.navigate(['/ip', this.valorBuscado]);
    };
    HomeComponent.prototype.buscarEntity = function () {
        this.router.navigate(['/entity', this.valorBuscado]);
    };
    HomeComponent.prototype.buscarAutnum = function () {
        if (this.valorBuscado.toLocaleUpperCase().includes("AS")) {
            this.valorBuscado = this.valorBuscado.substring(2);
        }
        this.router.navigate(['/autnum', this.valorBuscado]);
    };
    HomeComponent.prototype.buscarEntitiesByName = function () {
        this.router.navigate(['/entities', this.valorBuscado]);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: 'home.component.html',
        styleUrls: ['home.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, ng2_translate_1.TranslateService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map