/**
 * Created by Bruno on 20/06/2017.
 */
import { Component }        from '@angular/core';
import { Router }           from '@angular/router';
import { TranslateService } from "ng2-translate";
import { Utilities }        from "../../shared/utilities";
import { Mensaje }          from "../../shared/mensaje";
import { Exito }            from "../../shared/exito";
import { Error }            from "../../shared/error";

@Component({
    selector: 'consulta-por-entity',
    templateUrl: 'consulta-por-entity.component.html',
    styleUrls:  ['consulta-por-entity.css']
})

export class ConsultaPorEntityComponent {

    valorBuscado : string;
    mensajes : Mensaje = new Mensaje();

    constructor(private router: Router, private translate: TranslateService)  {
        this.cargarLenguaje();
    }

    cargarLenguaje(){
        Utilities.log("[consulta-por-entity.component.ts] - cargarLenguaje: Start");

        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if(localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else{
            this.translate.use(this.translate.getDefaultLang());
        }

        Utilities.log("[consulta-por-entity.component.ts] - cargarLenguaje: Finish");
    }

    limpiarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    buscar(){
        Utilities.log("[consulta-por-entity.component.ts] - buscar: Start");

        this.limpiarMensajes();
        this.validarDatoBuscado();

        Utilities.log("[consulta-por-entity.component.ts] - buscar: Finish");
    }

    validarDatoBuscado(){
        Utilities.log("[consulta-por-entity.component.ts] - validarDatoBuscado: Start");

        if(this.valorBuscado == null || this.valorBuscado == ""){
            this.traducirError("CONSULTAPORENTITY.Errores.valorBuscadoVacio");
        }
        else{
            this.buscarEntities();
        }

        Utilities.log("[consulta-por-entity.component.ts] - validarDatoBuscado: Finish");
    }

    traducirError(paraTraducir : string){
        this.translate.get(paraTraducir)
            .subscribe(
                value => this.mostrarError(value),
                error => this.translateError(error),
                () => Utilities.log("[consulta-por-entity.component.ts] - translate.get: Completed")
            );
    }

    mostrarError(errorDescription : string){
        var error : Error = new Error();
        error.Description = errorDescription;
        this.mensajes.Errores.push(error);
    }

    translateError(error:any){
        Utilities.log("[consulta-por-entity.component.ts] - translateError | error: " + JSON.stringify(error));
    }

    buscarEntities(){
        this.router.navigate(['/entity',this.valorBuscado]);
    }
}