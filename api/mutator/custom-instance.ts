/**
 * Custom Fetch instance with YouTrack authentication
 */

export type ErrorType<Error> = Error & { status: number };

// This is a generic fetch client setup for YouTrack API
export const customInstance = async <T>({
  url,
  method,
  params,
  data,
  headers,
  signal,
}: {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  params?: Record<string, string | number | boolean | undefined>;
  data?: unknown;
  headers?: HeadersInit;
  signal?: AbortSignal;
}): Promise<T> => {
  // Get base URL and token from environment variables
  const baseUrl = process.env.YOUTRACK_MCP_URL || process.env.YOUTRACK_URL;
  const token = process.env.YOUTRACK_MCP_TOKEN || process.env.YOUTRACK_TOKEN;

  if (!baseUrl) {
    throw new Error('YouTrack API URL is not defined. Set YOUTRACK_MCP_URL environment variable.');
  }

  if (!token) {
    throw new Error('YouTrack API token is not defined. Set YOUTRACK_MCP_TOKEN environment variable.');
  }

  // Build the full URL with parameters
  const queryParams = params
    ? `?${Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&')}`
    : '';

  const fullUrl = `${baseUrl}${url}${queryParams}`;

  // Set up headers with authentication
  const requestHeaders = new Headers(headers);
  requestHeaders.set('Authorization', `Bearer ${token}`);
  
  if (method !== 'get' && data) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  // Make the request
  const response = await fetch(fullUrl, {
    method: method.toUpperCase(),
    headers: requestHeaders,
    body: data ? JSON.stringify(data) : undefined,
    signal,
  });

  // Handle errors
  if (!response.ok) {
    let errorDetails: string;
    try {
      const errorBody = await response.text();
      try {
        const parsedError = JSON.parse(errorBody);
        errorDetails = JSON.stringify(parsedError, null, 2);
      } catch (e) {
        errorDetails = errorBody;
      }
    } catch (e) {
      errorDetails = 'Could not parse error response';
    }

    const error = new Error(
      `YouTrack API error: ${response.status} ${response.statusText}\n` +
      `URL: ${fullUrl}\n` + 
      `Method: ${method.toUpperCase()}\n` +
      `Response: ${errorDetails}`
    ) as ErrorType<Error>;
    
    error.status = response.status;
    throw error;
  }

  // Return the response
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  
  return await response.text() as unknown as T;
};