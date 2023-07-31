export type Interceptor = {
    <T>(responseData: T): Promise<T> | T;
    <T>(responseData: T, response: Response): Promise<T> | T;
};
export interface RequestConfig extends Omit<RequestInit, 'body'> {
    customHeaders?: Headers | string[][];
    timeout?: number;
    maxRetries?: number;
    retryDelay?: number;
    body?: string | object | null;
}
export type ResponseStructure = {
    status?: number;
    working?: string | boolean | null;
    userId?: number;
    id?: number;
    title?: string;
    message?: string;
    jsonData?: object;
};
export type ResponseData = {
    data: object | string;
};
