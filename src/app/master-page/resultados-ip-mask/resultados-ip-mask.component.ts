import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { Utilities } from "../../shared/utilities";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { ResponseIP } from "../../shared/responseIP";
import { ResponseEntity } from '../../shared/responseEntity';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'resultados-ip-mask',
  templateUrl: './resultados-ip-mask.component.html',
  styleUrls: ['./resultados-ip-mask.component.css']
})
export class ResultadosIPMaskComponent implements OnInit {

  mensajes: Mensaje = new Mensaje();
  loading: boolean = true;
  IP: string;
  MASK: string;
  datosIP: string[] = [];
  datosEntities: any[] = [];
  datosNotices: any[] = [];
  private mostarDatosExta: boolean = true;
  
  constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService, private sanitizer: DomSanitizer) {
    this.cargarLenguaje();
  }

  ngOnInit(): void {
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
    } else {
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

  buscarDatosIP() {
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
    //if (error.json().errorCode == 429) {
    if (error.errorCode == 429) {
      this.traducirError("GENERAL.Errores.ArrayLimit");
    } else {
      this.traducirError("RESULTADOSIP.Errores.sinResultados");
      this.traducirError("RESULTADOSIP.Errores.verifiqueYReintente");
    }
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

    var legalRep: string = "No data";
    var noticeTitle : string = "No data";
    var noticeDesc : string = "No data"; 
    var noticeLink : string = "";
    var nbri : number = 0;
    var blnTermine : boolean = false;

    if ((typeof respuesta.events != "undefined") && (respuesta.events != null)) {   
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
    this.datosIP.push(registrationDate, lastChangedDate,);

    //AAE Obtengo el lacnic_legalRepresnetative
    if (typeof respuesta.lacnic_legalRepresentative != "undefined" && respuesta.lacnic_legalRepresentative != ""){
      legalRep = respuesta.lacnic_legalRepresentative;
    }
    this.datosIP.push(legalRep);

    //AAE Obetngo notices
    if (typeof respuesta.notices != "undefined" && respuesta.notices.length > 0) {
      nbri = 0;
      blnTermine = false;
      while (nbri < respuesta.notices.length && !blnTermine) {
        noticeTitle = "No Data";
        noticeDesc = "No Data";
        noticeLink = "#";
        //if ((respuesta.notices[nbri].title == "Terms and Conditions") || (respuesta.notices[nbri].title == "Terms of Service")|| (respuesta.notices[nbri].title == "Terms of Use")) {
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
    }
  }

  

  obtenerEntities(respuesta: ResponseIP) {
    //Datos de las tablas CONTACTS
    if (respuesta.entities.length > 0) {
      for (let e of respuesta.entities) {
        var roles: string = "No data";
        var name: string = "No data";

        var address: string = "No data";
        var city: string = "No data";
        var country: string = "No data";
        var postalCode: string = "No data";
        var email: string = "No data";
        var telephone: string = "No data";
        var registration : string = "No data";
        var lastChanged : string = "No data";
        var link: string = "No data"
        var telType: string = "";
        var version: string = "No data";
        var muestroAddress: string = "0";

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
        if (e.links!=null && e.links.length > 0) {
          link = e.links[0].href;
        }	
        else if(respuesta.links!= null) {
          link = respuesta.links[0].href;
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
            if (v[0] == "adr") {
              address = v[3][2] + " " + v[3][1];
              city = v[3][3];
              country = v[3][6];
              postalCode = v[3][5];
            }
            //AAE Obtengo versi�n
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
        //Obtengo fechas 
        if (typeof e.events != "undefined") {
          if (e.events.length > 0) {
            for (let i: number = 0; i < e.events.length; i++) {
              if (e.events[i].eventAction.includes("registration")) {
                registration = e.events[i].eventDate;
              }
              if (e.events[i].eventAction.includes("last changed")) {
                lastChanged = e.events[i].eventDate;
              }
            }
          }
        }

        this.datosEntities.push({
          "Roles": roles,
          "Handle": e.handle,
          "Name": name,
          "Link": link,
          "Address": address,
          "City": city,
          "PostalCode": postalCode,
          "Country": country,
          "Email": email,
          "Telephone": telephone,
          "TelType": telType,
          "Version" : version,
          "RegistrationDate" : registration,
          "LastChangedDate" : lastChanged,
          "MuestroAddress" : muestroAddress
        });
      }
      this.completarDatosEntities(this.datosEntities);
    }
  }

  buscarDatosExtraEntity(entity: string) {
    this.dataService.getBuscarEntity(entity)
      .subscribe(
        res => {
          this.parseGetBuscarEntityOk(res);
        },
        error => this.parseGetBuscarEntityError(error),
        () => Utilities.log("[resultados-autnum.component.ts] - getBuscarIP: Completed")
      );
    Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum: Finish");
  }

  parseGetBuscarEntityOk(response: any) {
    Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | response: " + JSON.stringify(response));

    var respuesta: ResponseEntity = response;
    return this.obtenerDatosEntity(respuesta);
    // Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityOk | respuesta: " + JSON.stringify(respuesta));

  }

  parseGetBuscarEntityError(error: any) {
    Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityError | error: " + JSON.stringify(error));
    this.traducirError("RESULTADOSENTITY.Errores.sinResultados");
    this.traducirError("RESULTADOSENTITY.Errores.verifiqueYReintente");
    this.loading = false;
  }

  obtenerDatosEntity(respuesta: ResponseEntity) {
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
            var result: any[] = this.parseGetBuscarEntityOk(res);
            var e: any[] = this.datosEntities[i];
            //e["Address"]= result[0].Address;
            e["Name"] = result[0].Name;
            e["Telephone"] = result[0].Telephone;
            e["Email"] = result[0].Email;
            e["Info"] = "http://rdap-web.lacnic.net/entity/" + handle;
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

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
