"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_settings_1 = require("../app.settings");
var Utilities = (function () {
    function Utilities() {
    }
    Utilities.log = function (texto) {
        if (app_settings_1.AppSettings.debug) {
            console.log(texto);
        }
    };
    return Utilities;
}());
exports.Utilities = Utilities;
//# sourceMappingURL=utilities.js.map