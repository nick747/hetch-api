import { RequestConfig, ResponseStructure } from './Types';

/**
 * Default settings for config in `Hetch` and `Base` classes.
 */
export let ConfigDefaults: RequestConfig = {
    customHeaders: new Headers(),
    timeout: 0,
    maxRetries: 3,
    retryDelay: 1000
};

/**
 * 
 * @param response 
 * @returns 
 */
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