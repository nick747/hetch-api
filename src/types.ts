import { Hetch } from './Hetch';

/* --- */
export type Interceptor = {
    (responseData: any): Promise<any> | any;
    (responseData: any, response: Response): Promise<any> | any;
};

/* --- */
export interface RequestConfig extends Omit<RequestInit, 'body'> {
    customHeaders?: Headers | string[][];
    timeout?: number;
    maxRetries?: number; // the maximum number of retries for network errors
    retryDelay?: number; // the delay between each try
    body?: string | object | null;
};

/* --- */
export type ResponseStructure = {
    status?: number,
    working?: string | boolean | null,
    userId?: number,
    id?: number,
    title?: string,
    message?: string,
}

export async function formatResponse(response: Response): Promise<ResponseStructure> {
    const formattedResponse: ResponseStructure = {};
    
    // Populate ResponseStructure
    formattedResponse.status = response.status;
    formattedResponse.working = response.headers.get('working');
    formattedResponse.userId = parseInt(response.headers.get('user-id') || '', 10);
    
    try {
      const json = await response.json();
      formattedResponse.id = json.id;
      formattedResponse.title = json.title;
      formattedResponse.message = json.message;
    } catch (error) {
      console.error('Error parsing response JSON:', error);
    }
  
    return formattedResponse;
  }