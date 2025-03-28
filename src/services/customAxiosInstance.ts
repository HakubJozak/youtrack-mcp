import Axios from 'axios';
import type {AxiosRequestConfig} from 'axios';


const YOUTRACK_MCP_URL = process.env.YOUTRACK_MCP_URL || process.env.YOUTRACK_URL;
const YOUTRACK_MCP_TOKEN = process.env.YOUTRACK_MCP_TOKEN || process.env.YOUTRACK_TOKEN;



export const AXIOS_INSTANCE = Axios.create({
    baseURL: YOUTRACK_MCP_URL,
    headers: {
        'Authorization': `Bearer ${YOUTRACK_MCP_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});


// add a second `options` argument here if you want to pass extra options to each generated query

export const customAxiosInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<T> => {
    const source = Axios.CancelToken.source();

    const promise = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({data}) => data);

    // @ts-ignore
    promise.cancel = () => {
      source.cancel('Query was cancelled');
    };

    return promise as Promise<T>;
};

