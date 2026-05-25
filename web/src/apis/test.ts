import { http } from '@/utils/http';

export default {
    getList: (data?: any) => http.post('/api/test/getList', data),
};
