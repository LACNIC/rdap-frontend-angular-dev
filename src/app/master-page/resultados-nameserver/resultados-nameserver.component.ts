import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../shared/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import {Utilities} from "../../shared/utilities";
import {Mensaje} from "../../shared/mensaje";
import {ResponseNameserver} from "../../shared/responseNameserver";
import {Error} from "../../shared/error";
import {Constantes} from '../../shared/constantes';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-resultados-nameserver',
  templateUrl: './resultados-nameserver.component.html',
  styleUrls: ['./resultados-nameserver.component.css']
})
export class ResultadosNameserverComponent implements OnInit {

  mensajes: Mensaje = new Mensaje();
  loading: boolean = true;
  nameserver: string;
  datosNameserver: string[] = [];
  datosNotices: any[] = [];
  rederictUrl: string = Constantes.rederictUrl;

  constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService, private sanitizer: DomSanitizer) {
    this.cargarLenguaje();
  }

  ngOnInit(): void {
    Utilities.log("[resultados-nameserver.component.ts] - ngOnInit: Start");

    this.nameserver = this.route.snapshot.params['nameserver'];
    if (this.nameserver != undefined && this.nameserver != null && this.nameserver != "") {

      
      this.buscarDatosNameserver();
    }

    Utilities.log("[resultados-nameserver.component.ts] - ngOnInit: Finish");
  }

  cargarLenguaje() {
    Utilities.log("[resultados-nameserver.component.ts] - cargarLenguaje: Start");

    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    if (localStorage.getItem('lenguaje') != null) {
        this.translate.use(localStorage.getItem('lenguaje'));
    }
    else {
        this.translate.use(this.translate.getDefaultLang());
    }

    Utilities.log("[resultados-nameserver.component.ts] - cargarLenguaje: Finish");
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
        () => Utilities.log("[resultados-nameserver.component.ts] - translate.get: Completed")
      );
  }

  mostrarError(errorDescription: string) {
    var error: Error = new Error();
    error.Description = errorDescription;
    this.mensajes.Errores.push(error);
  }

  translateError(error: any) {
    Utilities.log("[resultados-nameserver.component.ts] - translateError | error: " + JSON.stringify(error));
  }

  buscarDatosNameserver() {
    Utilities.log("[resultados-nameserver.component.ts] - buscarDatosNameserver: Start");
    Utilities.log("[resultados-nameserver.component.ts] - buscarDatosNameserver | this.nameserver: " + this.nameserver);

    this.dataService.getBuscarNameserver(this.nameserver)
      .subscribe(
        res => this.parseGetBuscarNameserverOk(res),
        error => this.parseGetBuscarNameserverError(error),
        () => Utilities.log("[resultados-nameserver.component.ts] - getBuscarNameserver: Completed")
      );

    Utilities.log("[resultados-nameserver.component.ts] - buscarDatosNameserver: Finish");
  }

  parseGetBuscarNameserverError(error: any) {
    Utilities.log("[resultados-nameserver.component.ts] - parseGetBuscarNameserverError| error: " + JSON.stringify(error));
    //if (error.json().errorCode == 429) {
    if (error.errorCode == 429) {
      this.traducirError("GENERAL.Errores.ArrayLimit");
    } else {
      this.traducirError("RESULTADOSNAMESERVER.Errores.sinResultados");
      this.traducirError("RESULTADOSNAMESERVER.Errores.verifiqueYReintente");
    }
    this.loading = false;
  }

  parseGetBuscarNameserverOk(response: any) {
    Utilities.log("[resultados-nameserver.component.ts] - parseGetBuscarNameserverOk | response: " + JSON.stringify(response));

    var respuesta: ResponseNameserver = response;
    this.obtenerDatosNameserver(respuesta);

    this.loading = false;
    Utilities.log("[resultados-nameserver.component.ts] - parseGetBuscarNameserverOk | respuesta: " + JSON.stringify(respuesta));

  }

  obtenerDatosNameserver(respuesta: ResponseNameserver) {
    
    //Inicializo variables
    var ldhName: string = "No data";
    var ipV4: string = "No data";
    var ipV6: string = "No data";
    var linkSource: string = "";
    var noticeTitle : string = "No data";
    var noticeDesc : string = "No data"; 
    var noticeLink : string = "";

    var nbri : number = 0;
    var blnTermine : boolean = false;

    //ldhname
    if (typeof respuesta.ldhName != "undefined" && respuesta.ldhName != "") {
      ldhName = respuesta.ldhName;
    }

    //ipv4
    if (respuesta.ipAddresses.v4.length > 0) {
      for (let i: number = 0; i < respuesta.ipAddresses.v4.length; i++) {
        if (ipV4 == 'No data') {
          ipV4 = respuesta.ipAddresses.v4[i];
        } else {
          ipV4 += ', ' + respuesta.ipAddresses.v4[i];
        }        
      }
    }

    //ipV6
    if (respuesta.ipAddresses.v6.length > 0) {
      for (let i: number = 0; i < respuesta.ipAddresses.v6.length; i++) {
        if (ipV6 == 'No data') {
          ipV6 = respuesta.ipAddresses.v6[i];
        } else {
          ipV6 += ', ' + respuesta.ipAddresses.v6[i];
        }        
      }
    }

    //link
    if (respuesta.links!= null && respuesta.links.length > 0 ) {
      linkSource = respuesta.links[0].href;
    }
    //notices
    if (typeof respuesta.notices != "undefined" && respuesta.notices.length > 0) {
      nbri = 0;
      blnTermine = false;
      while (nbri < respuesta.notices.length && !blnTermine) {
        noticeTitle = "No Data";
        noticeDesc = "No Data";
        noticeLink = "#";
        //if (respuesta.notices[nbri].title = "Terms and Conditions") {
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
    //Inserto en datos:
    this.datosNameserver.push(ldhName);
    this.datosNameserver.push(ipV4);
    this.datosNameserver.push(ipV6);
    this.datosNameserver.push(linkSource);
    //this.datosNameserver.push(noticeTitle);
    //this.datosNameserver.push(noticeDesc);
    //this.datosNameserver.push(noticeLink);    

  }

}
