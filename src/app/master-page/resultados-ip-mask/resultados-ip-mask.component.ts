/**
 * Created by Bruno on 13/06/2017.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../shared/services/data.service';
import {TranslateService} from "ng2-translate";
import {Utilities} from "../../shared/utilities";
import {Mensaje} from "../../shared/mensaje";
import {Error} from "../../shared/error";
import {ResponseIP} from "../../shared/responseIP";

@Component({
    templateUrl: 'resultados-ip-mask.component.html',
    styleUrls: ['resultados-ip-mask.css']
})

export class ResultadosIPMaskComponent implements OnInit {

    mensajes: Mensaje = new Mensaje();
    loading: boolean = true;
    IP: string;
    MASK: string;
    datosIP: string[] = [];
    datosEntities: any[] = [];

    constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService) {
        this.cargarLenguaje();
    }

    ngOnInit() {
        Utilities.log("[resultados-ip-mask.component.ts] - ngOnInit: Start");

        this.IP = this.route.snapshot.params['ip'];
        this.MASK = this.route.snapshot.params['mask'];
        if (this.IP != undefined && this.IP != null && this.IP != "") {
            if (this.MASK != undefined && this.MASK != null && this.MASK != "") {

                this.buscarDatosIPConMask();

            }


            this.buscarDatosIP

        }





        Utilities.log("[resultados-ip-mask.component.ts] - ngOnInit: Finish");
    }

    cargarLenguaje() {
        Utilities.log("[resultados-ip-mask.component.ts] - cargarLenguaje: Start");

        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if (localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else {
            this.translate.use(this.translate.getDefaultLang());
        }

        Utilities.log("[resultados-ip-mask.component.ts] - cargarLenguaje: Finish");
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
                () => Utilities.log("[resultados-ip-mask.component.ts] - translate.get: Completed")
            );
    }

    mostrarError(errorDescription: string) {
        var error: Error = new Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    }

    translateError(error: any) {
        Utilities.log("[resultados-ip-mask.component.ts] - translateError | error: " + JSON.stringify(error));
    }

    buscarDatosIP(){
        Utilities.log("[resultados-ip-mask.component.ts] - buscarDatosIPMask: Start");
        Utilities.log("[resultados-ip-mask.component.ts] - buscarDatosIPMask | this.AUTNUM: " + this.IP);

        this.dataService.getBuscarIP(this.IP)
            .subscribe(
                res => this.parseGetBuscarIPOk(res),
                error => this.parseGetBuscarIPError(error),
                () => Utilities.log("[resultados-ip-mask.component.ts] - getBuscarIP: Completed")
            );

        Utilities.log("[resultados-ip-mask.component.ts] - buscarDatosIPMask: Finish");
    }



    buscarDatosIPConMask() {
        Utilities.log("[resultados-ip-mask.component.ts] - buscarDatosIPMask: Start");
        Utilities.log("[resultados-ip-mask.component.ts] - buscarDatosIPMask | this.AUTNUM: " + this.IP);

        this.dataService.getBuscarIP(this.IP.concat("/").concat(this.MASK))
            .subscribe(
                res => this.parseGetBuscarIPOk(res),
                error => this.parseGetBuscarIPError(error),
                () => Utilities.log("[resultados-ip-mask-mask.component.ts] - getBuscarIP: Completed")
            );

        Utilities.log("[resultados-ip-mask.component.ts] - buscarDatosIPMask: Finish");
    }


    parseGetBuscarIPOk(response: any) {
        Utilities.log("[resultados-ip-mask.component.ts] - parseGetBuscarAutumOk | response: " + JSON.stringify(response));

        var respuesta: ResponseIP = response;
        this.obtenerDatosIP(respuesta);
        this.obtenerEntities(respuesta);
        Utilities.log("[resultados-ip-mask.component.ts] - parseGetBuscarAutumOk | respuesta: " + JSON.stringify(respuesta));

    }

    parseGetBuscarIPError(error: any) {
        Utilities.log("[resultados-ip-mask.component.ts] - parseGetBuscarAutnumError| error: " + JSON.stringify(error));
        this.traducirError("RESULTADOSIP.Errores.sinResultados");
        this.traducirError("RESULTADOSIP.Errores.verifiqueYReintente");
        this.loading = false;
    }

    obtenerDatosIP(respuesta: ResponseIP) {
        //Datos de la tabla IP
        this.datosIP.push(respuesta.handle);
        // this.datosIP.push(respuesta.name);
        this.datosIP.push(respuesta.type);
        //this.datosIP.push("No data");
        this.datosIP.push(respuesta.startAddress + " - " + respuesta.endAddress);
        this.datosIP.push(respuesta.ipVersion);
        // this.datosIP.push(respuesta.country);
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
        this.datosIP.push(registrationDate, lastChangedDate,);
    }

    obtenerEntities(respuesta: ResponseIP) {
        //Datos de las tablas CONTACTS
        if (respuesta.entities.length > 0) {
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
    }
}