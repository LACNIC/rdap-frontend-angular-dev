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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var utilities_1 = require("../utilities");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var app_settings_1 = require("../../app.settings");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Accept': 'text/html,application/xhtml+xml,application/xml, application/json' });
        this.options = new http_1.RequestOptions({ responseType: http_1.ResponseContentType.Json, headers: this.headers });
    }
    DataService.prototype.getBuscarMiIP = function () {
        utilities_1.Utilities.log("[data.service.ts] - getBuscarIP: Start");
        var url = app_settings_1.AppSettings.SERVICE_IP_API_URL;
        utilities_1.Utilities.log("[data.service.ts] - getBuscarMiIP | url: " + url);
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getServerURL = function () {
        utilities_1.Utilities.log("[data.service.ts] - getBuscarIP: Start");
        /** this.http.get('src/urls.json').subscribe(data => {
             // Read the result field from the JSON response.
             return data['results'];
 
 
         });*/
        return this.http.get('/src/urls.json', this.options)
            .map(function (data) { return data.json(); });
    };
    DataService.prototype.getBuscarIP = function (ipBuscada) {
        utilities_1.Utilities.log("[data.service.ts] - getBuscarIP: Start");
        var url = "https://rdap.lacnic.net/rdap/ip/" + ipBuscada;
        utilities_1.Utilities.log("[data.service.ts] - getBuscarIP | url: " + url);
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getBuscarAutnum = function (autnumBuscado) {
        utilities_1.Utilities.log("[data.service.ts] - getBuscarAutnum: Start");
        var url = "https://rdap.lacnic.net/rdapt/autnum/" + autnumBuscado;
        utilities_1.Utilities.log("[data.service.ts] - getBuscarAutnum | url: " + url);
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getBuscarEntity = function (entityBuscada) {
        utilities_1.Utilities.log("[data.service.ts] - getBuscarEntity: Start");
        var url = "https://rdap.lacnic.net/rdap/entity/" + entityBuscada;
        utilities_1.Utilities.log("[data.service.ts] - getBuscarEntity | url: " + url);
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getBuscarEntities = function (nombreBuscado) {
        utilities_1.Utilities.log("[data.service.ts] - getBuscarEntities: Start");
        var url = "https://rdap.lacnic.net/rdap/entities?fn=" + nombreBuscado + "*";
        utilities_1.Utilities.log("[data.service.ts] - getBuscarEntities | url: " + url);
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /**public getBuscarASNs(pais:string){
        Utilities.log("[data.service.ts] - getBuscarASN: Start");
        var url :string = AppSettings.SERVICE_API_URL + "/asns";
        if(pais != ""){
            url += "/" + pais;
        }
        Utilities.log("[data.service.ts] - getBuscarASN | url: " + url);
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }*/
    DataService.prototype.getCargarPaisesASNs = function () {
        utilities_1.Utilities.log("[data.service.ts] - getCargarPaisesASNs: Start");
        var url = "http://rdap-backend-test.us-east-1.elasticbeanstalk.com/api/paises";
        utilities_1.Utilities.log("[data.service.ts] - getCargarPaisesASNs | url: " + url);
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.handleError = function (error) {
        if (error.json().errorCode == 404) {
            return Observable_1.Observable.throw("404");
        }
        else {
            return Observable_1.Observable.throw(error || "Server Error");
        }
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map