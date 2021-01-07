import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { Utilities } from "../../shared/utilities";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { RespDomainSearch } from '../../shared/respDomainSearch';
import { Constantes } from '../../shared/constantes';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-result-srch-domains',
  templateUrl: './result-srch-domains.component.html',
  styleUrls: ['./result-srch-domains.component.css']
})
export class ResultSrchDomainsComponent implements OnInit {

  mensajes: Mensaje = new Mensaje();
  loading: boolean = true;
  domain: string;
  datosDomain: any[] = [];

  datosNotices: any[] = [];
  datosBusqueda: any[] = [];
  
  rederictUrl: string = Constantes.rederictUrl;

  constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService, private sanitizer: DomSanitizer) {
    this.cargarLenguaje();
  }

  ngOnInit(): void {
    Utilities.log("[result-srch-domain.component.ts] - ngOnInit: Start");

    this.domain = this.route.snapshot.params['domain'];
    if (this.domain != undefined && this.domain != null && this.domain != "") {

      
      this.buscarDatosSearchDomain();
    }
    Utilities.log("[result-srch-domain.component.ts] - ngOnInit: Finish");
  }

  cargarLenguaje() {
    Utilities.log("[result-srch-domain.component.ts] - cargarLenguaje: Start");

    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    if (localStorage.getItem('lenguaje') != null) {
        this.translate.use(localStorage.getItem('lenguaje'));
    }
    else {
        this.translate.use(this.translate.getDefaultLang());
    }

    Utilities.log("[result-srch-domain.component.ts] - cargarLenguaje: Finish");
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
        () => Utilities.log("[result-srch-domain.component.ts] - translate.get: Completed")
      );
  }

  mostrarError(errorDescription: string) {
    var error: Error = new Error();
    error.Description = errorDescription;
    this.mensajes.Errores.push(error);
  }

  translateError(error: any) {
    Utilities.log("[result-srch-domain.component.ts] - translateError | error: " + JSON.stringify(error));
  }

  buscarDatosSearchDomain() {
    Utilities.log("[result-srch-domain.component.ts] - buscarDatosSearchDomain: Start");
    Utilities.log("[result-srch-domain.component.ts] - buscarDatosDomain | this.domain: " + this.domain);

    this.dataService.getSearchDomain(this.domain)
      .subscribe(
        res => this.parseGetSearchDomainOk(res),
        error => this.parseGetSearchDomainError(error),
        () => Utilities.log("[result-srch-domain.component.ts] - getSearchDomain: Completed")
      );

    Utilities.log("[result-srch-domain.component.ts] - buscarDatosSearchDomain: Finish");
  }

  parseGetSearchDomainError(error: any) {
    Utilities.log("[result-srch-domain.component.ts] - parseGetBuscarDomainError| error: " + JSON.stringify(error));
    //if (error.json().errorCode == 429) {
    if (error.errorCode == 429) {
      this.traducirError("GENERAL.Errores.ArrayLimit");
    } else {
      this.traducirError("RESULTSRCHDOMAIN.Errores.sinResultados");
      this.traducirError("RESULTSRCHDOMAIN.Errores.verifiqueYReintente");
    }
    this.loading = false;
  }

  parseGetSearchDomainOk(response: any) {
    Utilities.log("[result-srch-domain.component.ts] - parseGetSearchDomainOk | response: " + JSON.stringify(response));

    var respuesta: RespDomainSearch = response;
    this.obtenerDatosDomains(respuesta);

    this.loading = false;
    Utilities.log("[result-srch-domain.component.ts] - parseGetSearchDomainOk | respuesta: " + JSON.stringify(respuesta));

  }

  obtenerDatosDomains(respuesta: RespDomainSearch) {

    var noticeTitle : string = "No data";
    var noticeDesc : string = "No data"; 
    var noticeLink : string = "";

    var nbri : number = 0;

    var busquedaTitle : string = "No data";
    var busquedaDesc : string = "No data";

    if (respuesta.domainSearchResults.length > 0) {
      for (let d of respuesta.domainSearchResults) {
        //Inicializo variables
        var ldhName: string = "No data";
        var handle: string = "No data";    
        var linkSource: string = "";
        var linkDomain: string = "";
        
        if  (typeof d.ldhName != "undefined" && d.ldhName != "") {
          ldhName = d.ldhName;
        };
        if  (typeof d.handle != "undefined" && d.handle != "") {
          handle = d.handle;
        };
        //link
        if (d.links!= null && d.links.length > 0 ) {
          linkSource = d.links[0].href;
        }

        linkDomain = this.rederictUrl + "domain/" +  d.ldhName;

        this.datosDomain.push({
          "LdhName" : ldhName,
          "Handle" : handle,
          "Source" : linkSource,
          "Info" : linkDomain
        });
      }
    }

    //notices
    if (typeof respuesta.notices != "undefined" && respuesta.notices.length > 0) {
      nbri = 0;
      
      while (nbri < respuesta.notices.length) {
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

    //datos extras
    busquedaTitle = this.translate.instant("RESULTADOSIP.TablaExtra.Filas.Port43.Titulo");
    busquedaDesc = "No data";
    if (typeof respuesta.port43 != "undefined" && respuesta.port43 != ""){
      busquedaDesc = respuesta.port43;     
    }
    this.datosBusqueda.push({
      "Title": busquedaTitle,
      "Desc": busquedaDesc
    });

    busquedaTitle = this.translate.instant("RESULTADOSIP.TablaExtra.Filas.RdapConformance.Titulo");
    busquedaDesc = "No data";
    if (typeof respuesta.rdapConformance != "undefined" && respuesta.rdapConformance.length > 0){
      for (let i: number = 0; i < respuesta.rdapConformance.length; i++) {
        if (i == 0) {
          busquedaDesc = respuesta.rdapConformance[i];
        } else {
          busquedaDesc = busquedaDesc + ', ' + respuesta.rdapConformance[i];
        }
      }
    }
    this.datosBusqueda.push({
      "Title": busquedaTitle,
      "Desc": busquedaDesc
    });



  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
