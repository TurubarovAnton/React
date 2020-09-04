"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
var axios_1 = require("axios");
exports.login = function (login, password) {
    var data = new FormData();
    data.append('login', login);
    data.append('password', password);
    return axios_1.default.post('/api/login', data);
};
//# sourceMappingURL=api.js.map