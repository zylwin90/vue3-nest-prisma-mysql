// http.ts
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { errorTips, getStore } from './utils';
const httpStatus: any = {
    400: '请求错误',
    401: '未鉴权',
    404: '请求地址不存在',
    403: '无权限',
    500: '服务器异常',
};

class HttpClient {
    private instance: AxiosInstance;

    constructor(baseURL?: string) {
        this.instance = axios.create({
            baseURL: baseURL,
            timeout: 1000 * 3,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // 请求拦截器：自动添加token
        this.instance.interceptors.request.use(
            config => {
                const token = getStore('token');
                console.log(token);
                
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        // 响应拦截器：统一处理错误
        this.instance.interceptors.response.use(
            response => {
                const relsut = response.data;

                if (relsut.code == 0) {
                    errorTips(relsut.msg);
                    Promise.resolve(relsut);
                    return;
                }
                return relsut;
            },
            error => {
                errorTips(httpStatus[error.status] || '服务器异常');
                return Promise.reject(error);
            }
        );
    }

    // GET 请求
    get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.get(url, { params, ...config });
    }

    // POST 请求
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.post(url, data, config);
    }

    // PUT 请求（全量更新）
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.put(url, data, config);
    }

    // PATCH 请求（部分更新）
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.patch(url, data, config);
    }

    // DELETE 请求
    delete<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.delete(url, { params, ...config });
    }
}

// 导出单例
export const http = new HttpClient();

// 也可以导出类，让调用方自己实例化
export { HttpClient };
