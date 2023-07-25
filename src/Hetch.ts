/**
 * We currently use TSDoc to document the code.
 * TODO: finish interceptors
 * TODO: add response file conversion
 * TODO: error management
 * TODO: headers
 * TODO: improve timeout
 * TODO: retry function
 * TODO: finish documentation.
 * TODO: create tsconfig.json file.
 */

export type Interceptor = {
  (responseData: any): Promise<any> | any;
  (responseData: any, response: Response): Promise<any> | any;
};

interface RequestConfig extends RequestInit {
  timeout?: number;
};

export class Hetch {
  private defaults: RequestConfig = {
    headers: {},
    timeout: 0,
  };

  private interceptors = {
    request: [] as Interceptor[],
    response: [] as Interceptor[],
  };

  private config: RequestConfig;

  public constructor(config: RequestConfig = {}) {
    this.config = { ...this.defaults, ...config };
  }

  /**
   * Add a request interceptor to be executed before the request is sent.
   * @param interceptor - The interceptor function to be added.
   */
  public useRequestInterceptor(interceptor: Interceptor) {
    this.interceptors.request.push(interceptor);
  }

  /**
   * Add a response interceptor to be executed after the response is received.
   * @param interceptor - The interceptor function to be added.
   */
  public useResponseInterceptor(interceptor: Interceptor) {
    this.interceptors.response.push(interceptor);
  }

  /**
   * Base request function to manage HTTP requests.
   * @param url - URL to send the request to.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async request(url: string, options: RequestInit = {}): Promise<any> {
    let requestOptions: RequestInit = {
      ...this.config,
      ...options,
    };

    for (const interceptor of this.interceptors.request) {
      requestOptions = await interceptor(requestOptions);
    }

    try {
      const response = await fetch(url, requestOptions);
      let responseData = await response.text();

      for (const interceptor of this.interceptors.response) {
        responseData = await interceptor(responseData, response);
      }

      if (response.headers.get("content-type")?.includes("application/json")) {
        responseData = JSON.parse(responseData);
      }

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Perform a GET request.
   * @param url - URL to send the GET request to.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async get(url: string, options?: RequestConfig): Promise<any> {
    return this.request(url, { method: "GET", ...options });
  }

  /**
   * Perform a POST request.
   * @param url - URL to send the POST request to.
   * @param data - Data to be sent in the request body.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async post(url: string, data: any, options?: RequestConfig): Promise<any> {
    return this.request(url, { method: "POST", body: data, ...options });
  }

  /**
   * Perform a PUT request.
   * @param url - URL to send the PUT request to.
   * @param data - Data to be sent in the request body.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async put(url: string, data: any, options?: RequestConfig): Promise<any> {
    return this.request(url, { method: "PUT", body: data, ...options });
  }

  /**
   * Perform a DELETE request.
   * @param url - URL to send the DELETE request to.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async delete(url: string, options?: RequestInit): Promise<any> {
    return this.request(url, { method: "DELETE", ...options });
  }

  /**
   * Perform an HTTP request with a custom method.
   * @param method - Request's method.
   * @param url - URL to send the request to.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async any(method: string, url: string, options: RequestInit = {}): Promise<any> {
    const uppercaseMethod = method.toUpperCase();
    const requestOptions: RequestConfig = {
      ...this.config,
      ...options,
      method: uppercaseMethod,
    };

    return this.request(url, requestOptions);
  }
};
