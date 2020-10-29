import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../shared/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import {Utilities} from "../../shared/utilities";
import {Mensaje} from "../../shared/mensaje";
import {Exito} from "../../shared/exito";
import {Error} from "../../shared/error";
import {ResponseIP} from "../../shared/responseIP";
import {ResponseEntity} from '../../shared/responseEntity';
//import { equals } from '@ngx-translate/core/lib/util';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'resultados-ip',
  templateUrl: './resultados-ip.component.html',
  styleUrls: ['./resultados-ip.component.css']
})
export class ResultadosIPComponent implements OnInit {

  mensajes: Mensaje = new Mensaje();
  loading: boolean = true;
  IP: string;
  datosIP: string[] = [];
  datosEntities: any[] = [];
  datosEntity: string[] = [];
  datosNotices: any[] = [];
  datosRemarks: any[] = [];
  datosExtra: any[] = [];
  datosLinks: any[] = [];
  datosEvents: any[] = [];
  
  private mostarDatosExta: boolean = true;

  constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService, private sanitizer: DomSanitizer) {
    this.cargarLenguaje();
  }

  ngOnInit(): void {
    Utilities.log("[resultados-autnum.component.ts] - ngOnInit: Start");

    this.IP = this.route.snapshot.params['ip'];
    if (this.IP != undefined && this.IP != null && this.IP != "") {
      this.buscarDatosIP();
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

  buscarDatosIP() {
    Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum: Start");
    Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum | this.AUTNUM: " + this.IP);

    this.dataService.getBuscarIP(this.IP)
      .subscribe(
        res => this.parseGetBuscarIPOk(res),
        error => this.parseGetBuscarIPError(error),
        () => Utilities.log("[resultados-autnum.component.ts] - getBuscarIP: Completed")
      );

    Utilities.log("[resultados-autnum.component.ts] - buscarDatosAutnum: Finish");
  }

  parseGetBuscarIPOk(response: any) {
    Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutumOk | response: " + JSON.stringify(response));

    var respuesta: ResponseIP = response;
    this.obtenerDatosIP(respuesta);
    this.obtenerEntities(respuesta);
    this.obtenerDatosExtra(respuesta);
    this.obtenerDatosDesconocidos(respuesta);
    Utilities.log("[resultados-autnum.component.ts] - parseGetBuscarAutumOk | respuesta: " + JSON.stringify(respuesta));
    //this.loading = false;

  }

  parseGetBuscarIPError(error: any) {
    Utilities.log("[resultados-entity.component.ts] - parseGetBuscarEntityError | error: " + JSON.stringify(error));
    //if (error.json().errorCode == 429) {
    if (error.errorCode == 429) {
      this.traducirError("GENERAL.Errores.ArrayLimit");
    } else  {
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
    var parentHandle : string = "No data";
    var status : string = "No data";
    var remarkTitle : String = "Description";
    var remarkDesc : String = "No data";

    if (typeof respuesta.events != "undefined" && respuesta.events != null) {    
      for (let i: number = 0; i < respuesta.events.length; i++) {
        if (respuesta.events[i].eventAction.includes("registration")) {
          registrationDate = respuesta.events[i].eventDate;        }

        if (respuesta.events[i].eventAction.includes("last changed")) {
          lastChangedDate = respuesta.events[i].eventDate;
        }
      }
    }
    this.datosIP.push(registrationDate, lastChangedDate,);

    //AAE Obtengo el lacnic_legalRepresnetative
    if (typeof respuesta.lacnic_legalRepresentative != "undefined" && respuesta.lacnic_legalRepresentative != ""){
      legalRep = respuesta.lacnic_legalRepresentative;
    }
    this.datosIP.push(legalRep);

    //AAE Obtengo el parentHnadle
    if (typeof respuesta.parentHandle != "undefined" && respuesta.parentHandle != ""){
      parentHandle = respuesta.parentHandle;
    }
    this.datosIP.push(parentHandle);

     //AAE Obtengo el status
     if (typeof respuesta.status != "undefined" && respuesta.status != ""){
      status = respuesta.status;
    }
    this.datosIP.push(status);

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

    //AAE Obetngo remarks
    if (typeof respuesta.remarks != "undefined" && respuesta.remarks.length > 0) {
      nbri = 0;
      blnTermine = false;
      while (nbri < respuesta.remarks.length && !blnTermine) {
        remarkTitle = "Description";
        remarkDesc = "No Data";
        
        if (typeof respuesta.remarks[nbri].title != "undefined" && respuesta.remarks[nbri].title != ""){
          remarkTitle = respuesta.remarks[nbri].title;
        }
        if (respuesta.remarks[nbri].description.length > 0 && respuesta.remarks[nbri].description[0] != "") {
          remarkDesc = respuesta.remarks[nbri].description[0];
        }
         
        this.datosRemarks.push({
          "Title": remarkTitle,
          "Desc": remarkDesc
        });
        nbri++;
      }      
    }
    //console.log(this.datosNotices);
    //this.datosIP.push(noticeTitle);
    //this.datosIP.push(noticeDesc);
    //this.datosIP.push(noticeLink);
  }

  obtenerEntities(respuesta: ResponseIP) {
    //Datos de las tablas CONTACTS
    if (respuesta.entities.length <= 0) {
    } else {
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
      //Utilities.log(JSON.stringify(this.datosEntities[0]));
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
    //if (error.json().errorCode == 429) {
    if (error.errorCode == 429) {
      this.traducirError("GENERAL.Errores.ArrayLimit");
    } else {
      this.traducirError("RESULTADOSENTITY.Errores.sinResultados");
      this.traducirError("RESULTADOSENTITY.Errores.verifiqueYReintente");
    }
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
            if (e["Name"] == "No data") {
              e["Name"] = result[0].Name;
            }
            if (e["Telephone"] == "No data") {
              e["Telephone"] = result[0].Telephone;
            }
            if (e["Email"] == "No data") {
              e["Email"] = result[0].Email;
            }
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

  obtenerDatosExtra(respuesta: ResponseIP) {
    var extraTitle: string = "No data";
    var extraDesc: string = "No data";
    var eventTitle: string = "No data";
    var eventDesc: string = "No data";
    var linkTitle: string  = "No data";
    var linkDesc: string = "No data";
    var linkLink: string = "#";

    extraTitle = this.translate.instant("RESULTADOSIP.TablaExtra.Filas.Name.Titulo");
    if (typeof respuesta.name != "undefined" && respuesta.name != ""){
      extraDesc = respuesta.name;      
    }
    this.datosExtra.push({
      "Title": extraTitle,
      "Desc": extraDesc
    });

    extraTitle = this.translate.instant("RESULTADOSIP.TablaExtra.Filas.Country.Titulo");
    extraDesc = "No data";
    if (typeof respuesta.country != "undefined" && respuesta.country != ""){
      extraDesc = respuesta.country;     
    }
    this.datosExtra.push({
      "Title": extraTitle,
      "Desc": extraDesc
    });

    extraTitle = this.translate.instant("RESULTADOSIP.TablaExtra.Filas.Port43.Titulo");
    extraDesc = "No data";
    if (typeof respuesta.port43 != "undefined" && respuesta.port43 != ""){
      extraDesc = respuesta.port43;     
    }
    this.datosExtra.push({
      "Title": extraTitle,
      "Desc": extraDesc
    });

    extraTitle = this.translate.instant("RESULTADOSIP.TablaExtra.Filas.ObjectClassName.Titulo");
    extraDesc = "No data";
    if (typeof respuesta.objectClassName != "undefined" && respuesta.objectClassName != ""){
      extraDesc = respuesta.objectClassName;     
    }
    this.datosExtra.push({
      "Title": extraTitle,
      "Desc": extraDesc
    });

    extraTitle = this.translate.instant("RESULTADOSIP.TablaExtra.Filas.RdapConformance.Titulo");
    extraDesc = "No data";
    if (typeof respuesta.rdapConformance != "undefined" && respuesta.rdapConformance.length > 0){
      for (let i: number = 0; i < respuesta.rdapConformance.length; i++) {
        if (i == 0) {
          extraDesc = respuesta.rdapConformance[i];
        } else {
          extraDesc = extraDesc + ', ' + respuesta.rdapConformance[i];
        }
      }
    }
    this.datosExtra.push({
      "Title": extraTitle,
      "Desc": extraDesc
    });

    extraTitle = this.translate.instant("RESULTADOSIP.TablaExtra.Filas.Lang.Titulo");
    extraDesc = "No data";
    if (typeof respuesta.lang != "undefined" && respuesta.lang != "") {
      extraDesc = respuesta.lang;     
    }
    this.datosExtra.push({
      "Title": extraTitle,
      "Desc": extraDesc
    });

    extraTitle = this.translate.instant("RESULTADOSIP.TablaExtra.Filas.Cidr0_cidrs.Titulo");
    extraDesc = "No data";
    if (typeof respuesta.cidr0_cidrs != "undefined" && respuesta.cidr0_cidrs.length > 0){
      for (let i: number = 0; i < respuesta.cidr0_cidrs.length; i++) {
        if (i == 0) {
          extraDesc = respuesta.cidr0_cidrs[i].v4prefix + " lenght: " + respuesta.cidr0_cidrs[i].length.toString();
        } else {
          extraDesc = extraDesc + ', ' + respuesta.cidr0_cidrs[i].v4prefix + " lenght: " + respuesta.cidr0_cidrs[i].length;
        }
      }
    }
    this.datosExtra.push({
      "Title": extraTitle,
      "Desc": extraDesc
    });

    extraTitle = this.translate.instant("RESULTADOSIP.TablaExtra.Filas.Originautnums.Titulo");
    extraDesc = "No data";
    if (typeof respuesta.arin_originas0_originautnums != "undefined" && respuesta.arin_originas0_originautnums.length > 0){
      for (let i: number = 0; i < respuesta.arin_originas0_originautnums.length; i++) {
        if (i == 0) {
          extraDesc = respuesta.arin_originas0_originautnums[i].toString();
        } else {
          extraDesc = extraDesc + ', ' + respuesta.arin_originas0_originautnums[i].toString();
        }
      }
    }
    this.datosExtra.push({
      "Title": extraTitle,
      "Desc": extraDesc
    });

    extraTitle = this.translate.instant("RESULTADOSIP.TablaExtra.Filas.Nicbr_autnum.Titulo");
    extraDesc = "No data";
    if (typeof respuesta.nicbr_autnum != "undefined" && respuesta.nicbr_autnum != null) {
      extraDesc = respuesta.nicbr_autnum.toString();     
    }
    this.datosExtra.push({
      "Title": extraTitle,
      "Desc": extraDesc
    });

    //AAE Obetngo events
    if (typeof respuesta.events != "undefined" && respuesta.events.length > 0) {
      for (let i: number = 0; i < respuesta.events.length; i++) {
        eventTitle = "Description";
        eventDesc = "No Data";        
        if (typeof respuesta.events[i].eventAction != "undefined" && respuesta.events[i].eventAction != ""){
          eventTitle = respuesta.events[i].eventAction;
        }
        if (typeof respuesta.events[i].eventDate != "undefined" && respuesta.events[i].eventDate != ""){
          eventDesc = respuesta.events[i].eventDate;
        }         
        this.datosEvents.push({
          "Title": eventTitle,
          "Desc": eventDesc
        });       
      }      
    }

    //AAE Obetngo links
    if (typeof respuesta.links != "undefined" && respuesta.links.length > 0) {
      for (let i: number = 0; i < respuesta.links.length; i++) {
        linkTitle = "Rel";
        linkDesc = "No Data";        
        linkLink = "#"
        if (typeof respuesta.links[i].rel != "undefined" && respuesta.links[i].rel != ""){
          linkTitle = respuesta.links[i].rel;
        }
        if (typeof respuesta.links[i].href != "undefined" && respuesta.links[i].href != ""){
          linkDesc = respuesta.links[i].href;
          linkLink = respuesta.links[i].href;
        }         
        this.datosLinks.push({
          "Title": linkTitle,
          "Desc": linkDesc,
          "Link": linkLink
        });       
      }      
    }    

  }

  obtenerDatosDesconocidos(respuesta: Object) {
    var extraTitle: string = "No data";
    var extraDesc: string = "No data";
    var columns : string[] = ["handle","startAddress", "endAddress","ipVersion","name","type","country",
    "entities","links","events","rdapConformance","notices","port43","objectClassName","lacnic_legalRepresentative",
    "remarks", "parentHandle", "status", "lang", "cidr0_cidrs", "arin_originas0_originautnums", "nicbr_autnum"];
    var type : string;
    var keys: string[] = Object.keys(respuesta);
    var values: string[] = Object.values(respuesta);
    for (let i = 0; i < keys.length; i++) { 
      if (!(columns.includes(keys[i])) ) {
        extraTitle = keys[i];
        extraDesc = "No data";      
        type = typeof values[i];
        
        if (type == "string" && values[i] != "") {
          extraDesc = values[i];
        }
        if (type == "number") {
          extraDesc = values[i].toString();
        }
        if (type == "object") {         
          if (Array.isArray(values[i])) {
            
            if (values[i].length > 0) {
              for  (let j = 0; j < values[i].length; j++) {
                if (j ==0 ){
                  extraDesc = JSON.stringify(values[i][j])//values[i][j].toString();
                } else {
                  extraDesc = extraDesc + ', ' + JSON.stringify(values[i][j])
                }   
              } 
            }
          } else {            
            extraDesc = JSON.stringify(values[i]);
          }
        }
        
        this.datosExtra.push({
          "Title": extraTitle,
          "Desc": extraDesc
        });
      } 
    }


  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
