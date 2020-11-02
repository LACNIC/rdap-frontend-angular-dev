import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilities }        from "../../shared/utilities";
import { TranslateService } from '@ngx-translate/core';
import { Mensaje } from "../../shared/mensaje";
import { Exito } from "../../shared/exito";
import { Error } from "../../shared/error";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mensajes: Mensaje = new Mensaje();

  loading: boolean = true;
  tipoBuscado: number;
  valorBuscado: string;
  strMyIp: string;

  blnShowDropEntities: boolean = false;
  blnShowDropDomain: boolean = false;
  paramEntities: number;
  paramDomain: number;
  tipoBusquedaEnt : number;
  tipoBusquedaDom : number;

  constructor(private dataService: DataService, private router: Router, private translate: TranslateService) {
    this.cargarLenguaje();
    //this.loading = true;
    this.cargarIpActual();

    this.tipoBuscado = 2;
    this.paramEntities = 1;
    this.paramDomain = 1;
    this.tipoBusquedaEnt = 1;
    this.tipoBusquedaDom = 1;
    //his.valorBuscado = this.strMyIp;
    
    
  }

  ngOnInit(): void {
  }

  cargarLenguaje() {
    Utilities.log("[home.component.ts] - cargarLenguaje: Start");

    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    if (localStorage.getItem('lenguaje') != null) {
      this.translate.use(localStorage.getItem('lenguaje'));
    }
    else {
      this.translate.use(this.translate.getDefaultLang());
    }

    Utilities.log("[home.component.ts] - cargarLenguaje: Finish");
  }

  limpiarMensajes() {
    this.mensajes.Errores = [];
    this.mensajes.Exitos = [];
  }

  cargarIpActual() {
    this.dataService.getBuscarMiIP()
      .subscribe(
        res => this.parseGetBuscarMiIPOk(res),
        error => this.parseGetBuscarMiIPError(error),
        () => Utilities.log("[home.component.ts] - getBuscarMiIP: Completed")
      );
  }

  parseGetBuscarMiIPOk(response: any) {
    Utilities.log("[home.component.ts] - parseGetBuscarMiIPOk | response: " + JSON.stringify(response));

    //this.valorBuscado = response.clientIP;
    this.strMyIp = response.ip;
    this.valorBuscado = response.ip;
    Utilities.log("[home.component.ts] - parseGetBuscarMiIPOk | this.valorBuscado: " + this.strMyIp);
    this.loading = false;
  }

  parseGetBuscarMiIPError(error: any) {
    Utilities.log("[home.component.ts] - parseGetBuscarMiIPError| error: " + JSON.stringify(error));
    this.valorBuscado = "";
    this.loading = false;
  }

  buscar() {
    Utilities.log("[home.component.ts] - buscar: Start");

    this.limpiarMensajes();
    this.validarDatoBuscado();

    Utilities.log("[home.component.ts] - buscar: Finish");
  }

  validarDatoBuscado() {
    Utilities.log("[home.component.ts] - validarDatoBuscado: Start");

    if (this.valorBuscado == null || this.valorBuscado == "") {
      this.traducirError("HOME.Errores.valorBuscadoVacio");
    }
    else {
      if (this.tipoBuscado == 1) { //Si está buscando por Autnum
        this.buscarAutnum();
      }
      if (this.tipoBuscado == 2) { //Si está buscando por IP
        this.buscarIP();
      }
      if (this.tipoBuscado == 3) { //Si está buscando por Entity
        this.buscarEntity();
      }
      if (this.tipoBuscado == 4) { //Si está buscando por Nameserver
        this.buscarNameserver();
      }
      if (this.tipoBuscado == 5) { //Si está buscando por Domain
        this.buscarDomain();
      }
      if (this.tipoBuscado == 6) { //Si está buscando por Entities
        this.buscarEntities();
      }
      if (this.tipoBuscado == 7) { //Si está buscando por Nameserver
        this.buscarNameservers();
      }
      if (this.tipoBuscado == 8) { //Si está buscando por Domains
        this.buscarDomains();
      }
      
      //if(this.tipoBuscado == 6){ //Si está buscando por Entities by Name
      //  this.buscarEntitiesByName();
      //}
    }

    Utilities.log("[home.component.ts] - validarDatoBuscado: Finish");
  }

  traducirError(paraTraducir: string) {
    this.translate.get(paraTraducir)
      .subscribe(
          value => this.mostrarError(value),
          error => this.translateError(error),
          () => Utilities.log("[home.component.ts] - translate.get: Completed")
      );
  }
  
  mostrarError(errorDescription: string) {
    var error: Error = new Error();
    error.Description = errorDescription;
    this.mensajes.Errores.push(error);
  }

  translateError(error: any) {
    Utilities.log("[home.component.ts] - translateError | error: " + JSON.stringify(error));
  }

  buscarIP() {
    this.router.navigate(['/ip', this.valorBuscado]);
  }

  buscarEntity() {
    this.router.navigate(['/entity', this.valorBuscado]);
  }

  buscarAutnum() {
    if (this.valorBuscado.toLocaleUpperCase().includes("AS")) {
      this.valorBuscado = this.valorBuscado.substring(2);
    }

    this.router.navigate(['/autnum', this.valorBuscado]);
  }

  buscarEntitiesByName() {
    this.router.navigate(['/entities', this.valorBuscado]);
  }

  buscarNameserver() {
    this.router.navigate(['/nameserver', this.valorBuscado]);
  }

  buscarDomain() {
    this.router.navigate(['/domain', this.valorBuscado]);
  }

  buscarDomains() {
    var valorBusqueda: string = "";
    if (this.tipoBusquedaDom == 1) {
      valorBusqueda =  "name=" + this.valorBuscado.trim();
    } else {
      valorBusqueda = "nsLdhName=" + this.valorBuscado.trim();
    }

    this.router.navigate(['/domains',valorBusqueda]);
  }

  buscarEntities() {
    var valorBusqueda: string = "";
    if (this.tipoBusquedaEnt == 1) {
      valorBusqueda =  "fn=" + this.valorBuscado.trim();
    } else {
      valorBusqueda = "handle=" + this.valorBuscado.trim();
    }

    this.router.navigate(['/entities',valorBusqueda]);
  }

  buscarNameservers() {
    var valorBusqueda: string = "";    
    valorBusqueda = "name=" + this.valorBuscado.trim();    

    this.router.navigate(['/nameservers',valorBusqueda]);
  }

  onChange() {
    this.blnShowDropEntities = false;
    this.blnShowDropDomain = false;
    //busqueda entities
    if (this.tipoBuscado == 6) {
      this.blnShowDropEntities = true;
    }
    //busqueda domains
    if (this.tipoBuscado == 8) {
      this.blnShowDropDomain = true;
    }

    //IP
    if (this.tipoBuscado != 2) {
      this.valorBuscado = "";
    } else {
      this.valorBuscado = this.strMyIp;
    }

  }

  
  
  




}
