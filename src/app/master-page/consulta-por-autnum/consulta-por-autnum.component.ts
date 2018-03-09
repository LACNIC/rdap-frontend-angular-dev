/**
 * Created by Bruno on 20/06/2017.
 */
import { Component }        from '@angular/core';
import { Router }           from '@angular/router';
import { TranslateService } from "ng2-translate";
import { DataService }      from '../../shared/services/data.service';
import { Utilities }        from "../../shared/utilities";
import { Mensaje }          from "../../shared/mensaje";
import { Exito }            from "../../shared/exito";
import { Error }            from "../../shared/error";

@Component({
    selector: 'consulta-por-autnum',
    templateUrl: 'consulta-por-autnum.component.html',
    styleUrls:  ['consulta-por-autnum.css']
})

export class ConsultaPorAutnumComponent {

    mensajes : Mensaje = new Mensaje();
    loading : boolean = true;
    valorBuscado : string;

    constructor(private dataService: DataService, private router: Router, private translate: TranslateService)  {
        this.cargarLenguaje();
        // this.cargarIpActual();
        this.loading = false;
    }

    cargarLenguaje(){
        Utilities.log("[consulta-por-autnum.component.ts] - cargarLenguaje: Start");

        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if(localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else{
            this.translate.use(this.translate.getDefaultLang());
        }

        Utilities.log("[consulta-por-autnum.component.ts] - cargarLenguaje: Finish");
    }

    limpiarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    // cargarIpActual(){
    //     this.dataService.getBuscarMiIP()
    //         .subscribe(
    //             res => this.parseGetBuscarMiIPOk(res),
    //             error => this.parseGetBuscarMiIPError(error),
    //             () => Utilities.log("[consulta-por-autnum.component.ts] - getBuscarMiIP: Completed")
    //         );
    // }

    // parseGetBuscarMiIPOk(response:any){
    //     Utilities.log("[consulta-por-autnum.component.ts] - parseGetBuscarMiIPOk | response: " + JSON.stringify(response));
    //
    //     this.valorBuscado = response.clientIP;
    //     Utilities.log("[consulta-por-autnum.component.ts] - parseGetBuscarMiIPOk | this.valorBuscado: " + this.valorBuscado);
    //     this.loading = false;
    // }
    //
    // parseGetBuscarMiIPError(error:any){
    //     Utilities.log("[consulta-por-autnum.component.ts] - parseGetBuscarMiIPError| error: " + JSON.stringify(error));
    //     this.valorBuscado = "";
    //     this.loading = false;
    // }

    buscar(){
        Utilities.log("[consulta-por-autnum.component.ts] - buscar: Start");

        this.limpiarMensajes();
        this.validarDatoBuscado();

        Utilities.log("[consulta-por-autnum.component.ts] - buscar: Finish");
    }

    validarDatoBuscado(){
        Utilities.log("[consulta-por-autnum.component.ts] - validarDatoBuscado: Start");

        if(this.valorBuscado == null || this.valorBuscado == ""){
            this.traducirError("CONSULTAPORAUTNUM.Errores.valorBuscadoVacio");
        }
        else{
            this.buscarAutnum();
        }

        Utilities.log("[consulta-por-autnum.component.ts] - validarDatoBuscado: Finish");
    }

    traducirError(paraTraducir : string){
        this.translate.get(paraTraducir)
            .subscribe(
                value => this.mostrarError(value),
                error => this.translateError(error),
                () => Utilities.log("[consulta-por-autnum.component.ts] - translate.get: Completed")
            );
    }

    mostrarError(errorDescription : string){
        var error : Error = new Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    }

    translateError(error:any){
        Utilities.log("[consulta-por-autnum.component.ts] - translateError | error: " + JSON.stringify(error));
    }

    buscarAutnum(){
        this.router.navigate(['/autnum',this.valorBuscado]);
    }
}