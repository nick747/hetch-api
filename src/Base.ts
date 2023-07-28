import { RequestConfig, ResponseStructure, Interceptor } from "./types";
import { ConfigDefaults, formatResponse } from './Common';
import { ConvertResponse, ResponseConversionType } from "./convertResponse";

export class Base {
  private defaults: RequestConfig = ConfigDefaults

  protected Interceptors = {
    request: [] as Interceptor[],
    response: [] as Interceptor[]
  };

  protected config: RequestConfig;

  public constructor(config: RequestConfig = {}) {
    this.config = { ...this.defaults, ...config };
  }

  /**
   * Base request function to manage HTTP requests.
   * @param url - URL to send the request to.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async request(url: string, options: RequestConfig = {}): Promise<any> {
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
      const retryDelay = requestOptions.retryDelay ?? this.defaults.retryDelay;

      while (true) {
        try {
          const response = await fetch(url, requestOptions as RequestInit);

          let responseData: any;

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

          let formattedResponseData: ResponseStructure = await formatResponse(
            responseData
          );
          return {
            data: formattedResponseData,
            convert: async (
              conversionType: ResponseConversionType
            ): Promise<any> => {
              return ConvertResponse(conversionType, response);
            },
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
}