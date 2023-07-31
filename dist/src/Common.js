"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigDefaults = void 0;
/**
 * Default settings for config in `Hetch` and `Base` classes.
 */
exports.ConfigDefaults = {
    customHeaders: new Headers(),
    timeout: 0,
    maxRetries: 3,
    retryDelay: 1000
};
