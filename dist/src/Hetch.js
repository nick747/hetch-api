"use strict";
/**
 * We currently use TSDoc to document the code.
 * TODO: finish documentation. (DOING)
 * TODO: remove 'any' types (SEMI-DONE)
 * TODO: improve project architecture (DOING)
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
const convertResponse_1 = require("./convertResponse");
const types_1 = require("./types");
class Hetch {
    constructor(config = {}) {
        this.defaults = {
            customHeaders: new Headers(),
            timeout: 0,
            maxRetries: 3,
            retryDelay: 1000,
        };
        this.interceptors = {
            request: [],
            response: [],
        };
        this.config = Object.assign(Object.assign({}, this.defaults), config);
    }
    /**
     * Add a request interceptor to be executed before the request is sent.
     * @param interceptor - The interceptor function to be added.
     */
    useRequestInterceptor(interceptor) {
        this.interceptors.request.push(interceptor);
    }
    /**
     * Add a response interceptor to be executed after the response is received.
     * @param interceptor - The interceptor function to be added.
     */
    useResponseInterceptor(interceptor) {
        this.interceptors.response.push(interceptor);
    }
    /**
     * Base request function to manage HTTP requests.
     * @param url - URL to send the request to.
     * @param options - Request's options.
     * @returns Response data.
     */
    request(url, options = {}) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let requestOptions = Object.assign(Object.assign({}, this.config), options);
            for (const interceptor of this.interceptors.request) {
                requestOptions = yield interceptor(requestOptions);
            }
            try {
                let retries = 0;
                const maxRetries = (_a = requestOptions.maxRetries) !== null && _a !== void 0 ? _a : this.defaults.maxRetries;
                const retryDelay = (_b = requestOptions.retryDelay) !== null && _b !== void 0 ? _b : this.defaults.retryDelay;
                while (true) {
                    try {
                        const response = yield fetch(url, requestOptions);
                        let responseData;
                        switch (response.headers.get('content-type')) {
                            case 'application/json':
                                responseData = yield response.json();
                                break;
                            default:
                                responseData = yield response.text();
                        }
                        for (const interceptor of this.interceptors.response) {
                            responseData = yield interceptor(responseData, response);
                        }
                        let formattedResponseData = yield (0, types_1.formatResponse)(responseData);
                        return {
                            data: formattedResponseData,
                            convert: (conversionType) => __awaiter(this, void 0, void 0, function* () {
                                return (0, convertResponse_1.convertResponse)(conversionType, response);
                            }),
                        };
                    }
                    catch (error) {
                        if (retries < maxRetries && error instanceof TypeError) {
                            retries++;
                            yield new Promise((resolve) => setTimeout(resolve, retryDelay));
                            continue;
                        }
                        throw error;
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Perform a GET request.
     * @param url - URL to send the GET request to.
     * @param options - Request's options.
     * @returns Response data.
     */
    get(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(url, Object.assign({ method: "GET" }, options));
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
            return this.request(url, Object.assign({ method: "POST", body: data }, options));
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
            return this.request(url, Object.assign({ method: "PUT", body: data }, options));
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
            return this.request(url, Object.assign({ method: "DELETE" }, options));
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
