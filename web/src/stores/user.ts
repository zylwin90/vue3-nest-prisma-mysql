import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { getStore, removeStore, setStore } from '@/utils/utils';

export const useUserStore = defineStore('user', () => {
    const token = ref(getStore('token'));
    const setToken = (tokenVal: string) => {
        token.value = tokenVal;
        setStore('token', tokenVal);
    };
    const userInfo = ref(getStore('userInfo'));
    const setUserInfo = (info: any) => {
        userInfo.value = info;
        setStore('userInfo', info);
    };

    const resets = () => {
        token.value = null
        userInfo.value = null
        removeStore('token')
        removeStore('userInfo')
    }

    return { token, setToken, userInfo, setUserInfo,resets };
});
