import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType,} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Utilities} from '../utilities';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AppSettings} from "../../app.settings";
import {Data} from '@angular/router';

@Injectable()
export class DataService {
    contentHeadersUrlEncoded: Headers;
    private headers = new Headers({'Accept': 'text/html,application/xhtml+xml,application/xml, application/json'});
    private options = new RequestOptions({responseType: ResponseContentType.Json, headers:this.headers});



    constructor(private http: Http) {

    }


    public getBuscarMiIP() {
        Utilities.log("[data.service.ts] - getBuscarIP: Start");

        var url: string = AppSettings.SERVICE_IP_API_URL;
        Utilities.log("[data.service.ts] - getBuscarMiIP | url: " + url);
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getServerURL() {
        Utilities.log("[data.service.ts] - getBuscarIP: Start");

       /** this.http.get('src/urls.json').subscribe(data => {
            // Read the result field from the JSON response.
            return data['results'];


        });*/


        return this.http.get('/src/urls.json', this.options)
           // The Observable returned by get() is of type Observable<string>
           // because a text response was specified. There's no need to pass
           // a <string> type parameter to get().
           .map((data :Data) => data.json());



    }




    public getBuscarIP(ipBuscada: string) {
        Utilities.log("[data.service.ts] - getBuscarIP: Start");

        var url: string = "https://rdap.lacnic.net/rdap/ip/" + ipBuscada;
        Utilities.log("[data.service.ts] - getBuscarIP | url: " + url);
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getBuscarAutnum(autnumBuscado: string) {
        Utilities.log("[data.service.ts] - getBuscarAutnum: Start");

        var url: string = "https://rdap.lacnic.net/rdapt/autnum/" + autnumBuscado;
        Utilities.log("[data.service.ts] - getBuscarAutnum | url: " + url);
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getBuscarEntity(entityBuscada: string) {
        Utilities.log("[data.service.ts] - getBuscarEntity: Start");

        var url: string = "https://rdap.lacnic.net/rdap/entity/" + entityBuscada;
        Utilities.log("[data.service.ts] - getBuscarEntity | url: " + url);
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getBuscarEntities(nombreBuscado: string) {
        Utilities.log("[data.service.ts] - getBuscarEntities: Start");

        var url: string = "https://rdap.lacnic.net/rdap/entities?fn=" + nombreBuscado + "*";
        Utilities.log("[data.service.ts] - getBuscarEntities | url: " + url);
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**public getBuscarASNs(pais:string){
        Utilities.log("[data.service.ts] - getBuscarASN: Start");
        var url :string = AppSettings.SERVICE_API_URL + "/asns";
        if(pais != ""){
            url += "/" + pais;
        }
        Utilities.log("[data.service.ts] - getBuscarASN | url: " + url);
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }*/

    public getCargarPaisesASNs() {
        Utilities.log("[data.service.ts] - getCargarPaisesASNs: Start");
        var url = "http://rdap-backend-test.us-east-1.elasticbeanstalk.com/api/paises";
        Utilities.log("[data.service.ts] - getCargarPaisesASNs | url: " + url);
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {

        if(error.json().errorCode==404){
            return Observable.throw("404");
        }else{
            return Observable.throw(error.json().error || "Server Error");
        }

    }
}