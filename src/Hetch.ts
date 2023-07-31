import { RequestConfig, Interceptor, ResponseData } from "./types";

/**
 * Default settings for config in `Hetch` class.
 */
export let ConfigDefaults: RequestConfig = {
  customHeaders: new Headers(),
  timeout: 0,
  maxRetries: 3,
  retryDelay: 1000,
};

export class Hetch {
  private defaults: RequestConfig = ConfigDefaults;
  protected config: RequestConfig;

  protected Interceptors = {
    request: [] as Interceptor[],
    response: [] as Interceptor[],
  };

  /**
   * Constructor to modify default values while using the library
   */
  public constructor(config: RequestConfig = {}) {
    this.config = { ...this.defaults, ...config };
  }

  /**
   * Base request function to manage HTTP requests.
   * @param url - URL to send the request to.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async request(url: string, options: RequestConfig = {}): Promise<ResponseData> {
    let requestOptions: RequestConfig = {
      ...this.config,
      ...options,
    };

    for (const interceptor of this.Interceptors.request) {
      requestOptions = await interceptor(requestOptions);
    }

    try {
      let retries = 0;
      const maxRetries = requestOptions.maxRetries ?? this.defaults.maxRetries;
      const retryDelay =
        requestOptions.retryDelay ?? this.defaults.retryDelay;

      while (true) {
        try {
          const response = await fetch(url, requestOptions as RequestInit);

          let responseData: object | string;

          switch (response.headers.get("content-type")) {
            case "application/json":
              responseData = await response.json();
              break;
            default:
              responseData = await response.text();
          }

          for (const interceptor of this.Interceptors.response) {
            responseData = await interceptor(responseData, response);
          }

          return {
            data: responseData,
          };
        } catch (error) {
          if (retries < maxRetries! && error instanceof TypeError) {
            retries++;
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            continue;
          }
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add a request interceptor to be executed before the request is sent.
   * @param interceptor - The interceptor function to be added.
   */
  public useRequestInterceptor(interceptor: Interceptor) {
    this.Interceptors.request.push(interceptor);
  }

  /**
   * Add a response interceptor to be executed after the response is received.
   * @param interceptor - The interceptor function to be added.
   */
  public useResponseInterceptor(interceptor: Interceptor) {
    this.Interceptors.response.push(interceptor);
  }

  /**
   * Perform a GET request.
   * @param url - URL to send the GET request to.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async get(url: string, options?: RequestConfig): Promise<ResponseData> {
    return this.request(url, { method: "GET", ...options });
  }

  /**
   * Perform a POST request.
   * @param url - URL to send the POST request to.
   * @param data - Data to be sent in the request body.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async post(
    url: string,
    data: any,
    options?: RequestConfig
  ): Promise<ResponseData> {
    return this.request(url, { method: "POST", body: data, ...options });
  }

  /**
   * Perform a PUT request.
   * @param url - URL to send the PUT request to.
   * @param data - Data to be sent in the request body.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async put(
    url: string,
    data: any,
    options?: RequestConfig
  ): Promise<ResponseData> {
    return this.request(url, { method: "PUT", body: data, ...options });
  }

  /**
   * Perform a DELETE request.
   * @param url - URL to send the DELETE request to.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async delete(url: string, options?: RequestConfig): Promise<any> {
    return this.request(url, { method: "DELETE", ...options });
  }

  /**
   * Perform an HTTP request with a custom method.
   * @param method - Request's method.
   * @param url - URL to send the request to.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async any(
    method: string,
    url: string,
    options: RequestConfig = {}
  ): Promise<ResponseData> {
    const uppercaseMethod = method.toUpperCase();
    const requestOptions: RequestConfig = {
      ...this.config,
      ...options,
      method: uppercaseMethod,
    };

    return this.request(url, requestOptions);
  }
}
