export type QueryParams = Record<string, any>;
export type RequestHeaders = Record<string, string>;

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";

export type RequestOptions = {
  readonly headers?: RequestHeaders;
  readonly body?: any;
  readonly params?: QueryParams;
};

type RequestConfig = RequestOptions & {
  readonly url: string;
  readonly method: Method;
};

const appendQueryParams = (url: string, params: QueryParams = {}) => {
  const urlObj = new URL(url);

  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value);
  });

  return urlObj.toString();
};

const request = async (config: RequestConfig): Promise<any> => {
  const { url, method, headers, body, params } = config;

  const endpoint = appendQueryParams(url, params);

  const fetchOptions: RequestInit = {
    method,
    headers: (headers as Record<string, string>) || {},
  };

  if (body && (method === "POST" || method === "PUT" || method === "DELETE")) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, fetchOptions);

  return response;
};

export const post = async (endpoint: string, options?: RequestOptions): Promise<any> => {
  const resp = await request({
    url: endpoint,
    method: "POST",
    headers: options?.headers,
    body: options?.body,
    params: options?.params,
  });
  return resp.data;
};
