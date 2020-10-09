import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../shared/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import {Utilities} from "../../shared/utilities";
import {Mensaje} from "../../shared/mensaje";
import {Exito} from "../../shared/exito";
import {Error} from "../../shared/error";
import {ResponseAutnum} from '../../shared/responseAutnum';
import {Event} from '../../shared/event';
import {ResponseEntity} from '../../shared/responseEntity';
import {Constantes} from '../../shared/constantes';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'resultados-autnum',
  templateUrl: './resultados-autnum.component.html',
  styleUrls: ['./resultados-autnum.component.css']
})
export class ResultadosAutnumComponent implements OnInit {

  mensajes: Mensaje = new Mensaje();
  loading: boolean = true;
  AUTNUM: string;
  datosEvents: string[] = [];
  datosEntities: any[] = [];
  datosAutnum: string[] = [];
  datosNotices: any[] = [];
  rederictUrl: string = Constantes.rederictUrl;
  private mostarDatosExta: boolean = true;

  constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService, private sanitizer: DomSanitizer) {
    this.cargarLenguaje();
  }

  ngOnInit(): void {
    Utilities.log("[resultados-autnum.component.ts] - ngOnInit: Start");

    this.AUTNUM = this.route.snapshot.params['autnum'];
    if (this.AUTNUM != undefined && this.AUTNUM != null && this.AUTNUM != "") {

      if (this.AUTNUM.toLocaleUpperCase().includes("AS")) {

        this.AUTNUM = this.AUTNUM.substring(2);

      }
      this.buscarDatosAutnum();
    }

    Utilities.log("[resultados-autnum.component.ts] - ngOnInit: Finish");
  }

  cargarLenguaje() {
    Utilities.log("[resultados-autnum.component.ts] - cargarLenguaje: Start");

    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    if (localStorage.getItem('lenguaje') != null) {
        this.translate.use(localStorage.getItem('lenguaje'));
    }
    else {
        this.translate.use(this.translate.getDefaultLang());
    }

    Utilities.log("[resultados-autnum.component.ts] - cargarLenguaje: Finish");
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
        () => Utilities.log("[resultados-autnum.component.ts] - translate.get: Completed")
      );
  }

  mostrarError(errorDescription: string) {
    var error: Error = new Error();
    error.Description = errorDescription;
    this.mensajes.Errores.push(error);
  }

  translateError(error: any) {
    Utilities.log("[resultados-autnum.component.ts] - translateError | error: " + JSON.stringify(error));
  }

  buscarDatosAutnum() {
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


  parseGetBuscarAutumOk(response: any) {
    Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutumOk | response: " + JSON.stringify(response));

    var respuesta: ResponseAutnum = response;
    this.obtenerDatosAutnum(respuesta);
    this.obtenerEntities(respuesta);
    Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutumOk | respuesta: " + JSON.stringify(respuesta));

  }

  parseGetBuscarEntitiesOk(response: any) {
    Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | response: " + JSON.stringify(response));

    var respuesta: ResponseEntity = response;
    return this.obtenerDatosPorEntity(respuesta);
    // Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | respuesta: " + JSON.stringify(respuesta));

  }

  parseGetBuscarAutnumError(error: any) {
    Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutnumError| error: " + JSON.stringify(error));
    //if (error.json().errorCode == 429) {
    if (error.errorCode == 429) {
      this.traducirError("GENERAL.Errores.ArrayLimit");
    } else {
      this.traducirError("RESULTADOSAUTNUM.Errores.sinResultados");
      this.traducirError("RESULTADOSAUTNUM.Errores.verifiqueYReintente");
    }
    this.loading = false;
  }

  obtenerDatosAutnum(respuesta: ResponseAutnum) {
    //Datos de la tabla AUTNUM
    this.datosAutnum.push(respuesta.handle);
    // this.datosAutnum.push(respuesta.name);

    var type: string = "No data";
    // this.datosAutnum.push("No data");
    // this.datosAutnum.push(respuesta.startAddress + " - " + respuesta.endAddress);
    // this.datosAutnum.push(respuesta.ipVersion);
    // this.datosAutnum.push(respuesta.country);
    var lastChangedDate: string = "No data";
    var registrationDate: string = "No data";
    
    var legalRep: string = "No data";
    var noticeTitle : string = "No data";
    var noticeDesc : string = "No data"; 
    var noticeLink : string = "";
    var nbri : number = 0;
    var blnTermine : boolean = false;

    if (typeof respuesta.events != "undefined") {
      if (respuesta.events.length > 0) {
        for (let i: number = 0; i < respuesta.events.length; i++) {
          if (respuesta.events[i].eventAction.includes("registration")) {
            registrationDate = respuesta.events[i].eventDate;
          }
          if (respuesta.events[i].eventAction.includes("last changed")) {
            lastChangedDate = respuesta.events[i].eventDate;
          }
        }
      }
    }

    if (typeof respuesta.type != "undefined" && respuesta.type != "") {
      type = respuesta.type;
    }
    this.datosAutnum.push(type);
    this.datosAutnum.push(registrationDate, lastChangedDate);

    //AAE Obtengo el lacnic_legalRepresnetative
    if (typeof respuesta.lacnic_legalRepresentative != "undefined" && respuesta.lacnic_legalRepresentative != ""){
      legalRep = respuesta.lacnic_legalRepresentative;
    }
    this.datosAutnum.push(legalRep);

    //AAE Obetngo notices
    if (typeof respuesta.notices != "undefined" && respuesta.notices.length > 0) {
      nbri = 0;
      blnTermine = false;
      while (nbri < respuesta.notices.length && !blnTermine) {
        noticeTitle = "No Data";
        noticeDesc = "No Data";
        noticeLink = "#";
        //if (respuesta.notices[nbri].title == "Terms and Conditions") {
        noticeTitle = respuesta.notices[nbri].title;
        if (respuesta.notices[nbri].description.length > 0 && respuesta.notices[nbri].description[0] != "") {
          noticeDesc = respuesta.notices[nbri].description[0];
        }
        if ((typeof respuesta.notices[nbri].links != "undefined") && respuesta.notices[nbri].links.length > 0) {
          if (respuesta.notices[nbri].links[0].href != "") {
            noticeLink = respuesta.notices[nbri].links[0].href;
          }
        }
        //blnTermine = true;          
        //}
        this.datosNotices.push({
          "Title": noticeTitle,
          "Desc": noticeDesc,
          "Link": noticeLink
        });
        nbri++;
      }
      //this.datosAutnum.push(noticeTitle);
      //this.datosAutnum.push(noticeDesc);
      //this.datosAutnum.push(noticeLink);
    }
  }

  obtenerEntities(respuesta: ResponseAutnum) {
    //Datos de las tablas CONTACTS
    if (respuesta.entities.length > 0) {
      for (let e of respuesta.entities) {
        var roles: string = "No data";
        var name: string = "No data";
        var link: string = "No data"
        var email: string = "No data";
        var telephone: string = "No data";

        var telType: string = "";
        var version: string = "No data";
        var lastChangedDate: string = "No data";
        var registrationDate: string = "No data";
        var muestroAddress: string = "0";
        var country: string = "No data";
        var city: string = "No data";
        var address: string = "No data";
        var postalCode: string = "No data";


        if (e.roles.length > 0) {
          roles = "[";
          for (let i: number = 0; i < e.roles.length; i++) {
            roles += e.roles[i].toUpperCase();
            if (i < e.roles.length - 1) {
              roles += ", ";
            }
            if ((e.roles[i].toUpperCase() == "ADMINISTRATIVE") || (e.roles[i].toUpperCase() == "TECHNICAL" )||( e.roles[i].toUpperCase() == "ABUSE" ) ) {
              muestroAddress = "1";
            }
          }
          roles += "]";
          
        }
        if (typeof e.vcardArray != "undefined") {
          for (let v of e.vcardArray[1]) {
            if (v[0] == "fn") {
              name = v[3];
            }

            
            if (v[0] == "adr") {
                address = v[3][2] + " " + v[3][1];
                city = v[3][3];
                country = v[3][6];
                postalCode = v[3][5];
            }
            //AAE Obtengo versión
            if (v[0] == "version") {
              version = v[3];
            }
            if (v[0] == "email") {
              email = v[3];
            }
            if (v[0] == "tel") {
              telephone = v[3];
              telType = v[1].type;

            }
          }
        }
        if (e.links!=null && e.links.length > 0) {
          link = e.links[0].href;
        }	
        else if(respuesta.links!= null) {
          link = respuesta.links[0].href;
        }
        //Obtengo fechas 
        if (typeof e.events != "undefined") {
          if (e.events.length > 0) {
            for (let i: number = 0; i < e.events.length; i++) {
              if (e.events[i].eventAction.includes("registration")) {
                registrationDate = e.events[i].eventDate;
              }
              if (e.events[i].eventAction.includes("last changed")) {
                lastChangedDate = e.events[i].eventDate;
              }
            }
          }
        }

        this.datosEntities.push({
            "Roles": roles,
            "Handle": e.handle,
            "Name": name,
            "Link": link,
            "Email": email,
            "Telephone": telephone,
            "Version" : version,
            "TelType" : telType,
            "RegistrationDate" : registrationDate,
            "LastChangedDate" : lastChangedDate,
            "MuestroAddress" : muestroAddress,
            "Country": country,
            "City": city,
            "Address": address,
            "PostalCode": postalCode

        });
      }
      this.completarDatosEntities(this.datosEntities);
    }
  }

  sanitize(url: string) {
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
    if (typeof respuesta.events != "undefined") {
      if (respuesta.events.length > 0) {
        for (let i: number = 0; i < respuesta.events.length; i++) {
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

  private completarDatosEntities(datos: any) {
    for (let i: number = 0; i < datos.length; i++) {
      let handle = datos[i].Handle;
      this.dataService.getBuscarEntity(handle)
        .subscribe(
          res => {
            var result: any[] = this.parseGetBuscarEntitiesOk(res);
            var e: any[] = this.datosEntities[i];
            //e["Address"]= result[0].Address;
            if (e["Name"] == "No data") {
              e["Name"] = result[0].Name;
            }
            if (e["Telephone"] == "No data") {
              e["Telephone"] = result[0].Telephone;
            }
            if (e["Email"] == "No data") {
              e["Email"] = result[0].Email;
            }
            e["Info"] = this.rederictUrl + "entity/" + handle;
            this.datosEntities[i] = e;
          },
          error => {
            //this.parseGetBuscarEntityError(error)
            this.mostarDatosExta = false;
          },
          () => Utilities.log("[resultados-autnum.component.ts] - getBuscarIP: Completed")
        );
      }
    this.loading = false;
  }


}
