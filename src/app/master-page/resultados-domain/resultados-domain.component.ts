import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../shared/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import {Utilities} from "../../shared/utilities";
import {Mensaje} from "../../shared/mensaje";
import {Error} from "../../shared/error";
import {ResponseDomain} from '../../shared/responseDomain';
import {Constantes} from '../../shared/constantes';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-resultados-domain',
  templateUrl: './resultados-domain.component.html',
  styleUrls: ['./resultados-domain.component.css']
})
export class ResultadosDomainComponent implements OnInit {

  mensajes: Mensaje = new Mensaje();
  loading: boolean = true;
  domain: string;
  datosDomain: string[] = [];
  datosNameservers: any[] = [];
  datosNotices: any[] = [];
  rederictUrl: string = Constantes.rederictUrl;

  constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService, private sanitizer: DomSanitizer) {
    this.cargarLenguaje();
  }

  ngOnInit(): void {
    Utilities.log("[resultados-domain.component.ts] - ngOnInit: Start");

    this.domain = this.route.snapshot.params['domain'];
    if (this.domain != undefined && this.domain != null && this.domain != "") {

      
      this.buscarDatosDomain();
    }

    Utilities.log("[resultados-domain.component.ts] - ngOnInit: Finish");
  }

  cargarLenguaje() {
    Utilities.log("[resultados-domain.component.ts] - cargarLenguaje: Start");

    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    if (localStorage.getItem('lenguaje') != null) {
        this.translate.use(localStorage.getItem('lenguaje'));
    }
    else {
        this.translate.use(this.translate.getDefaultLang());
    }

    Utilities.log("[resultados-domain.component.ts] - cargarLenguaje: Finish");
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
        () => Utilities.log("[resultados-domain.component.ts] - translate.get: Completed")
      );
  }

  mostrarError(errorDescription: string) {
    var error: Error = new Error();
    error.Description = errorDescription;
    this.mensajes.Errores.push(error);
  }

  translateError(error: any) {
    Utilities.log("[resultados-domain.component.ts] - translateError | error: " + JSON.stringify(error));
  }

  buscarDatosDomain() {
    Utilities.log("[resultados-domain.component.ts] - buscarDatosDomain: Start");
    Utilities.log("[resultados-domain.component.ts] - buscarDatosDomain | this.domain: " + this.domain);

    this.dataService.getBuscarDomain(this.domain)
      .subscribe(
        res => this.parseGetBuscarDomainOk(res),
        error => this.parseGetBuscarDomainError(error),
        () => Utilities.log("[resultados-domain.component.ts] - getBuscarDomain: Completed")
      );

    Utilities.log("[resultados-domain.component.ts] - buscarDatosDomain: Finish");
  }

  parseGetBuscarDomainError(error: any) {
    Utilities.log("[resultados-domain.component.ts] - parseGetBuscarDomainError| error: " + JSON.stringify(error));
    //if (error.json().errorCode == 429) {
    if (error.errorCode == 429) {
      this.traducirError("GENERAL.Errores.ArrayLimit");
    } else {
      this.traducirError("RESULTADOSDOMAIN.Errores.sinResultados");
      this.traducirError("RESULTADOSDOMAIN.Errores.verifiqueYReintente");
    }
    this.loading = false;
  }

  parseGetBuscarDomainOk(response: any) {
    Utilities.log("[resultados-domain.component.ts] - parseGetBuscarDomainOk | response: " + JSON.stringify(response));

    var respuesta: ResponseDomain = response;
    this.obtenerDatosDomain(respuesta);

    this.loading = false;
    Utilities.log("[resultados-domain.component.ts] - parseGetBuscarDomainOk | respuesta: " + JSON.stringify(respuesta));

  }

  obtenerDatosDomain(respuesta: ResponseDomain) {
    
    //Inicializo variables
    var ldhName: string = "No data";
    var handle: string = "No data";    
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
    //handle
    if (typeof respuesta.handle != "undefined" && respuesta.handle != "") {
      handle = respuesta.handle;
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
    }

    //Obtengo nameservers
    if (respuesta.nameServers.length > 0) {
      for (let i: number = 0; i < respuesta.nameServers.length; i++) {
        var link : string = this.rederictUrl + "nameserver/" +  respuesta.nameServers[i];
        this.datosNameservers.push({
          "Name" : respuesta.nameServers[i],
          "Info" : link
        });

      }        
    }

    //Inserto en datos
    this.datosDomain.push(handle);
    this.datosDomain.push(ldhName);    
    this.datosDomain.push(linkSource);
    //this.datosDomain.push(noticeTitle);
    //this.datosDomain.push(noticeDesc);
    //this.datosDomain.push(noticeLink); 
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
