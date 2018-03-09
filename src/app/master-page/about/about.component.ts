/**
 * Created by Bruno on 20/06/2017.
 */

import { Component }        from '@angular/core';
import { Router }           from '@angular/router';
import { TranslateService } from "ng2-translate";
import { Utilities }        from "../../shared/utilities";

@Component({
    selector: 'about',
    templateUrl: 'about.component.html',
    styleUrls:  ['about.css']
})

export class AboutComponent {

    constructor(private router: Router, private translate: TranslateService)  {
        this.cargarLenguaje();
    }

    cargarLenguaje(){
        Utilities.log("[about.component.ts] - cargarLenguaje: Start");

        this.translate.addLangs(['es', 'en', 'pt']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
        if(localStorage.getItem('lenguaje') != null) {
            this.translate.use(localStorage.getItem('lenguaje'));
        }
        else{
            this.translate.use(this.translate.getDefaultLang());
        }

        Utilities.log("[about.component.ts] - cargarLenguaje: Finish");
    }
}