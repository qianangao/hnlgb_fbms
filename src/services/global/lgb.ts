import request from '@/utils/request';

/**
 * 获取老干部列表
 * @param {*} params
 */
export async function getLgbList(params) {
  return request('/users', {
    method: 'GET',
    params,
  });
}

/**
 * 获取全系统老干部列表
 * @param {*} params
 */
export async function getSystemLgbList(params) {
  return request('/party/users', {
    method: 'GET',
    params,
  });
}
