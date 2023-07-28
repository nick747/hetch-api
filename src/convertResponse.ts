export type ResponseConversionType = 'JSON' | 'TEXT' | 'ARRAYBUFFER' | 'BLOB' | 'FORMDATA';

/**
 * Converts the response to a type of file
 * @param conversionType - The type to convert to
 * @param response - The response to convert
 */
export async function convertResponse(conversionType: ResponseConversionType, response: Response): Promise<any> {
  switch (conversionType) {
    case 'JSON':
      return response.json();
    case 'TEXT':
      return response.text();
    case 'ARRAYBUFFER':
      return response.arrayBuffer();
    case 'BLOB':
      return response.blob();
    case 'FORMDATA':
      return response.formData();
    default:
      throw new Error('Invalid conversion type.');
  }
}