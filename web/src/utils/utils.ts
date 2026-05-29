import { ElMessage } from 'element-plus';

export const errorTips = (message: string) => {
    ElMessage.error(message);
};

export const successTips = (message: string) => {
    ElMessage.success(message);
};

/* 文件地址下载 */
export const locationDownLoad = (url: string) => {
    if (!url) {
        return false;
    }
    const link = document.createElement('a');
    link.href = url;
    link.click();
    document.body.appendChild(link);
};

/**
 * 文件流下载方法
 * @param blob 文件流 Blob 对象
 * @param filename 下载的文件名，如 'export.xlsx'
 */
export function downloadFile(blob: Blob, filename: string): void {
    // 创建一个临时的 URL
    const url = window.URL.createObjectURL(blob);
    // 创建一个 <a> 元素
    const link = document.createElement('a');
    link.href = url;
    link.download = filename; // 设置下载的文件名
    // 触发点击事件
    document.body.appendChild(link);
    link.click();
    // 清理
    document.body.removeChild(link);
    // 释放 URL 对象
    window.URL.revokeObjectURL(url);
}

/**
 * 存储sessionStorage
 */
export const setStore = (name: string, content: any) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
};

/**
 * 获取sessionStorage
 */
export const getStore = (name: string) => {
    if (!name) return '';
    let content = window.sessionStorage.getItem(name);
    if (!content || content === 'undefined') return '';
    if (content.indexOf('{') >= 0 || content.indexOf('[') >= 0) {
        return JSON.parse(content);
    } else {
        return content;
    }
};

/**
 * 删除sessionStorage
 */
export const removeStore = (name: string) => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
};

export const copy = (text: string) => {
    if (!text) return;
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // 避免滚动到底部
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            successTips('复制成功');
        } else {
            errorTips('复制失败');
        }
    } catch (err) {
        throw new Error('复制失败');
    } finally {
        document.body.removeChild(textArea);
    }
};
