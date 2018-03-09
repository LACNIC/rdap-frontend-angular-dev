//const json = require('../urls.txt');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSettings = (function () {
    function AppSettings() {
    }
    return AppSettings;
}());
AppSettings.debug = true;
//private static SERVICE_HOSTNAME: string = "http://rdap-backend-test.us-east-1.elasticbeanstalk.com";
//private static SERVICE_BASE_PATH: string = "/api";
// public static SERVICE_API_URL: string = AppSettings.SERVICE_HOSTNAME + AppSettings.SERVICE_BASE_PATH;
AppSettings.SERVICE_IP_API_URL = "//freegeoip.net/json/";
exports.AppSettings = AppSettings;
//# sourceMappingURL=app.settings.js.map