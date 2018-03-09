/**
 * Created by Bruno on 13/06/2017.
 */
import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { DataService }          from '../../shared/services/data.service';
import { TranslateService }     from "ng2-translate";
import { Utilities }            from "../../shared/utilities";
import { Mensaje }              from "../../shared/mensaje";
import { Exito }                from "../../shared/exito";
import { Error }                from "../../shared/error";
import {ResponseAutnum} from '../../shared/responseAutnum';
import {Event} from '../../shared/event';

@Component({
    templateUrl: 'resultados-autnum.component.html',
    styleUrls:  ['resultados-autnum.css']
})

export class ResultadosAutnumComponent implements OnInit {

    mensajes : Mensaje = new Mensaje();
    loading : boolean = true;
    AUTNUM : string;
    datosEvents : string[] = [];
    datosEntities : any[] = [];
    datosAutnum : string[] = [];

    constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService)  {
        this.cargarLenguaje();
    }

    ngOnInit() {
        Utilities.log("[resultados-autnum.component.ts] - ngOnInit: Start");

        this.AUTNUM = this.route.snapshot.params['autnum'];
        if(this.AUTNUM != undefined && this.AUTNUM != null && this.AUTNUM != ""){
            this.buscarDatosAutnum();
        }

        Utilities.log("[resultados-autnum.component.ts] - ngOnInit: Finish");
    }

    cargarLenguaje(){
        Utilities.log("[resultados-autnum.component.ts] - cargarLenguaje: Start");

        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if(localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else{
            this.translate.use(this.translate.getDefaultLang());
        }

        Utilities.log("[resultados-autnum.component.ts] - cargarLenguaje: Finish");
    }

    limpiarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    traducirError(paraTraducir : string){
        this.translate.get(paraTraducir)
            .subscribe(
                value => this.mostrarError(value),
                error => this.translateError(error),
                () => Utilities.log("[resultados-autnum.component.ts] - translate.get: Completed")
            );
    }

    mostrarError(errorDescription : string){
        var error : Error = new Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    }

    translateError(error:any){
        Utilities.log("[resultados-autnum.component.ts] - translateError | error: " + JSON.stringify(error));
    }

    buscarDatosAutnum(){
        Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum: Start");
        Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum | this.AUTNUM: " + this.AUTNUM);

        this.dataService.getBuscarAutnum(this.AUTNUM)
            .subscribe(
                res => this.parseGetBuscarAutumOk(res),
                error => this.parseGetBuscarAutnumError(error),
                () => Utilities.log("[resultados-autnum.component.ts] - getBuscarIP: Completed")
            );

        Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum: Finish");
    }
    
    parseGetBuscarAutumOk(response:any){
        Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutumOk | response: " + JSON.stringify(response));

        var respuesta : ResponseAutnum = response;
        this.obtenerDatosAutnum(respuesta);
        this.obtenerEntities(respuesta);
        Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutumOk | respuesta: " + JSON.stringify(respuesta));

    }

    parseGetBuscarAutnumError(error:any){
        Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutnumError| error: " + JSON.stringify(error));
        this.traducirError("RESULTADOSAUTNUM.Errores.sinResultados");
        this.traducirError("RESULTADOSAUTNUM.Errores.verifiqueYReintente");
        this.loading = false;
    }

    obtenerDatosAutnum(respuesta : ResponseAutnum){
        //Datos de la tabla AUTNUM
        this.datosAutnum.push(respuesta.handle);
        // this.datosAutnum.push(respuesta.name);
        this.datosAutnum.push(respuesta.type);
        // this.datosAutnum.push("No data");
        // this.datosAutnum.push(respuesta.startAddress + " - " + respuesta.endAddress);
        // this.datosAutnum.push(respuesta.ipVersion);
        // this.datosAutnum.push(respuesta.country);
        var lastChangedDate : string = "No data";
        var registrationDate : string = "No data";
        if(respuesta.events.length > 0){

            registrationDate = respuesta.events[0].eventDate;
                lastChangedDate = respuesta.events[1].eventDate;


        }
        this.datosAutnum.push( registrationDate, lastChangedDate,);
    }

    obtenerEntities(respuesta : ResponseAutnum){
        //Datos de las tablas CONTACTS
        if(respuesta.entities.length > 0){
            for(let e of respuesta.entities){
                var roles : string = "No data";
                var name : string = "No data";
                var link : string = "No data"

                if(e.roles.length > 0){
                    roles = "[";
                    for(let i : number = 0; i < e.roles.length; i++){
                        roles += e.roles[i].toUpperCase();
                        if(i < e.roles.length-1){
                            roles += ", ";
                        }
                    }
                    roles += "]";
                }
                if(typeof e.vcardArray != "undefined") {
                    for (let v of e.vcardArray[1]) {
                        if (v[0] == "fn") {
                            name = v[3];
                        }

                    }
                }
                if(e.links.length>0){
                    link= e.links[0].href;
                }
                this.datosEntities.push({
                    "Roles" : roles,
                    "Handle" : e.handle,
                    "Name" : name,
                    "Link": link
                });
            }
        }
        this.loading = false;
    }
}