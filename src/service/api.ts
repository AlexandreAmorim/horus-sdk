import axios, {
    AxiosInstance,
    AxiosError,
    AxiosRequestConfig as IAxiosRequestConfig,
} from 'axios';

export type AxiosRequestConfig = IAxiosRequestConfig;

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        accessControlAllowOrigin: '*',
        accessControlAllowHeader: 'Origin, X-Requested-With, Content-Type, Accept',
    },
    timeout: 200000,
});

export const isNetworkError = (err: AxiosError): boolean => !!err.isAxiosError && !err.response;

api.defaults.headers.Accept = 'application/json';

export default api;