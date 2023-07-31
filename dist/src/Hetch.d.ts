import { RequestConfig, Interceptor, ResponseData } from "./types";
/**
 * Default settings for config in `Hetch` class.
 */
export declare let ConfigDefaults: RequestConfig;
export declare class Hetch {
    private defaults;
    protected config: RequestConfig;
    protected Interceptors: {
        request: Interceptor[];
        response: Interceptor[];
    };
    /**
     * Constructor to modify default values while using the library
     */
    constructor(config?: RequestConfig);
    /**
     * Base request function to manage HTTP requests.
     * @param url - URL to send the request to.
     * @param options - Request's options.
     * @returns Response data.
     */
    request(url: string, options?: RequestConfig): Promise<ResponseData>;
    /**
     * Add a request interceptor to be executed before the request is sent.
     * @param interceptor - The interceptor function to be added.
     */
    useRequestInterceptor(interceptor: Interceptor): void;
    /**
     * Add a response interceptor to be executed after the response is received.
     * @param interceptor - The interceptor function to be added.
     */
    useResponseInterceptor(interceptor: Interceptor): void;
    /**
     * Perform a GET request.
     * @param url - URL to send the GET request to.
     * @param options - Request's options.
     * @returns Response data.
     */
    get(url: string, options?: RequestConfig): Promise<ResponseData>;
    /**
     * Perform a POST request.
     * @param url - URL to send the POST request to.
     * @param data - Data to be sent in the request body.
     * @param options - Request's options.
     * @returns Response data.
     */
    post(url: string, data: any, options?: RequestConfig): Promise<ResponseData>;
    /**
     * Perform a PUT request.
     * @param url - URL to send the PUT request to.
     * @param data - Data to be sent in the request body.
     * @param options - Request's options.
     * @returns Response data.
     */
    put(url: string, data: any, options?: RequestConfig): Promise<ResponseData>;
    /**
     * Perform a DELETE request.
     * @param url - URL to send the DELETE request to.
     * @param options - Request's options.
     * @returns Response data.
     */
    delete(url: string, options?: RequestConfig): Promise<any>;
    /**
     * Perform an HTTP request with a custom method.
     * @param method - Request's method.
     * @param url - URL to send the request to.
     * @param options - Request's options.
     * @returns Response data.
     */
    any(method: string, url: string, options?: RequestConfig): Promise<ResponseData>;
}
