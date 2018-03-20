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
var platform_browser_1 = require("@angular/platform-browser");
var ResultadosIPComponent = (function () {
    function ResultadosIPComponent(dataService, route, translate, sanitizer) {
        this.dataService = dataService;
        this.route = route;
        this.translate = translate;
        this.sanitizer = sanitizer;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = true;
        this.datosIP = [];
        this.datosEntities = [];
        this.datosEntity = [];
        this.mostarDatosExta = true;
        this.cargarLenguaje();
    }
    ResultadosIPComponent.prototype.ngOnInit = function () {
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - ngOnInit: Start");
        this.IP = this.route.snapshot.params['ip'];
        if (this.IP != undefined && this.IP != null && this.IP != "") {
            this.buscarDatosIP();
        }
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - ngOnInit: Finish");
    };
    ResultadosIPComponent.prototype.cargarLenguaje = function () {
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
    ResultadosIPComponent.prototype.limpiarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    ResultadosIPComponent.prototype.traducirError = function (paraTraducir) {
        var _this = this;
        this.translate.get(paraTraducir)
            .subscribe(function (value) { return _this.mostrarError(value); }, function (error) { return _this.translateError(error); }, function () { return utilities_1.Utilities.log("[resultados-autnum.component.ts] - translate.get: Completed"); });
    };
    ResultadosIPComponent.prototype.mostrarError = function (errorDescription) {
        var error = new error_1.Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    };
    ResultadosIPComponent.prototype.translateError = function (error) {
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - translateError | error: " + JSON.stringify(error));
    };
    ResultadosIPComponent.prototype.buscarDatosIP = function () {
        var _this = this;
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum: Start");
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum | this.AUTNUM: " + this.IP);
        this.dataService.getBuscarIP(this.IP)
            .subscribe(function (res) { return _this.parseGetBuscarIPOk(res); }, function (error) { return _this.parseGetBuscarIPError(error); }, function () { return utilities_1.Utilities.log("[resultados-autnum.component.ts] - getBuscarIP: Completed"); });
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum: Finish");
    };
    ResultadosIPComponent.prototype.parseGetBuscarIPOk = function (response) {
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutumOk | response: " + JSON.stringify(response));
        var respuesta = response;
        this.obtenerDatosIP(respuesta);
        this.obtenerEntities(respuesta);
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutumOk | respuesta: " + JSON.stringify(respuesta));
        //this.loading = false;
    };
    ResultadosIPComponent.prototype.parseGetBuscarIPError = function (error) {
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutnumError| error: " + JSON.stringify(error));
        this.traducirError("RESULTADOSIP.Errores.sinResultados");
        this.traducirError("RESULTADOSIP.Errores.verifiqueYReintente");
        this.loading = false;
    };
    ResultadosIPComponent.prototype.obtenerDatosIP = function (respuesta) {
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
        for (var i = 0; i < respuesta.events.length; i++) {
            if (respuesta.events[i].eventAction.includes("registration")) {
                registrationDate = respuesta.events[i].eventDate;
            }
            if (respuesta.events[i].eventAction.includes("last changed")) {
                lastChangedDate = respuesta.events[i].eventDate;
            }
        }
        this.datosIP.push(registrationDate, lastChangedDate);
    };
    ResultadosIPComponent.prototype.obtenerEntities = function (respuesta) {
        //Datos de las tablas CONTACTS
        if (respuesta.entities.length <= 0) {
        }
        else {
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
                    }
                }
                this.datosEntities.push({
                    "Roles": roles,
                    "Handle": e.handle,
                    "Name": name,
                    "Link": link,
                });
            }
            //Utilities.log(JSON.stringify(this.datosEntities[0]));
            this.completarDatosEntities(this.datosEntities);
        }
    };
    ResultadosIPComponent.prototype.buscarDatosExtraEntity = function (entity) {
        var _this = this;
        this.dataService.getBuscarEntity(entity)
            .subscribe(function (res) {
            _this.parseGetBuscarEntityOk(res);
        }, function (error) { return _this.parseGetBuscarEntityError(error); }, function () { return utilities_1.Utilities.log("[resultados-autnum.component.ts] - getBuscarIP: Completed"); });
        utilities_1.Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum: Finish");
    };
    ResultadosIPComponent.prototype.parseGetBuscarEntityOk = function (response) {
        utilities_1.Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | response: " + JSON.stringify(response));
        var respuesta = response;
        return this.obtenerDatosEntity(respuesta);
        // Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | respuesta: " + JSON.stringify(respuesta));
    };
    ResultadosIPComponent.prototype.parseGetBuscarEntityError = function (error) {
        utilities_1.Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityError | error: " + JSON.stringify(error));
        this.traducirError("RESULTADOSENTITY.Errores.sinResultados");
        this.traducirError("RESULTADOSENTITY.Errores.verifiqueYReintente");
        this.loading = false;
    };
    ResultadosIPComponent.prototype.obtenerDatosEntity = function (respuesta) {
        var handle = "No data";
        var name = "No data";
        var country = "No data";
        var roles = "No data";
        var address = "No data";
        var city = "No data";
        var email = "No data";
        var postalCode = "No data";
        var telephone = "No data";
        var lastChangedDate = "No data";
        var registrationDate = "No data";
        if (typeof respuesta.events != "undefined") {
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
        }
        handle = respuesta.handle;
        if (respuesta.roles.length > 0) {
            roles = "[";
            for (var i = 0; i < respuesta.roles.length; i++) {
                roles += respuesta.roles[i].toUpperCase();
                if (i < respuesta.roles.length - 1) {
                    roles += ", ";
                }
            }
            roles += "]";
        }
        for (var _i = 0, _a = respuesta.vcardArray[1]; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v[0] == "fn") {
                name = v[3];
            }
            if (v[0] == "adr") {
                address = v[3][2] + " " + v[3][1];
                city = v[3][3];
                country = v[3][6];
                postalCode = v[3][5];
            }
            if (v[0] == "email") {
                email = v[3];
            }
            if (v[0] == "tel") {
                telephone = v[3];
            }
        }
        var result = [];
        result.push({
            "Handle": handle,
            "Name": name,
            "Country": country,
            "Roles": roles,
            "Address": address,
            "City": city,
            "PostalCode": postalCode,
            "Email": email,
            "Telephone": telephone,
            "Registration": registrationDate,
            "LastChanged": lastChangedDate,
        });
        return result;
    };
    ResultadosIPComponent.prototype.completarDatosEntities = function (datos) {
        var _this = this;
        var _loop_1 = function (i) {
            var handle = datos[i].Handle;
            this_1.dataService.getBuscarEntity(handle)
                .subscribe(function (res) {
                var result = _this.parseGetBuscarEntityOk(res);
                var e = _this.datosEntities[i];
                //e["Address"]= result[0].Address;
                e["Name"] = result[0].Name;
                e["Telephone"] = result[0].Telephone;
                e["Email"] = result[0].Email;
                e["Info"] = "http://rdap-web.lacnic.net/entity/" + handle;
                _this.datosEntities[i] = e;
            }, function (error) {
                //this.parseGetBuscarEntityError(error)
                _this.mostarDatosExta = false;
            }, function () { return utilities_1.Utilities.log("[resultados-autnum.component.ts] - getBuscarIP: Completed"); });
        };
        var this_1 = this;
        for (var i = 0; i < datos.length; i++) {
            _loop_1(i);
        }
        this.loading = false;
    };
    ResultadosIPComponent.prototype.sanitize = function (url) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    };
    return ResultadosIPComponent;
}());
ResultadosIPComponent = __decorate([
    core_1.Component({
        templateUrl: 'resultados-ip.component.html',
        styleUrls: ['resultados-ip.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.ActivatedRoute, ng2_translate_1.TranslateService, platform_browser_1.DomSanitizer])
], ResultadosIPComponent);
exports.ResultadosIPComponent = ResultadosIPComponent;
//# sourceMappingURL=resultados-ip.component.js.map