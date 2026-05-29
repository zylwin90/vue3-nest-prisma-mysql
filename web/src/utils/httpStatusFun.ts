import { ElMessageBox } from 'element-plus';
import { router } from '@/router';
import { errorTips } from './utils';

export const httpStatusFun = (status: number) => {
    switch (status) {
        case 400:
            errorTips('请求错误');
            break;
        case 401:
            ElMessageBox.alert('未鉴权', '提示', {
                confirmButtonText: '确认',
                showClose: false,
                callback: () => {
                    router.replace('/login');
                },
            });
            break;
        case 403:
            ElMessageBox.alert('无权限', '提示', {
                confirmButtonText: '确认',
                showClose: false,
                callback: () => {
                    router.replace('/login');
                },
            });
            break;
        case 404:
            errorTips('请求地址不存在');
            break;

        default:
            errorTips('服务器异常');
            break;
    }
};
