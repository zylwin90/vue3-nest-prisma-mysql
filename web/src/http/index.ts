import axios from 'axios';
import type { AxiosResponse } from 'axios';

export const apiPost = async (url: string, data: any) => {
    try {
        const res: AxiosResponse = await axios.post(url, data);
        const { code, data: postData } = res.data;
        if (!code) return;
        return postData;
    } catch (error) {
        console.log(error);
    }
};

export const apiGet = async (url: string) => {
    try {
        const res: AxiosResponse = await axios.get(url);
        const { code, data: postData } = res.data;
        if (!code) return;
        return postData;
    } catch (error) {
        console.log(error);
    }
};

export const apiPatch = async (url: string, data: any) => {
    try {
        const res: AxiosResponse = await axios.patch(url, data);
        const { code, data: postData } = res.data;
        if (!code) return;
        return postData;
    } catch (error) {
        console.log(error);
    }
};

export const apiDel = async (url: string) => {
    try {
        const res: AxiosResponse = await axios.delete(url);
        const { code, data: postData } = res.data;
        if (!code) return;
        return postData;
    } catch (error) {
        console.log(error);
    }
};
