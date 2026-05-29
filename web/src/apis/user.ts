import { http } from '@/utils/http';

export default {
    getList: (data: any) => http.get('/api/user/getList', data),
    del: (id: string) => http.delete(`/api/todo/del/${id}`),
    update: (data: any) => http.patch(`/api/todo/update`, data),
};
