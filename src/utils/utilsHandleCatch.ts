type ResponseCatchType = {
  config: {
    adapter: string[];
    baseURL: string;
    data: undefined;
    env: {
      Blob: (options?: any) => any;
      FormData: (data?: any) => any;
    };
    headers: object;
    maxBodyLength: number;
    maxContentLength: number;
    method: string;
    timeout: number;
    transformRequest: [(data: any, headers: any) => any];
    transformResponse: [(data: any) => any];
    transitional: {
      clarifyTimeoutError: false;
      forcedJSONParsing: true;
      silentJSONParsing: true;
    };
    url: string;
    validateStatus: (status: number) => boolean;
    xsrfCookieName: string;
    xsrfHeaderName: string;
  };
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
  headers: {
    'access-control-allow-origin': string;
    'content-length': string;
    'content-type': string;
    date: string;
    etag: string;
    server: string;
    'x-powered-by': string;
  };
  request: {
    DONE: number;
    HEADERS_RECEIVED: number;
    LOADING: number;
    OPENED: number;
    UNSENT: number;
    _aborted: boolean;
    _cachedResponse: undefined;
    _hasError: boolean;
    _headers: {
      accept: string;
      authorization: string;
    };
    _incrementalEvents: false;
    _lowerCaseResponseHeaders: {
      'access-control-allow-origin': string;
      'content-length': string;
      'content-type': string;
      date: string;
      etag: string;
      server: string;
      'x-powered-by': string;
    };
    _method: string;
    _perfKey: string;
    _performanceLogger: {
      _closed: boolean;
      _extras: object;
      _isLoggingForWebPerformance: false;
      _pointExtras: object;
      _points: object;
      _timespans: object;
    };
    _requestId: null;
    _response: string;
    _responseType: string;
    _sent: true;
    _subscriptions: any[];
    _timedOut: false;
    _trackingName: string;
    _url: string;
    readyState: number;
    responseHeaders: {
      'access-control-allow-origin': string;
      'content-length': string;
      'content-type': string;
      date: string;
      etag: string;
      server: string;
      'x-powered-by': string;
    };
    responseURL: string;
    status: number;
    timeout: number;
    upload: {};
    withCredentials: true;
  };
  status: number;
  statusText: undefined;
};

export const catchErrorHandler = (error: ResponseCatchType) => {

}