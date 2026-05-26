import { RESPONSE_MSG, RESPONSE_CODE } from '@/enums';
import dayjs from 'dayjs';

/**
 * @description: 成功统一返回体
 */
export const resultSuccess = <T = any>(
  data?: T | null,
  msg: string = RESPONSE_MSG.SUCCESS,
  code: number = RESPONSE_CODE.SUCCESS,
): CommonType.Response<T | null> => ({
  data: data ?? null,
  msg,
  code,
  timestamp: dayjs().valueOf(),
});

/**
 * @description: 失败统一返回体
 */
export const resultFail = <T = any>(
  msg: string = RESPONSE_MSG.FAILURE,
  data?: T | null,
  code: number = RESPONSE_CODE.NOSUCCESS,
): CommonType.Response<T | null> => ({
  msg,
  data: data ?? null,
  code,
  timestamp: dayjs().valueOf(),
});
