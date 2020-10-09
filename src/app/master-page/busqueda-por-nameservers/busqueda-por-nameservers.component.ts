import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router';
import { Utilities }        from "../../shared/utilities";
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../shared/services/data.service';
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";

@Component({
  selector: 'app-busqueda-por-nameservers',
  templateUrl: './busqueda-por-nameservers.component.html',
  styleUrls: ['./busqueda-por-nameservers.component.css']
})
export class BusquedaPorNameserversComponent implements OnInit {
  
  mensajes : Mensaje = new Mensaje();
  loading : boolean = true;
  valorBuscado : string;
  

  constructor(private dataService: DataService, private router: Router, private translate: TranslateService)  {
    this.cargarLenguaje();
    // this.cargarIpActual();
    this.loading = false;
  }

  ngOnInit(): void {
  }

  cargarLenguaje(){
    Utilities.log("[busqueda-por-nameservers.component.ts] - cargarLenguaje: Start");

    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    if(localStorage.getItem('lenguaje') != null) {
      this.translate.use(localStorage.getItem('lenguaje'));
    }
    else{
      this.translate.use(this.translate.getDefaultLang());
    }

    Utilities.log("[busqueda-por-nameservers.component.ts] - cargarLenguaje: Finish");
  }

  limpiarMensajes(){
    this.mensajes.Errores = [];
    this.mensajes.Exitos = [];
  }

  buscar(){
    Utilities.log("[busqueda-por-nameservers.component.ts] - buscar: Start");

    this.limpiarMensajes();
    this.validarDatoBuscado();

    Utilities.log("[busqueda-por-nameservers.component.ts] - buscar: Finish");
  }

  validarDatoBuscado(){
    Utilities.log("[busqueda-por-nameservers.component.ts] - validarDatoBuscado: Start");

    if(this.valorBuscado == null || this.valorBuscado == ""){
      this.traducirError("BUSQUEDAPORNAMESERVERS.Errores.valorBuscadoVacio");
    }
    else{
      
      this.buscarNameservers();
    }

    Utilities.log("[busqueda-por-nameservers.component.ts] - validarDatoBuscado: Finish");
  }

  traducirError(paraTraducir : string){
    this.translate.get(paraTraducir)
      .subscribe(
        value => this.mostrarError(value),
        error => this.translateError(error),
        () => Utilities.log("[busqueda-por-nameservers.component.ts] - translate.get: Completed")
      );
  }

  mostrarError(errorDescription : string){
    var error : Error = new Error();
    error.Description = errorDescription;
    this.mensajes.Errores.push(error);
  }

  translateError(error:any){
    Utilities.log("[busqueda-por-nameservers.component.ts] - translateError | error: " + JSON.stringify(error));
  }

  buscarNameservers(){
    var valorBusqueda : string = "";    
    valorBusqueda = "name=" + this.valorBuscado.trim();  

    this.router.navigate(['/nameservers',valorBusqueda]);
  }

}
