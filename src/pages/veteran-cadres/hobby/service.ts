import request from '@/utils/request';

/**
 * 获取老干部兴趣爱好列表
 * @param {*} params
 */
export async function getHobbyList(params) {
  return request('/hobby', {
    method: 'GET',
    params,
  });
}
