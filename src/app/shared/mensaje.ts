/**
 * Created by Bruno on 13/06/2017.
 */
import { Error } from "./error";
import { Exito } from "./exito";
import { Info } from "./info";

export class Mensaje {
    Errores : Error [] = [];
    Exitos : Exito [] = [];
    Informaciones : Info [] = [];
}
