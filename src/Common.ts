import { RequestConfig } from './types';

/**
 * Default settings for config in `Hetch` and `Base` classes.
 */
export let ConfigDefaults: RequestConfig = {
    customHeaders: new Headers(),
    timeout: 0,
    maxRetries: 3,
    retryDelay: 1000
};