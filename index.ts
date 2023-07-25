type Interceptor = (requestOptions: RequestInit) => Promise<RequestInit>; 

interface RequestConfig extends RequestInit {
    timeout?: number,
}

class Hetch {
    private defaults: RequestConfig = {
        headers: {},
        timeout: 0,
    }
}