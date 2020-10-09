import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { Utilities } from "../../shared/utilities";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { RespNameserverSearch } from '../../shared/respNameserverSearch';
import { Constantes } from '../../shared/constantes';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-result-srch-nameservers',
  templateUrl: './result-srch-nameservers.component.html',
  styleUrls: ['./result-srch-nameservers.component.css']
})
export class ResultSrchNameserversComponent implements OnInit {

  mensajes: Mensaje = new Mensaje();
  loading: boolean = true;
  nameserver: string;
  datosNameserver: any[] = [];
  
  rederictUrl: string = Constantes.rederictUrl;

  constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService, private sanitizer: DomSanitizer) {
    this.cargarLenguaje();
  }

  ngOnInit(): void {
    Utilities.log("[result-srch-nameserver.component.ts] - ngOnInit: Start");

    this.nameserver = this.route.snapshot.params['nameserver'];
    if (this.nameserver != undefined && this.nameserver != null && this.nameserver != "") {

      
      this.buscarDatosSearchNameserver();
    }
    Utilities.log("[result-srch-nameserver.component.ts] - ngOnInit: Finish");
  }

  cargarLenguaje() {
    Utilities.log("[result-srch-nameserver.component.ts] - cargarLenguaje: Start");

    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    if (localStorage.getItem('lenguaje') != null) {
        this.translate.use(localStorage.getItem('lenguaje'));
    }
    else {
        this.translate.use(this.translate.getDefaultLang());
    }

    Utilities.log("[result-srch-nameserver.component.ts] - cargarLenguaje: Finish");
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
        () => Utilities.log("[result-srch-nameserver.component.ts] - translate.get: Completed")
      );
  }

  mostrarError(errorDescription: string) {
    var error: Error = new Error();
    error.Description = errorDescription;
    this.mensajes.Errores.push(error);
  }

  translateError(error: any) {
    Utilities.log("[result-srch-nameserver.component.ts] - translateError | error: " + JSON.stringify(error));
  }

  buscarDatosSearchNameserver() {
    Utilities.log("[result-srch-nameserver.component.ts] - buscarDatosSearchNamerver: Start");
    Utilities.log("[result-srch-nameserver.component.ts] - buscarDatosSearchNamerver | this.nameserver: " + this.nameserver);

    this.dataService.getSearchNameserver(this.nameserver)
      .subscribe(
        res => this.parseGetSearchNameserverOk(res),
        error => this.parseGetSearchNameserverError(error),
        () => Utilities.log("[result-srch-nameserver.component.ts] - getSearchNameserver: Completed")
      );

    Utilities.log("[result-srch-nameserver.component.ts] - buscarDatosSearchNamerver: Finish");
  }

  parseGetSearchNameserverError(error: any) {
    Utilities.log("[result-srch-nameserver.component.ts] - parseGetSearchNameserverError| error: " + JSON.stringify(error));
    //if (error.json().errorCode == 429) {
    if (error.errorCode == 429) {
      this.traducirError("GENERAL.Errores.ArrayLimit");
    } else {
      this.traducirError("RESULTSRCHNAMESERVER.Errores.sinResultados");
      this.traducirError("RESULTSRCHNAMESERVER.Errores.verifiqueYReintente");
    }
    this.loading = false;
  }

  parseGetSearchNameserverOk(response: any) {
    Utilities.log("[result-srch-nameserver.component.ts] - parseGetSearchNameserverOk | response: " + JSON.stringify(response));

    var respuesta: RespNameserverSearch = response;
    this.obtenerDatosNameservers(respuesta);

    this.loading = false;
    Utilities.log("[result-srch-nameserver.component.ts] - parseGetSearchNameserverOk | respuesta: " + JSON.stringify(respuesta));

  }

  obtenerDatosNameservers(respuesta: RespNameserverSearch) {
    

    if (respuesta.nameserverSearchResults.length > 0) {
      for (let d of respuesta.nameserverSearchResults) {
        //Inicializo variables
        var ldhName: string = "No data";        
        var linkSource: string = "";
        var linkNameserver: string = "";
        
        if  (typeof d.ldhName != "undefined" && d.ldhName != "") {
          ldhName = d.ldhName;
        };
       
        //link
        if (d.links!= null && d.links.length > 0 ) {
          linkSource = d.links[0].href;
        }

        linkNameserver = this.rederictUrl + "nameserver/" +  d.ldhName;

        this.datosNameserver.push({
          "LdhName" : ldhName,          
          "Source" : linkSource,
          "Info" : linkNameserver
        });
      }
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  

}
