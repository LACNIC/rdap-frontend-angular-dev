import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { Utilities } from "../../shared/utilities";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { RespEntitySearch } from '../../shared/respEntitySearch';
import { Constantes } from '../../shared/constantes';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-result-srch-entities',
  templateUrl: './result-srch-entities.component.html',
  styleUrls: ['./result-srch-entities.component.css']
})
export class ResultSrchEntitiesComponent implements OnInit {

  mensajes: Mensaje = new Mensaje();
  loading: boolean = true;
  entity: string;
  datosEntity: any[] = [];

  datosNotices: any[] = [];
  datosBusqueda: any[] = [];
  
  rederictUrl: string = Constantes.rederictUrl;

  constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService, private sanitizer: DomSanitizer) {
    this.cargarLenguaje();
  }

  ngOnInit(): void {
    Utilities.log("[result-srch-entity.component.ts] - ngOnInit: Start");

    this.entity = this.route.snapshot.params['entity'];
    if (this.entity != undefined && this.entity != null && this.entity != "") {

      
      this.buscarDatosSearchEntity();
    }
    Utilities.log("[result-srch-entity.component.ts] - ngOnInit: Finish");
  }

  cargarLenguaje() {
    Utilities.log("[result-srch-entity.component.ts] - cargarLenguaje: Start");

    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    if (localStorage.getItem('lenguaje') != null) {
        this.translate.use(localStorage.getItem('lenguaje'));
    }
    else {
        this.translate.use(this.translate.getDefaultLang());
    }

    Utilities.log("[result-srch-entity.component.ts] - cargarLenguaje: Finish");
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
        () => Utilities.log("[result-srch-entity.component.ts] - translate.get: Completed")
      );
  }

  mostrarError(errorDescription: string) {
    var error: Error = new Error();
    error.Description = errorDescription;
    this.mensajes.Errores.push(error);
  }

  translateError(error: any) {
    Utilities.log("[result-srch-entity.component.ts] - translateError | error: " + JSON.stringify(error));
  }

  buscarDatosSearchEntity() {
    Utilities.log("[result-srch-entity.component.ts] - buscarDatosSearchEntity: Start");
    Utilities.log("[result-srch-entity.component.ts] - buscarDatosSearchEntity | this.entity: " + this.entity);

    this.dataService.getSearchEntities(this.entity)
      .subscribe(
        res => this.parseGetSearchEntityOk(res),
        error => this.parseGetSearchEntityError(error),
        () => Utilities.log("[result-srch-entity.component.ts] - getSearchEntities: Completed")
      );

    Utilities.log("[result-srch-entity.component.ts] - buscarDatosSearchEntity: Finish");
  }

  parseGetSearchEntityError(error: any) {
    Utilities.log("[result-srch-entity.component.ts] - parseGetSearchEntityError| error: " + JSON.stringify(error));
    //if (error.json().errorCode == 429) {
    if (error.errorCode == 429) {
      this.traducirError("GENERAL.Errores.ArrayLimit");
    } else {
      this.traducirError("RESULTSRCHENTITY.Errores.sinResultados");
      this.traducirError("RESULTSRCHENTITY.Errores.verifiqueYReintente");
    }
    this.loading = false;
  }

  parseGetSearchEntityOk(response: any) {
    Utilities.log("[result-srch-entity.component.ts] - parseGetSearchEntityOk | response: " + JSON.stringify(response));

    var respuesta: RespEntitySearch = response;
    this.obtenerDatosEntities(respuesta);

    this.loading = false;
    Utilities.log("[result-srch-entity.component.ts] - parseGetSearchEntityOk | respuesta: " + JSON.stringify(respuesta));

  }

  obtenerDatosEntities(respuesta: RespEntitySearch) {
    
    var noticeTitle : string = "No data";
    var noticeDesc : string = "No data"; 
    var noticeLink : string = "";

    var nbri : number = 0;

    var busquedaTitle : string = "No data";
    var busquedaDesc : string = "No data";

    if (respuesta.entities.length > 0) {
      for (let d of respuesta.entities) {
        //Inicializo variables        
        var handle: string = "No data";    
        var version: string = "No data";
        var fn: string = "No data";
        var linkSource: string = "";
        var linkEntity: string = "";
        
       
        if  (typeof d.handle != "undefined" && d.handle != "") {
          handle = d.handle;
        };
        //version y fn
        if (typeof d.vcardArray != "undefined") {
          for (let v of d.vcardArray[1]) {
            if (v[0] == "fn") {
              fn = v[3];
            }
            if (v[0] == "version") {
              version = v[3];
            }
          }
        }

        //link
        if (d.links!= null && d.links.length > 0 ) {
          linkSource = d.links[0].href;
        }

        linkEntity = this.rederictUrl + "entity/" +  d.handle;

        this.datosEntity.push({          
          "Handle" : handle,
          "Fn": fn,
          "Version": version,
          "Source" : linkSource,
          "Info" : linkEntity
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
