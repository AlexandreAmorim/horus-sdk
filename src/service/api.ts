import axios, {
    AxiosError, AxiosInstance, AxiosRequestConfig as IAxiosRequestConfig
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

api.interceptors.request.use(
    async (config) => {
        const userStorgeKey = await '@horus-desktop:user';
        const storagedUser = await localStorage.getItem(userStorgeKey);
        const user = JSON.parse(storagedUser)
        if (user) {
            config.headers.Authorization = `Bearer ${user?.token}`;
            return config;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error: AxiosError) => {
        if (!!error.isAxiosError && !error.response) {
            console.log({
                status: 'error',
                title: 'Erro na conexão',
                description:
                    'Você está sem acesso à internet ou o servidor está off-line.',
                duration: 5000,
                isClosable: true,
            })
            return true
        }

        if (error.response.status === 401) {
            console.log({
                title: 'Sessão expirada.',
                description:
                    'Sua sessão expirou, ou você foi desconectado. Faça login outra vez.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })

            return false
        }
        if (error.response.status === 403) {
            console.log({
                title: 'Sem permissão.',
                description:
                    'Você tentou acessar um recurso o qual não possui permissão.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }

        if (error.response.status === 429) {
            console.log({
                status: 'error',
                title: 'Atenção',
                description:
                    'Você está fazendo muitas requisições para o servidor.',
                duration: 5000,
                isClosable: true,
            })
        }

        return Promise.reject(error)
    }
)

export default api;