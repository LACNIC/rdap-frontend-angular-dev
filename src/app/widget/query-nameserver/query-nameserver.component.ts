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
  selector: 'app-query-nameserver',
  templateUrl: './query-nameserver.component.html',
  styleUrls: ['./query-nameserver.component.css']
})
export class QueryNameserverComponent implements OnInit {

  mensajes: Mensaje = new Mensaje();
  loading: boolean = true;
  nameserver: string;
  datosNameserver: string[] = [];
  datosNotices: any[] = [];
  datosRemarks: any[] = [];
  datosExtra: any[] = [];
  datosLinks: any[] = [];  

  rederictUrl: string = Constantes.rederictUrl;
  
  lang : string = "es";

  constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService, private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    Utilities.log("[resultados-nameserver.component.ts] - ngOnInit: Start");

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

    this.nameserver = this.route.snapshot.params['nameserver'];
    if (this.nameserver != undefined && this.nameserver != null && this.nameserver != "") {

      
      this.buscarDatosNameserver();
    }

    Utilities.log("[resultados-nameserver.component.ts] - ngOnInit: Finish");
  }

  cargarLenguaje() {
    Utilities.log("[resultados-nameserver.component.ts] - cargarLenguaje: Start");

    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);

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
    this.obtenerDatosExtra(respuesta);
    this.obtenerDatosDesconocidos(respuesta);
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
    var remarkTitle : String = "Description";
    var remarkDesc : String = "No data";

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
    //Inserto en datos:
    this.datosNameserver.push(ldhName);
    this.datosNameserver.push(ipV4);
    this.datosNameserver.push(ipV6);
    this.datosNameserver.push(linkSource);
    //this.datosNameserver.push(noticeTitle);
    //this.datosNameserver.push(noticeDesc);
    //this.datosNameserver.push(noticeLink);    

  }

  obtenerDatosExtra(respuesta: ResponseNameserver) {
    var extraTitle: string = "No data";
    var extraDesc: string = "No data";
    var eventTitle: string = "No data";
    var eventDesc: string = "No data";
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
    var columns : string[] = ["ldhName","links","rdapConformance","notices","port43","objectClassName",
    "ipAddresses", "remarks"];
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

  

}

