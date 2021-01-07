import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router';
import { Utilities }        from "../../shared/utilities";
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../shared/services/data.service';
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";

@Component({
  selector: 'app-consulta-por-nameserver',
  templateUrl: './consulta-por-nameserver.component.html',
  styleUrls: ['./consulta-por-nameserver.component.css']
})
export class ConsultaPorNameserverComponent implements OnInit {
  
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
    Utilities.log("[consulta-por-nameserver.component.ts] - cargarLenguaje: Start");

    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    if(localStorage.getItem('lenguaje') != null) {
      this.translate.use(localStorage.getItem('lenguaje'));
    }
    else{
      this.translate.use(this.translate.getDefaultLang());
    }

    Utilities.log("[consulta-por-nameserver.component.ts] - cargarLenguaje: Finish");
  }

  limpiarMensajes(){
    this.mensajes.Errores = [];
    this.mensajes.Exitos = [];
  }

  buscar(){
    Utilities.log("[consulta-por-nameserver.component.ts] - buscar: Start");

    this.limpiarMensajes();
    this.validarDatoBuscado();

    Utilities.log("[consulta-por-nameserver.component.ts] - buscar: Finish");
  }

  validarDatoBuscado(){
    Utilities.log("[consulta-por-nameserver.component.ts] - validarDatoBuscado: Start");

    if(this.valorBuscado == null || this.valorBuscado == ""){
      this.traducirError("CONSULTAPORNAMESERVER.Errores.valorBuscadoVacio");
    }
    else{
      
      this.buscarNameserver();
    }

    Utilities.log("[consulta-por-nameserver.component.ts] - validarDatoBuscado: Finish");
  }

  traducirError(paraTraducir : string){
    this.translate.get(paraTraducir)
      .subscribe(
        value => this.mostrarError(value),
        error => this.translateError(error),
        () => Utilities.log("[consulta-por-nameserver.component.ts] - translate.get: Completed")
      );
  }

  mostrarError(errorDescription : string){
    var error : Error = new Error();
    error.Description = errorDescription;
    this.mensajes.Errores.push(error);
  }

  translateError(error:any){
    Utilities.log("[consulta-por-nameserver.component.ts] - translateError | error: " + JSON.stringify(error));
  }

  buscarNameserver(){
    this.router.navigate(['/rdap/nameserver',this.valorBuscado]);
  }

}
