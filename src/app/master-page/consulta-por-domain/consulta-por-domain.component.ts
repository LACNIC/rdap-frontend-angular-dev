import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router';
import { Utilities }        from "../../shared/utilities";
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../shared/services/data.service';
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";

@Component({
  selector: 'app-consulta-por-domain',
  templateUrl: './consulta-por-domain.component.html',
  styleUrls: ['./consulta-por-domain.component.css']
})
export class ConsultaPorDomainComponent implements OnInit {

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
    Utilities.log("[consulta-por-domain.component.ts] - cargarLenguaje: Start");

    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    if(localStorage.getItem('lenguaje') != null) {
      this.translate.use(localStorage.getItem('lenguaje'));
    }
    else{
      this.translate.use(this.translate.getDefaultLang());
    }

    Utilities.log("[consulta-por-domain.component.ts] - cargarLenguaje: Finish");
  }

  limpiarMensajes(){
    this.mensajes.Errores = [];
    this.mensajes.Exitos = [];
  }

  buscar(){
    Utilities.log("[consulta-por-domain.component.ts] - buscar: Start");

    this.limpiarMensajes();
    this.validarDatoBuscado();

    Utilities.log("[consulta-por-domain.component.ts] - buscar: Finish");
  }

  validarDatoBuscado(){
    Utilities.log("[consulta-por-domain.component.ts] - validarDatoBuscado: Start");

    if(this.valorBuscado == null || this.valorBuscado == ""){
      this.traducirError("CONSULTAPORDOMAIN.Errores.valorBuscadoVacio");
    }
    else{
      
      this.buscarDomain();
    }

    Utilities.log("[consulta-por-domain.component.ts] - validarDatoBuscado: Finish");
  }

  traducirError(paraTraducir : string){
    this.translate.get(paraTraducir)
      .subscribe(
        value => this.mostrarError(value),
        error => this.translateError(error),
        () => Utilities.log("[consulta-por-domain.component.ts] - translate.get: Completed")
      );
  }

  mostrarError(errorDescription : string){
    var error : Error = new Error();
    error.Description = errorDescription;
    this.mensajes.Errores.push(error);
  }

  translateError(error:any){
    Utilities.log("[consulta-por-domain.component.ts] - translateError | error: " + JSON.stringify(error));
  }

  buscarDomain(){
    this.router.navigate(['/domain',this.valorBuscado]);
  }

}
