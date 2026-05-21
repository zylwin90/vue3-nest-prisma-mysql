import { http } from '@/utils/http';

export default {
    login: (data: any) => http.post('/api/user/login', data),
    register: (data: any) => http.post('/api/user/register', data),
    getUserInfo: (data: any) => http.get('/api/user/getUserInfo', data),
};
