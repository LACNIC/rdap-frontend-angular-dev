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
 * Created by Bruno on 13/06/2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../../shared/services/data.service");
var ng2_translate_1 = require("ng2-translate");
var utilities_1 = require("../../shared/utilities");
var mensaje_1 = require("../../shared/mensaje");
var error_1 = require("../../shared/error");
var ResultadosAutnumComponent = (function () {
    function ResultadosAutnumComponent(dataService, route, translate) {
        this.dataService = dataService;
        this.route = route;
        this.translate = translate;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = true;
        this.datosEvents = [];
        this.datosEntities = [];
        this.datosAutnum = [];
        this.cargarLenguaje();
    }
    ResultadosAutnumComponent.prototype.ngOnInit = function () {
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - ngOnInit: Start");
        this.AUTNUM = this.route.snapshot.params['autnum'];
        if (this.AUTNUM != undefined && this.AUTNUM != null && this.AUTNUM != "") {
            this.buscarDatosAutnum();
        }
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - ngOnInit: Finish");
    };
    ResultadosAutnumComponent.prototype.cargarLenguaje = function () {
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - cargarLenguaje: Start");
        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if (localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else {
            this.translate.use(this.translate.getDefaultLang());
        }
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - cargarLenguaje: Finish");
    };
    ResultadosAutnumComponent.prototype.limpiarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    ResultadosAutnumComponent.prototype.traducirError = function (paraTraducir) {
        var _this = this;
        this.translate.get(paraTraducir)
            .subscribe(function (value) { return _this.mostrarError(value); }, function (error) { return _this.translateError(error); }, function () { return utilities_1.Utilities.log("[resultados-autnum.component.ts] - translate.get: Completed"); });
    };
    ResultadosAutnumComponent.prototype.mostrarError = function (errorDescription) {
        var error = new error_1.Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    };
    ResultadosAutnumComponent.prototype.translateError = function (error) {
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - translateError | error: " + JSON.stringify(error));
    };
    ResultadosAutnumComponent.prototype.buscarDatosAutnum = function () {
        var _this = this;
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum: Start");
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum | this.AUTNUM: " + this.AUTNUM);
        this.dataService.getBuscarAutnum(this.AUTNUM)
            .subscribe(function (res) { return _this.parseGetBuscarAutumOk(res); }, function (error) { return _this.parseGetBuscarAutnumError(error); }, function () { return utilities_1.Utilities.log("[resultados-autnum.component.ts] - getBuscarIP: Completed"); });
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum: Finish");
    };
    ResultadosAutnumComponent.prototype.parseGetBuscarAutumOk = function (response) {
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutumOk | response: " + JSON.stringify(response));
        var respuesta = response;
        this.obtenerDatosAutnum(respuesta);
        this.obtenerEntities(respuesta);
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutumOk | respuesta: " + JSON.stringify(respuesta));
    };
    ResultadosAutnumComponent.prototype.parseGetBuscarAutnumError = function (error) {
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutnumError| error: " + JSON.stringify(error));
        this.traducirError("RESULTADOSAUTNUM.Errores.sinResultados");
        this.traducirError("RESULTADOSAUTNUM.Errores.verifiqueYReintente");
        this.loading = false;
    };
    ResultadosAutnumComponent.prototype.obtenerDatosAutnum = function (respuesta) {
        //Datos de la tabla AUTNUM
        this.datosAutnum.push(respuesta.handle);
        // this.datosAutnum.push(respuesta.name);
        this.datosAutnum.push(respuesta.type);
        // this.datosAutnum.push("No data");
        // this.datosAutnum.push(respuesta.startAddress + " - " + respuesta.endAddress);
        // this.datosAutnum.push(respuesta.ipVersion);
        // this.datosAutnum.push(respuesta.country);
        var lastChangedDate = "No data";
        var registrationDate = "No data";
        if (respuesta.events.length > 0) {
            registrationDate = respuesta.events[0].eventDate;
            lastChangedDate = respuesta.events[1].eventDate;
        }
        this.datosAutnum.push(registrationDate, lastChangedDate);
    };
    ResultadosAutnumComponent.prototype.obtenerEntities = function (respuesta) {
        //Datos de las tablas CONTACTS
        if (respuesta.entities.length > 0) {
            for (var _i = 0, _a = respuesta.entities; _i < _a.length; _i++) {
                var e = _a[_i];
                var roles = "No data";
                var name = "No data";
                var link = "No data";
                if (e.roles.length > 0) {
                    roles = "[";
                    for (var i = 0; i < e.roles.length; i++) {
                        roles += e.roles[i].toUpperCase();
                        if (i < e.roles.length - 1) {
                            roles += ", ";
                        }
                    }
                    roles += "]";
                }
                if (typeof e.vcardArray != "undefined") {
                    for (var _b = 0, _c = e.vcardArray[1]; _b < _c.length; _b++) {
                        var v = _c[_b];
                        if (v[0] == "fn") {
                            name = v[3];
                        }
                    }
                }
                if (e.links.length > 0) {
                    link = e.links[0].href;
                }
                this.datosEntities.push({
                    "Roles": roles,
                    "Handle": e.handle,
                    "Name": name,
                    "Link": link
                });
            }
        }
        this.loading = false;
    };
    return ResultadosAutnumComponent;
}());
ResultadosAutnumComponent = __decorate([
    core_1.Component({
        templateUrl: 'resultados-autnum.component.html',
        styleUrls: ['resultados-autnum.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.ActivatedRoute, ng2_translate_1.TranslateService])
], ResultadosAutnumComponent);
exports.ResultadosAutnumComponent = ResultadosAutnumComponent;
//# sourceMappingURL=resultados-autnum.component.js.map