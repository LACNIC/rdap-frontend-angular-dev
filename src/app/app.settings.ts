export class AppSettings {


    public static debug: boolean = true;
    public static widgetSectionHasRoundedBorder = true;
    
    public static SERVICE_IP_API_URL: string = "https://rdap.lacnic.net/rdap/info/myip";
    public static SERVICE_AUTNUM_API_URL: string = "https://rdap.lacnic.net/rdap/autnum/";
    public static SERVICE_ENTITY_API_URL: string = "https://rdap.lacnic.net/rdap/entity/";
    public static SERVICE_ENTITIES_API_URL: string = "https://rdap.lacnic.net/rdap/entities?fn=";
    public static SERVICE_IP_EXT_API_URL: string = "https://rdap.lacnic.net/rdap/ip/";
    public static SERVICE_NAMESERVER_API_URL: string = "https://rdap.lacnic.net/rdap/nameserver/";
    public static SERVICE_DOMAIN_API_URL: string = "https://rdap.lacnic.net/rdap/domain/";

    public static SERVICE_SEARCH_API_URL: string = "https://rdap.lacnic.net/rdap/";

    public static RDAP_WEB: string = "https://rdap-web.lacnic.net/rdap/";
}
