import { http } from '@/utils/http';

export default {
    getList: (data: any) => http.get('/api/todo/list', data),
    add: (data: any) => http.post('/api/todo/add', data),
    del: (id: string) => http.delete(`/api/todo/del/${id}`),
    put: (data: any) => http.put('/api/todo/edit', data),
    detail: (id: string) => http.get(`/api/todo/detail/${id}`),
    changeStatus: (data: any) => http.patch('/api/todo/changeStatus', data),
};
