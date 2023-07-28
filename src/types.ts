import { Hetch } from './Hetch';

export type Interceptor = {
    (responseData: any): Promise<any> | any;
    (responseData: any, response: Response): Promise<any> | any;
};

export interface RequestConfig extends Omit<RequestInit, 'body'> {
    customHeaders?: Headers | string[][];
    timeout?: number;
    maxRetries?: number; // the maximum number of retries for network errors
    retryDelay?: number; // the delay between each try
    body?: string | object | null;
  }