"use strict";
/**
 * We currently use TSDoc to document the code.
 * TODO: finish documentation. (WIP)
 * TODO: remove 'any' types (SEMI-DONE)
 * TODO: improve project architecture (DONE?)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hetch = void 0;
const Base_1 = require("./Base");
/**
 * Main Hetch class.
 */
class Hetch extends Base_1.Base {
    constructor(config = {}) {
        super(config);
        this.config = super.config;
        this.Interceptors = super.Interceptors;
    }
    /**
     * Perform a GET request.
     * @param url - URL to send the GET request to.
     * @param options - Request's options.
     * @returns Response data.
     */
    get(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(url, Object.assign({ method: 'GET' }, options));
        });
    }
    /**
     * Perform a POST request.
     * @param url - URL to send the POST request to.
     * @param data - Data to be sent in the request body.
     * @param options - Request's options.
     * @returns Response data.
     */
    post(url, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(url, Object.assign({ method: 'POST', body: data }, options));
        });
    }
    /**
     * Perform a PUT request.
     * @param url - URL to send the PUT request to.
     * @param data - Data to be sent in the request body.
     * @param options - Request's options.
     * @returns Response data.
     */
    put(url, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(url, Object.assign({ method: 'PUT', body: data }, options));
        });
    }
    /**
     * Perform a DELETE request.
     * @param url - URL to send the DELETE request to.
     * @param options - Request's options.
     * @returns Response data.
     */
    delete(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(url, Object.assign({ method: 'DELETE' }, options));
        });
    }
    /**
     * Perform an HTTP request with a custom method.
     * @param method - Request's method.
     * @param url - URL to send the request to.
     * @param options - Request's options.
     * @returns Response data.
     */
    any(method, url, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const uppercaseMethod = method.toUpperCase();
            const requestOptions = Object.assign(Object.assign(Object.assign({}, this.config), options), { method: uppercaseMethod });
            return this.request(url, requestOptions);
        });
    }
}
exports.Hetch = Hetch;
