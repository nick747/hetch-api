/**
 * We currently use TSDoc to document the code.
 * TODO: finish documentation. (WIP)
 * TODO: remove 'any' types (SEMI-DONE)
 * TODO: improve project architecture (DONE?)
 */

import { ResponseConversionType, ConvertResponse } from './ConvertResponse';
import { Interceptor, RequestConfig, ResponseStructure } from './Types';
import { formatResponse, ConfigDefaults } from './Common'
import { Base } from './Base';

/**
 * Main Hetch class.
 */
export class Hetch extends Base {

  public constructor(config: RequestConfig = {}) {
    super(config)
  }

  
  protected config = super.config
  protected Interceptors = super.Interceptors

  /**
   * Perform a GET request.
   * @param url - URL to send the GET request to.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async get(url: string, options?: RequestConfig): Promise<any> {
    return this.request(url, { method: 'GET', ...options });
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
  ): Promise<any> {
    return this.request(url, { method: 'POST', body: data, ...options });
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
  ): Promise<any> {
    return this.request(url, { method: 'PUT', body: data, ...options });
  }

  /**
   * Perform a DELETE request.
   * @param url - URL to send the DELETE request to.
   * @param options - Request's options.
   * @returns Response data.
   */
  public async delete(url: string, options?: RequestConfig): Promise<any> {
    return this.request(url, { method: 'DELETE', ...options });
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
  ): Promise<any> {
    const uppercaseMethod = method.toUpperCase();
    const requestOptions: RequestConfig = {
      ...this.config,
      ...options,
      method: uppercaseMethod,
    };

    return this.request(url, requestOptions);
  }
}
