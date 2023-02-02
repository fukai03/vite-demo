import axios from 'axios';

const baseURL = 'http://localhost:3000/'

// 创建请求实例
const instance = axios.create({
    baseURL,
    timeout: 3000,
    withCredentials: false, // 表示跨域请求时是否需要使用凭证
})

// 请求拦截
instance.interceptors.request.use(
    config => {
        // 请求发出前的操作，如header中添加token
        /**
         * const token = getToken()
         * if(token) {
         *  config.headers.token = token
         * }
         */
        return config
    },
    err => {
        return Promise.reject(err);
    }
)

// 响应拦截
instance.interceptors.response.use(
    response => {
        // 对相应进行处理
        return response
    },
    err => {
        const { response } = err;
        if (response && response.data) {
            return Promise.reject(err);
        }
        const { message } = err;
        console.error(message);
        return Promise.reject(err);
    }
)