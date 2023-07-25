/**
 * We currently use TSDoc to document the code.
 * TODO: finish documentation.
 * TODO: create tsconfig.json file.
 */

export type Interceptor = {
  (responseData: any): Promise<any> | any;
  (responseData: any, response: Response): Promise<any> | any;
};

/**
 * A RequestInit object to set request's body (adds the timeout parameter).
 */
interface RequestConfig extends RequestInit {

  timeout?: number;
};

/**
 * Create a new instance of Hetch.
 */
export class Hetch {

  // default config values
  private defaults: RequestConfig = {
    headers: {},
    timeout: 0,
  };

  private interceptors = {
    request: [] as Interceptor[],
    response: [] as Interceptor[],
  };

  private config: RequestConfig;

  /**
   * 
   */
  public constructor(config: RequestConfig = {}) {
    this.config = { ...this.defaults, ...config };
  };

  useRequestInterceptor(interceptor: Interceptor) {
    this.interceptors.request.push(interceptor);
  };

  // TODO: should these two methods be public?
  useResponseInterceptor(interceptor: Interceptor) {
    this.interceptors.response.push(interceptor);
  };

  // 
  /**
   * Base request function to manage HTTP requests
   * 
   * @param url - Url to send the request to.
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
    };

    try {
      const response = await fetch(url, requestOptions);

      let responseData = await response.text();

      for (const interceptor of this.interceptors.response) {
        responseData = await interceptor(responseData, response);
      };

      if (response.headers.get("content-type")?.includes("application/json")) {
        responseData = JSON.parse(responseData);
      };

      return responseData;
    } catch (error) {
      throw error;
    };
  };

  public async get(url: string, options?: RequestConfig): Promise<any> {
    return this.request(url, { method: "GET", ...options });
  };

  public async post(url: string, data: any, options: RequestConfig): Promise<any> {
    return this.request(url, { method: "POST", body: data, ...options });
  };

  public async put(url: string, data: any, options?: RequestConfig): Promise<any> {
    return this.request(url, { method: "PUT", body: data, ...options });
  };

  public async delete(url: string, options?: RequestInit): Promise<any> {
    return this.request(url, { method: "DELETE", ...options });
  };

  // function for other methods

  /**
   * Function to perform HTTP requests with other methods. 
   * 
   * @param method - Request's method.
   * @param url - Url to send the request to.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async any(
    method: string,
    url: string,
    options: RequestInit = {}
  ): Promise<any> {
    const uppercaseMethod = method.toUpperCase();
    const requestOptions: RequestConfig = {
      ...this.config,
      ...options,
      method: uppercaseMethod,
    };

    return this.request(url, requestOptions);
  };
};