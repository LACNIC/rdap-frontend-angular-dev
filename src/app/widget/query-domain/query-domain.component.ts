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
import {AppSettings} from '../../app.settings';

@Component({
  selector: 'app-query-domain',
  templateUrl: './query-domain.component.html',
  styleUrls: ['./query-domain.component.css']
})
export class QueryDomainComponent implements OnInit {

  mensajes: Mensaje = new Mensaje();
  loading: boolean = true;
  widgetSectionHasRoundedBorder = AppSettings.widgetSectionHasRoundedBorder;
  domain: string;
  datosDomain: string[] = [];
  datosNameservers: any[] = [];
  datosNotices: any[] = [];
  datosRemarks: any[] = [];
  datosExtra: any[] = [];
  datosLinks: any[] = [];
  rederictUrl: string = Constantes.rederictUrl;
  
  lang : string = "es";

  constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService, private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
  
    Utilities.log("[resultados-domain.component.ts] - ngOnInit: Start");

    var langParam = this.route.snapshot.queryParamMap.get("lang"); 
    
    if (langParam != undefined && langParam != null) {
      if (langParam == 'es' || langParam == 'pt' || langParam == 'en') {
        this.lang = langParam;
      } else {
        this.lang = 'es';
      }
    } else {
      this.lang = 'es';
    }

    this.cargarLenguaje();

    this.domain = this.route.snapshot.params['domain'];
    if (this.domain != undefined && this.domain != null && this.domain != "") {

      
      this.buscarDatosDomain();
    }

    Utilities.log("[resultados-domain.component.ts] - ngOnInit: Finish");
  }

  cargarLenguaje() {
    Utilities.log("[resultados-domain.component.ts] - cargarLenguaje: Start");

    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);

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
    this.obtenerDatosExtra(respuesta);
    this.obtenerDatosDesconocidos(respuesta);

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

    var remarkTitle : String = "Description";
    var remarkDesc : String = "No data";

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

  obtenerDatosExtra(respuesta: ResponseDomain) {
    var extraTitle: string = "No data";
    var extraDesc: string = "No data";
    
    var linkTitle: string  = "No data";
    var linkDesc: string = "No data";
    var linkLink: string = "#";

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
    var columns : string[] = ["handle","links","ldhName","rdapConformance","notices","port43",
    "objectClassName","nameServers","remarks"];
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

