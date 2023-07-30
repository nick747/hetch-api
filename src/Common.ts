import { RequestConfig, ResponseStructure } from './types';

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
  try {
    const json = await response.json();
    formattedResponse.id = json.id;
    formattedResponse.title = json.title;
    formattedResponse.message = json.message;
    formattedResponse.jsonData = json;
  } catch (error) {
    console.error('Error parsing response JSON:', error);
  }

  return formattedResponse;
}