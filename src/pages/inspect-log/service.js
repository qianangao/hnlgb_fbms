import request from '@/utils/request';

/**
 * 巡检日志
 * @param {*} params
 */
export async function getInspectLog(params) {
  return request('/log/list', {
    method: 'GET',
    params,
  });
}
