import { http } from '@/utils/http';

export default {
    login: (data: any) => http.post('/api/auth/login', data),
    register: (data: any) => http.post('/api/auth/register', data),
};
