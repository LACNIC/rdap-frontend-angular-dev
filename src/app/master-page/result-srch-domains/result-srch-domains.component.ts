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
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
