// define Interceptor
type Interceptor = {
    (responseData: any): Promise<any> | any;
    (responseData: any, response: Response): Promise<any> | any;
  };
  
  // extend the RequestConfig type to add the timeout property
  interface RequestConfig extends RequestInit {
    timeout?: number;
  }
  
  class Hetch {
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
  
    constructor(config: RequestConfig = {}) {
      this.config = { ...this.defaults, ...config };
    }
  
    useRequestInterceptor(interceptor: Interceptor) {
      this.interceptors.request.push(interceptor);
    }
  
    useResponseInterceptor(interceptor: Interceptor) {
      this.interceptors.response.push(interceptor);
    }
  
    // base request function to manage HTTP requests
    async request(url: string, options: RequestInit = {}): Promise<any> {
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
  }
  