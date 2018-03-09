import { Component }        from '@angular/core';
import { Router }           from '@angular/router';
import { Utilities }        from "../shared/utilities";
import { TranslateService } from "ng2-translate";

@Component({
    selector: 'master-page',
    templateUrl: 'master-page.component.html',
    styleUrls:  ['master-page.css']
})

export class MasterPageComponent {

    idiomaActual : string;

    constructor(private router: Router, private translate: TranslateService)  {
        this.cargarLenguaje();
    }

    cargarLenguaje(){
        Utilities.log("[master-page.component.ts] - cargarLenguaje: Start");

        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');

        this.idiomaActual = 'es';
        if(localStorage.getItem('lenguaje') != null) {
            var idioma : string = localStorage.getItem('lenguaje');
            this.translate.use(idioma);
            this.idiomaActual = idioma;
        }

        Utilities.log("[master-page.component.ts] - cargarLenguaje: Finish");
    }

    cambiarLenguaje(lenguaje : string){
        Utilities.log("[master-page.component.ts] - cambiarLenguaje: Start");

        localStorage.setItem("lenguaje",lenguaje);
        this.translate.use(lenguaje);
        this.idiomaActual = lenguaje;

        Utilities.log("[master-page.component.ts] - cambiarLenguaje: Finish");
    }
}