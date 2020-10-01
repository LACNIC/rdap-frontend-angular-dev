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

    for (let i: number = 0; i < respuesta.events.length; i++) {
      if (respuesta.events[i].eventAction.includes("registration")) {
        registrationDate = respuesta.events[i].eventDate;        }

      if (respuesta.events[i].eventAction.includes("last changed")) {
        lastChangedDate = respuesta.events[i].eventDate;
      }
    }
    this.datosIP.push(registrationDate, lastChangedDate,);
  }

  obtenerEntities(respuesta: ResponseIP) {
    //Datos de las tablas CONTACTS
    if (respuesta.entities.length <= 0) {
    } else {
      for (let e of respuesta.entities) {
        var roles: string = "No data";
        var name: string = "No data";
        //var address: string = "No data";
        //var city: string = "No data";
        //var country: string = "No data";
        //var postalCode: string = "No data";
        var email: string = "No data";
        var telephone: string = "No data";
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
            if (v[0] == "email") {
                email = v[3];
            }
            if (v[0] == "tel") {
                telephone = v[3];
            }
          }
        }

        this.datosEntities.push({
          "Roles": roles,
          "Handle": e.handle,
          "Name": name,
          "Link": link,
          //"Address": address,
          //"City": city,
          //"PostalCode": postalCode,
          "Email": email,
          "Telephone": telephone,
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

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
