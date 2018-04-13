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
 * Created by Bruno on 21/06/2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../../shared/services/data.service");
var ng2_translate_1 = require("ng2-translate");
var utilities_1 = require("../../shared/utilities");
var mensaje_1 = require("../../shared/mensaje");
var error_1 = require("../../shared/error");
var util_1 = require("ng2-translate/src/util");
var platform_browser_1 = require("@angular/platform-browser");
var constantes_1 = require("../../shared/constantes");
var ResultadosEntityComponent = (function () {
    function ResultadosEntityComponent(dataService, route, translate, sanitizer) {
        this.dataService = dataService;
        this.route = route;
        this.translate = translate;
        this.sanitizer = sanitizer;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = true;
        this.datosEntity = [];
        this.datosEntities = [];
        this.mostarDatosExta = true;
        this.rederictUrl = constantes_1.Constantes.rederictUrl;
        this.existenNetworks = false;
        this.existenAutnums = false;
        this.cargarLenguaje();
        // this.buscarServerUrl();
    }
    ResultadosEntityComponent.prototype.ngOnInit = function () {
        utilities_1.Utilities.log("[resultados-entity.component.ts] - ngOnInit: Start");
        this.entity = this.route.snapshot.params['entity'].toUpperCase();
        if (this.entity != undefined && this.entity != null && this.entity != "") {
            this.buscarDatosEntity();
        }
        utilities_1.Utilities.log("[resultados-entity.component.ts] - ngOnInit: Finish");
    };
    ResultadosEntityComponent.prototype.buscarServerUrl = function () {
        var _this = this;
        //this.serverURL= AppSettings.SERVER_URL;
        this.dataService.getServerURL()
            .subscribe(function (res) { return _this.parseServerUrlOK(res); }, function (error) { return _this.parseServerUrlError(error); }, function () { return utilities_1.Utilities.log("[resultados-entity.component.ts] - buscarServerUrl: Completed"); });
        utilities_1.Utilities.log("[resultados-entity.component.ts] - getServerUrl: Finish");
    };
    ResultadosEntityComponent.prototype.cargarLenguaje = function () {
        utilities_1.Utilities.log("[resultados-entity.component.ts] - cargarLenguaje: Start");
        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if (localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else {
            this.translate.use(this.translate.getDefaultLang());
        }
        utilities_1.Utilities.log("[resultados-entity.component.ts] - cargarLenguaje: Finish");
    };
    ResultadosEntityComponent.prototype.limpiarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    ResultadosEntityComponent.prototype.traducirError = function (paraTraducir) {
        var _this = this;
        this.translate.get(paraTraducir)
            .subscribe(function (value) { return _this.mostrarError(value); }, function (error) { return _this.translateError(error); }, function () { return utilities_1.Utilities.log("[resultados-entity.component.ts] - translate.get: Completed"); });
    };
    ResultadosEntityComponent.prototype.mostrarError = function (errorDescription) {
        var error = new error_1.Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    };
    ResultadosEntityComponent.prototype.translateError = function (error) {
        utilities_1.Utilities.log("[resultados-entity.component.ts] - translateError | error: " + JSON.stringify(error));
    };
    ResultadosEntityComponent.prototype.buscarDatosEntity = function () {
        var _this = this;
        utilities_1.Utilities.log("[resultados-entity.component.ts] - buscarDatosEntity: Start");
        this.dataService.getBuscarEntity(this.entity)
            .subscribe(function (res) { return _this.parseGetBuscarEntityOk(res); }, function (error) { return _this.parseGetBuscarEntityError(error); }, function () { return utilities_1.Utilities.log("[resultados-entity.component.ts] - getBuscarEntity: Completed"); });
        utilities_1.Utilities.log("[resultados-entity.component.ts] - buscarDatosEntity: Finish");
    };
    ResultadosEntityComponent.prototype.parseGetBuscarEntityOk = function (response) {
        utilities_1.Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | response: " + JSON.stringify(response));
        var respuesta = response;
        this.obtenerDatosEntity(respuesta);
        this.obtenerEntities(respuesta);
        utilities_1.Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | respuesta: " + JSON.stringify(respuesta));
    };
    ResultadosEntityComponent.prototype.parseGetBuscarEntitiesOk = function (response) {
        utilities_1.Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | response: " + JSON.stringify(response));
        var respuesta = response;
        return this.obtenerDatosPorEntity(respuesta);
        // Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | respuesta: " + JSON.stringify(respuesta));
    };
    ResultadosEntityComponent.prototype.parseGetBuscarEntityError = function (error) {
        utilities_1.Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityError | error: " + JSON.stringify(error));
        if (error.json().errorCode == 429) {
            this.traducirError("GENERAL.Errores.ArrayLimit");
        }
        else {
            this.traducirError("RESULTADOSENTITY.Errores.sinResultados");
            this.traducirError("RESULTADOSENTITY.Errores.verifiqueYReintente");
        }
        this.loading = false;
    };
    ResultadosEntityComponent.prototype.parseServerUrlOK = function (response) {
        utilities_1.Utilities.log("[resultados-entity.component.ts] - parseServerUrlOK | response: " + JSON.stringify(response));
        this.serverURL = response.serverUrl;
        utilities_1.Utilities.log("[resultados-entity.component.ts] - parseServerUrlOK | serverUrl: " + this.serverURL);
    };
    ResultadosEntityComponent.prototype.parseServerUrlError = function (error) {
        utilities_1.Utilities.log("[resultados-entity.component.ts] - parseServerUrlError | error: " + JSON.stringify(error));
        this.traducirError("RESULTADOSENTITY.Errores.sinResultados");
        this.traducirError("RESULTADOSENTITY.Errores.verifiqueYReintente");
    };
    ResultadosEntityComponent.prototype.obtenerDatosEntity = function (respuesta) {
        var handle = "No data";
        var name = "No data";
        var country = "No data";
        var roles = "No data";
        var address = "No data";
        var city = "No data";
        var postalCode = "No data";
        var email = "No data";
        var telephone = "No data";
        var operator = "No data";
        var networks = [];
        var autnums = [];
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
        if (typeof respuesta.autnums !== "undefined" && respuesta.autnums.length > 0) {
            this.existenAutnums = true;
            for (var _i = 0, _a = respuesta.autnums; _i < _a.length; _i++) {
                var autnum = _a[_i];
                if (!util_1.equals(autnum, {})) {
                    var link = "No data";
                    link = autnum.links[0].href;
                    autnums.push(link);
                }
            }
        }
        if (typeof respuesta.networks !== "undefined" && respuesta.networks.length > 0) {
            this.existenNetworks = true;
            for (var _b = 0, _c = respuesta.networks; _b < _c.length; _b++) {
                var network = _c[_b];
                if (!util_1.equals(network, {})) {
                    var link = "No data";
                    link = network.links[0].href;
                    networks.push(link);
                }
            }
        }
        for (var _d = 0, _e = respuesta.vcardArray[1]; _d < _e.length; _d++) {
            var v = _e[_d];
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
        this.datosEntity.push({
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
            "Autnums": autnums,
            "Networks": networks
        });
        this.loading = false;
    };
    ResultadosEntityComponent.prototype.obtenerEntities = function (respuesta) {
        //Datos de las tablas CONTACTS
        if (typeof respuesta.entities == "undefined") {
        }
        else {
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
                        }
                    }
                    this.datosEntities.push({
                        "Roles": roles,
                        "Handle": e.handle,
                        "Name": name,
                        "Link": link,
                    });
                }
                utilities_1.Utilities.log(JSON.stringify(this.datosEntities[0]));
                this.completarDatosEntities(this.datosEntities);
            }
        }
    };
    ResultadosEntityComponent.prototype.completarDatosEntities = function (datos) {
        var _this = this;
        var _loop_1 = function (i) {
            var handle = datos[i].Handle;
            this_1.dataService.getBuscarEntity(handle)
                .subscribe(function (res) {
                var result = _this.parseGetBuscarEntitiesOk(res);
                var e = _this.datosEntities[i];
                //e["Address"]= result[0].Address;
                e["Name"] = result[0].Name;
                e["Telephone"] = result[0].Telephone;
                e["Email"] = result[0].Email;
                e["Info"] = _this.rederictUrl + "entity/" + handle;
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
    ResultadosEntityComponent.prototype.sanitize = function (url) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    };
    ResultadosEntityComponent.prototype.obtenerDatosPorEntity = function (respuesta) {
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
    return ResultadosEntityComponent;
}());
ResultadosEntityComponent = __decorate([
    core_1.Component({
        templateUrl: 'resultados-entity.component.html',
        styleUrls: ['resultados-entity.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.ActivatedRoute, ng2_translate_1.TranslateService, platform_browser_1.DomSanitizer])
], ResultadosEntityComponent);
exports.ResultadosEntityComponent = ResultadosEntityComponent;
//# sourceMappingURL=resultados-entity.component.js.map