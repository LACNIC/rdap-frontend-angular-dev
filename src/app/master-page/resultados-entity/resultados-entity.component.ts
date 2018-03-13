/**
 * Created by Bruno on 21/06/2017.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../shared/services/data.service';
import {TranslateService} from "ng2-translate";
import {Utilities} from "../../shared/utilities";
import {Mensaje} from "../../shared/mensaje";
import {Exito} from "../../shared/exito";
import {Error} from "../../shared/error";
import {ResponseEntity} from "../../shared/responseEntity";
import {equals} from 'ng2-translate/src/util';
import {ResponseIP} from "../../shared/responseIP";
import {DomSanitizer} from '@angular/platform-browser';
import {Constantes} from '../../shared/constantes';


@Component({
    templateUrl: 'resultados-entity.component.html',
    styleUrls: ['resultados-entity.css']
})

export class ResultadosEntityComponent implements OnInit {

    mensajes: Mensaje = new Mensaje();
    loading: boolean = true;
    entity: string;
    datosEntity: any[] = [];
    serverURL: any;
    private datosEntities: any[] = [];
    private mostarDatosExta: boolean=true;
    rederictUrl:string= Constantes.rederictUrl;



    constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService, private sanitizer:DomSanitizer) {
        this.cargarLenguaje();
        // this.buscarServerUrl();
    }

    ngOnInit() {
        Utilities.log("[resultados-entity.component.ts] - ngOnInit: Start");

        this.entity = this.route.snapshot.params['entity'].toUpperCase();
        if (this.entity != undefined && this.entity != null && this.entity != "") {
            this.buscarDatosEntity();
        }

        Utilities.log("[resultados-entity.component.ts] - ngOnInit: Finish");
    }

    buscarServerUrl() {
        //this.serverURL= AppSettings.SERVER_URL;
        this.dataService.getServerURL()
            .subscribe(
                res => this.parseServerUrlOK(res),
                error => this.parseServerUrlError(error),
                () => Utilities.log("[resultados-entity.component.ts] - buscarServerUrl: Completed")
            );


        Utilities.log("[resultados-entity.component.ts] - getServerUrl: Finish");
    }

    cargarLenguaje() {
        Utilities.log("[resultados-entity.component.ts] - cargarLenguaje: Start");

        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if (localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else {
            this.translate.use(this.translate.getDefaultLang());
        }

        Utilities.log("[resultados-entity.component.ts] - cargarLenguaje: Finish");
    }

    limpiarMensajes() {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    traducirError(paraTraducir: string) {
        this.translate.get(paraTraducir)
            .subscribe(
                value => this.mostrarError(value),
                error => this.translateError(error),
                () => Utilities.log("[resultados-entity.component.ts] - translate.get: Completed")
            );
    }

    mostrarError(errorDescription: string) {
        var error: Error = new Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    }

    translateError(error: any) {
        Utilities.log("[resultados-entity.component.ts] - translateError | error: " + JSON.stringify(error));
    }

    buscarDatosEntity() {
        Utilities.log("[resultados-entity.component.ts] - buscarDatosEntity: Start");

        this.dataService.getBuscarEntity(this.entity)
            .subscribe(
                res => this.parseGetBuscarEntityOk(res),
                error => this.parseGetBuscarEntityError(error),
                () => Utilities.log("[resultados-entity.component.ts] - getBuscarEntity: Completed")
            );

        Utilities.log("[resultados-entity.component.ts] - buscarDatosEntity: Finish");
    }

    parseGetBuscarEntityOk(response: any) {
        Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | response: " + JSON.stringify(response));

        var respuesta: ResponseEntity = response;
        this.obtenerDatosEntity(respuesta);
        this.obtenerEntities(respuesta);
        Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | respuesta: " + JSON.stringify(respuesta));

    }

    parseGetBuscarEntitiesOk(response: any) {
        Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | response: " + JSON.stringify(response));

        var respuesta: ResponseEntity = response;
        return this.obtenerDatosPorEntity(respuesta);
        // Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | respuesta: " + JSON.stringify(respuesta));

    }

    parseGetBuscarEntityError(error: any) {
        Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityError | error: " + JSON.stringify(error));
        this.traducirError("RESULTADOSENTITY.Errores.sinResultados");
        this.traducirError("RESULTADOSENTITY.Errores.verifiqueYReintente");
        this.loading = false;
    }


    parseServerUrlOK(response: any) {
        Utilities.log("[resultados-entity.component.ts] - parseServerUrlOK | response: " + JSON.stringify(response));
        this.serverURL = response.serverUrl;

        Utilities.log("[resultados-entity.component.ts] - parseServerUrlOK | serverUrl: " + this.serverURL);
    }

    parseServerUrlError(error: any) {
        Utilities.log("[resultados-entity.component.ts] - parseServerUrlError | error: " + JSON.stringify(error));
        this.traducirError("RESULTADOSENTITY.Errores.sinResultados");
        this.traducirError("RESULTADOSENTITY.Errores.verifiqueYReintente");

    }

    obtenerDatosEntity(respuesta: ResponseEntity) {
        var handle: string = "No data";
        var name: string = "No data";
        var country: string = "No data";
        var roles: string = "No data";
        var address: string = "No data";
        var city: string = "No data";
        var postalCode: string = "No data";
        var email: string = "No data";
        var telephone: string = "No data";
        var operator: string = "No data";
        var networks: any[] = [];
        var autnums: any[] = [];
        var lastChangedDate: string = "No data";
        var registrationDate: string = "No data";
        if (respuesta.events.length > 0) {

            for (let i: number = 0; i < respuesta.events.length; i++) {

                if( respuesta.events[i].eventAction.includes("registration")){

                    registrationDate = respuesta.events[i].eventDate;
                }

                if( respuesta.events[i].eventAction.includes("last changed")){

                    lastChangedDate = respuesta.events[i].eventDate;
                }

            }

        }


        handle = respuesta.handle;
        if (respuesta.roles.length > 0) {
            roles = "[";
            for (let i: number = 0; i < respuesta.roles.length; i++) {
                roles += respuesta.roles[i].toUpperCase();
                if (i < respuesta.roles.length - 1) {
                    roles += ", ";
                }
            }
            roles += "]";
        }
        if (typeof respuesta.autnums !== "undefined" && respuesta.autnums.length > 0) {

            for (let autnum of respuesta.autnums) {
                if (!equals(autnum, {})) {
                    var link: string = "No data";
                    link = autnum.links[0].href;
                    autnums.push(link);
                }
            }

        }

        if (typeof respuesta.networks !== "undefined" && respuesta.networks.length > 0) {

            for (let network of respuesta.networks) {
                if (!equals(network, {})) {
                    var link: string = "No data";
                    link = network.links[0].href;
                    networks.push(link);
                }
            }
        }


        for (let v of respuesta.vcardArray[1]) {
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
    }

    obtenerEntities(respuesta: ResponseEntity) {
        //Datos de las tablas CONTACTS
        if (respuesta.entities.length <= 0) {
        } else {
            for (let e of respuesta.entities) {
                var roles: string = "No data";
                var name: string = "No data";
                // var address : string = "No data";
                // var city : string = "No data";
                // var country : string = "No data";
                // var postalCode : string = "No data";
                // var email : string = "No data";
                // var telephone : string = "No data";
                // var registration : string = "No data";
                // var lastChanged : string = "No data";
                var link: string = "No data"

                if (e.roles.length > 0) {
                    roles = "[";
                    for (let i: number = 0; i < e.roles.length; i++) {
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
                    for (let v of e.vcardArray[1]) {
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
            Utilities.log(JSON.stringify(this.datosEntities[0]));
            this.completarDatosEntities(this.datosEntities);

        }

    }

    private completarDatosEntities(datos: any) {
        for (let i: number = 0; i < datos.length; i++) {

            let handle = datos[i].Handle;

            this.dataService.getBuscarEntity(handle)
                .subscribe(
                    res => {

                        var result: any[] = this.parseGetBuscarEntitiesOk(res);

                        var e: any[] = this.datosEntities[i];
                        //e["Address"]= result[0].Address;
                        e["Name"] = result[0].Name;
                        e["Telephone"] = result[0].Telephone;
                        e["Email"] = result[0].Email;
                        e["Info"]= this.rederictUrl + "entity/" + handle;

                        this.datosEntities[i] = e;


                    },
                    error => {

                        //this.parseGetBuscarEntityError(error)
                        this.mostarDatosExta=false;
                    },
                    () => Utilities.log("[resultados-autnum.component.ts] - getBuscarIP: Completed")
                );


        }
        this.loading = false;

    }

    sanitize(url:string){
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    obtenerDatosPorEntity(respuesta: ResponseEntity) {
        var handle: string = "No data";
        var name: string = "No data";
        var country: string = "No data";
        var roles: string = "No data";
        var address: string = "No data";
        var city: string = "No data";
        var email: string = "No data";
        var postalCode: string = "No data";
        var telephone: string = "No data";
        var lastChangedDate: string = "No data";
        var registrationDate: string = "No data";
        if (respuesta.events.length > 0) {

            if (respuesta.events.length == 1) {

                lastChangedDate = respuesta.events[0].eventDate;
            } else {

                registrationDate = respuesta.events[0].eventDate;
                lastChangedDate = respuesta.events[1].eventDate;
            }


        }

        handle = respuesta.handle;
        if (respuesta.roles.length > 0) {
            roles = "[";
            for (let i: number = 0; i < respuesta.roles.length; i++) {
                roles += respuesta.roles[i].toUpperCase();
                if (i < respuesta.roles.length - 1) {
                    roles += ", ";
                }
            }
            roles += "]";
        }


        for (let v of respuesta.vcardArray[1]) {
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

        var result: any[] = [];
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

    }
}