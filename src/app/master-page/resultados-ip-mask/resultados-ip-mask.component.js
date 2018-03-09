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
var ResultadosIPMaskComponent = (function () {
    function ResultadosIPMaskComponent(dataService, route, translate) {
        this.dataService = dataService;
        this.route = route;
        this.translate = translate;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = true;
        this.datosIP = [];
        this.datosEntities = [];
        this.cargarLenguaje();
    }
    ResultadosIPMaskComponent.prototype.ngOnInit = function () {
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - ngOnInit: Start");
        this.IP = this.route.snapshot.params['ip'];
        this.MASK = this.route.snapshot.params['mask'];
        if (this.IP != undefined && this.IP != null && this.IP != "") {
            if (this.MASK != undefined && this.MASK != null && this.MASK != "") {
                this.buscarDatosIPConMask();
            }
            this.buscarDatosIP;
        }
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - ngOnInit: Finish");
    };
    ResultadosIPMaskComponent.prototype.cargarLenguaje = function () {
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - cargarLenguaje: Start");
        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if (localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else {
            this.translate.use(this.translate.getDefaultLang());
        }
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - cargarLenguaje: Finish");
    };
    ResultadosIPMaskComponent.prototype.limpiarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    ResultadosIPMaskComponent.prototype.traducirError = function (paraTraducir) {
        var _this = this;
        this.translate.get(paraTraducir)
            .subscribe(function (value) { return _this.mostrarError(value); }, function (error) { return _this.translateError(error); }, function () { return utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - translate.get: Completed"); });
    };
    ResultadosIPMaskComponent.prototype.mostrarError = function (errorDescription) {
        var error = new error_1.Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    };
    ResultadosIPMaskComponent.prototype.translateError = function (error) {
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - translateError | error: " + JSON.stringify(error));
    };
    ResultadosIPMaskComponent.prototype.buscarDatosIP = function () {
        var _this = this;
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - buscarDatosIPMask: Start");
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - buscarDatosIPMask | this.AUTNUM: " + this.IP);
        this.dataService.getBuscarIP(this.IP)
            .subscribe(function (res) { return _this.parseGetBuscarIPOk(res); }, function (error) { return _this.parseGetBuscarIPError(error); }, function () { return utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - getBuscarIP: Completed"); });
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - buscarDatosIPMask: Finish");
    };
    ResultadosIPMaskComponent.prototype.buscarDatosIPConMask = function () {
        var _this = this;
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - buscarDatosIPMask: Start");
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - buscarDatosIPMask | this.AUTNUM: " + this.IP);
        this.dataService.getBuscarIP(this.IP.concat("/").concat(this.MASK))
            .subscribe(function (res) { return _this.parseGetBuscarIPOk(res); }, function (error) { return _this.parseGetBuscarIPError(error); }, function () { return utilities_1.Utilities.log("[resultados-ip-mask-mask.component.ts] - getBuscarIP: Completed"); });
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - buscarDatosIPMask: Finish");
    };
    ResultadosIPMaskComponent.prototype.parseGetBuscarIPOk = function (response) {
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - parseGetBuscarAutumOk | response: " + JSON.stringify(response));
        var respuesta = response;
        this.obtenerDatosIP(respuesta);
        this.obtenerEntities(respuesta);
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - parseGetBuscarAutumOk | respuesta: " + JSON.stringify(respuesta));
    };
    ResultadosIPMaskComponent.prototype.parseGetBuscarIPError = function (error) {
        utilities_1.Utilities.log("[resultados-ip-mask.component.ts] - parseGetBuscarAutnumError| error: " + JSON.stringify(error));
        this.traducirError("RESULTADOSIP.Errores.sinResultados");
        this.traducirError("RESULTADOSIP.Errores.verifiqueYReintente");
        this.loading = false;
    };
    ResultadosIPMaskComponent.prototype.obtenerDatosIP = function (respuesta) {
        //Datos de la tabla IP
        this.datosIP.push(respuesta.handle);
        // this.datosIP.push(respuesta.name);
        this.datosIP.push(respuesta.type);
        //this.datosIP.push("No data");
        this.datosIP.push(respuesta.startAddress + " - " + respuesta.endAddress);
        this.datosIP.push(respuesta.ipVersion);
        // this.datosIP.push(respuesta.country);
        var lastChangedDate = "No data";
        var registrationDate = "No data";
        if (respuesta.events.length > 0) {
            for (var i = 0; i < respuesta.events.length; i++) {
                if (respuesta.events[i].eventAction.includes("registration")) {
                    registrationDate = respuesta.events[i].eventDate;
                }
                if (respuesta.events[i].eventAction.includes("last changed")) {
                    lastChangedDate = respuesta.events[i].eventDate;
                }
            }
        }
        this.datosIP.push(registrationDate, lastChangedDate);
    };
    ResultadosIPMaskComponent.prototype.obtenerEntities = function (respuesta) {
        //Datos de las tablas CONTACTS
        if (respuesta.entities.length > 0) {
            for (var _i = 0, _a = respuesta.entities; _i < _a.length; _i++) {
                var e = _a[_i];
                var roles = "No data";
                var name = "No data";
                // var address : string = "No data";
                // var city : string = "No data";
                // var country : string = "No data";
                // var postalCode : string = "No data";
                // var email : string = "No data";
                // var telephone : string = "No data";
                // var registration : string = "No data";
                // var lastChanged : string = "No data";
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
                if (e.links.length > 0) {
                    link = e.links[0].href;
                }
                if (typeof e.vcardArray != "undefined") {
                    for (var _b = 0, _c = e.vcardArray[1]; _b < _c.length; _b++) {
                        var v = _c[_b];
                        if (v[0] == "fn") {
                            name = v[3];
                        }
                        // if (v[0] == "adr") {
                        //     address = v[3][2] + " " + v[3][1];
                        //     city = v[3][3];
                        //     country = v[3][6];
                        //     postalCode = v[3][5];
                        // }
                        // if (v[0] == "email") {
                        //     email = v[3];
                        // }
                        // if (v[0] == "tel") {
                        //     telephone = v[3];
                        // }
                    }
                }
                this.datosEntities.push({
                    "Roles": roles,
                    "Handle": e.handle,
                    "Name": name,
                    "Link": link
                    // "Address" : address,
                    // "City" : city,
                    // "Country" : country,
                    // "PostalCode" : postalCode,
                    // "Email" : email,
                    // "Telephone" : telephone,
                    // "Registration" : registration,
                    // "LastChanged" : lastChanged
                });
            }
        }
        this.loading = false;
    };
    return ResultadosIPMaskComponent;
}());
ResultadosIPMaskComponent = __decorate([
    core_1.Component({
        templateUrl: 'resultados-ip-mask.component.html',
        styleUrls: ['resultados-ip-mask.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.ActivatedRoute, ng2_translate_1.TranslateService])
], ResultadosIPMaskComponent);
exports.ResultadosIPMaskComponent = ResultadosIPMaskComponent;
//# sourceMappingURL=resultados-ip-mask.component.js.map