import {AppSettings} from "../app.settings";

export class Utilities {



    public static log(texto : string){
        if(AppSettings.debug){
            console.log(texto);
        }
    }
}