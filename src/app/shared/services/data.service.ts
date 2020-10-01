import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {AppSettings} from "../../app.settings";
import {Utilities} from '../utilities';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  contentHeadersUrlEncoded: HttpHeaders;
  private headers = new HttpHeaders({
    'Accept': 'text/html,application/xhtml+xml,application/xml, application/json',
    'Content-Type': 'application/json',
  });
  private options = {responseType: 'blob'};


  constructor(private http: HttpClient) { 
    this.contentHeadersUrlEncoded = new HttpHeaders();
  }

  public getBuscarMiIP() {
    Utilities.log("[data.service.ts] - getBuscarIP: Start");

    var url: string = AppSettings.SERVICE_IP_API_URL;
    Utilities.log("[data.service.ts] - getBuscarMiIP | url: " + url);

    return this.http.get(url).pipe(      
      catchError(this.handleError)
    );
  }

  public getBuscarIP(ipBuscada: string) {
    Utilities.log("[data.service.ts] - getBuscarIP: Start");

    var url: string = AppSettings.SERVICE_IP_EXT_API_URL + ipBuscada;
    Utilities.log("[data.service.ts] - getBuscarIP | url: " + url);
    return this.http.get(url).pipe(        
      catchError(this.handleError)
    );
  }

  public getBuscarAutnum(autnumBuscado: string) {
    Utilities.log("[data.service.ts] - getBuscarAutnum: Start");

    var url: string = AppSettings.SERVICE_AUTNUM_API_URL + autnumBuscado;
    Utilities.log("[data.service.ts] - getBuscarAutnum | url: " + url);

    return this.http.get(url).pipe(      
      catchError(this.handleError)
    );
  }

  public getBuscarEntity(entityBuscada: string) {
    Utilities.log("[data.service.ts] - getBuscarEntity: Start");

    var url: string = AppSettings.SERVICE_ENTITY_API_URL + entityBuscada;
    Utilities.log("[data.service.ts] - getBuscarEntity | url: " + url);

    return this.http.get(url).pipe(      
      catchError(this.handleError)
    );
  }

  public getBuscarEntities(nombreBuscado: string) {
    Utilities.log("[data.service.ts] - getBuscarEntities: Start");

    var url: string = AppSettings.SERVICE_ENTITIES_API_URL + nombreBuscado + "*";
    Utilities.log("[data.service.ts] - getBuscarEntities | url: " + url);

    return this.http.get(url).pipe(     
      catchError(this.handleError)
    );
  }


  private handleError(error: any) {
    Utilities.log("[data.service.ts] - handleErrror: "+ error);
    return Observable.throw(error || "Server Error");
  }



}
