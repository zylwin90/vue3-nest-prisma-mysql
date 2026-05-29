import { http } from '@/utils/http';

export default {
    add: (data: any) => http.post('/api/role/add', data),
    edit: (data: any) => http.patch('/api/role/edit', data),
    getList: (data: any) => http.get('/api/role/getList', data),
    detail: (data: any) => http.get('/api/role/detail', data),
    change: (data: any) => http.patch('/api/role/change', data),
};
