import { Component }        from '@angular/core';
import { Router }           from '@angular/router';
import { DataService }      from '../../shared/services/data.service';
import { TranslateService } from "ng2-translate";
import { Utilities }        from "../../shared/utilities";
import { Mensaje }          from "../../shared/mensaje";
import { Exito }            from "../../shared/exito";
import { Error }            from "../../shared/error";

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls:  ['home.css']
})

export class HomeComponent {

    mensajes : Mensaje = new Mensaje();
    loading : boolean = false;
    tipoBuscado : number;
    valorBuscado : string;

    constructor(private dataService: DataService, private router: Router, private translate: TranslateService)  {
        this.cargarLenguaje();
        this.tipoBuscado = 2;
    }

    cargarLenguaje(){
        Utilities.log("[home.component.ts] - cargarLenguaje: Start");

        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if(localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else{
            this.translate.use(this.translate.getDefaultLang());
        }

        Utilities.log("[home.component.ts] - cargarLenguaje: Finish");
    }
    
    limpiarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    /**cargarIpActual(){
        this.dataService.getBuscarMiIP()
            .subscribe(
                res => this.parseGetBuscarMiIPOk(res),
                error => this.parseGetBuscarMiIPError(error),
                () => Utilities.log("[home.component.ts] - getBuscarMiIP: Completed")
            );
    }*/

    parseGetBuscarMiIPOk(response:any){
        Utilities.log("[home.component.ts] - parseGetBuscarMiIPOk | response: " + JSON.stringify(response));

        this.valorBuscado = response.clientIP;
        Utilities.log("[home.component.ts] - parseGetBuscarMiIPOk | this.valorBuscado: " + this.valorBuscado);
        this.loading = false;
    }

    parseGetBuscarMiIPError(error:any){
        Utilities.log("[home.component.ts] - parseGetBuscarMiIPError| error: " + JSON.stringify(error));
        this.valorBuscado = "";
        this.loading = false;
    }
    
    buscar(){
        Utilities.log("[home.component.ts] - buscar: Start");

        this.limpiarMensajes();
        this.validarDatoBuscado();

        Utilities.log("[home.component.ts] - buscar: Finish");
    }
    
    validarDatoBuscado(){
        Utilities.log("[home.component.ts] - validarDatoBuscado: Start");

        if(this.valorBuscado == null || this.valorBuscado == ""){
            this.traducirError("HOME.Errores.valorBuscadoVacio");
        }
        else{
            if(this.tipoBuscado == 1){ //Si está buscando por Autnum
                this.buscarAutnum();
            }
            if(this.tipoBuscado == 2){ //Si está buscando por IP
                this.buscarIP();
            }
            if(this.tipoBuscado == 3){ //Si está buscando por Entity
                this.buscarEntity();
            }
            //if(this.tipoBuscado == 6){ //Si está buscando por Entities by Name
              //  this.buscarEntitiesByName();
            //}
        }

        Utilities.log("[home.component.ts] - validarDatoBuscado: Finish");
    }
    
    traducirError(paraTraducir : string){
        this.translate.get(paraTraducir)
            .subscribe(
                value => this.mostrarError(value),
                error => this.translateError(error),
                () => Utilities.log("[home.component.ts] - translate.get: Completed")
            );
    }
    
    mostrarError(errorDescription : string){
        var error : Error = new Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    }
    
    translateError(error:any){
        Utilities.log("[home.component.ts] - translateError | error: " + JSON.stringify(error));
    }
    
    buscarIP(){
        this.router.navigate(['/ip',this.valorBuscado]);
    }

    buscarEntity(){
        this.router.navigate(['/entity',this.valorBuscado]);
    }
    buscarAutnum(){
        this.router.navigate(['/autnum',this.valorBuscado]);
    }

    buscarEntitiesByName(){
        this.router.navigate(['/entities',this.valorBuscado]);
    }
}