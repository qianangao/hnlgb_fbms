import request from '@/utils/request';

/**
 * 人员-列表
 * @param {*} params
 */
export async function pointsList(params) {
  return request('/users/integral', {
    method: 'GET',
    params,
  });
}
/**
 * 查询积分记录
 * @param {*} params
 */
export async function pointsRecords(params) {
  return request(`/users/integral/${params.userId}`, {
    method: 'GET',
    params,
  });
}

/**
 * 添加积分
 * @param {*} params
 */
export async function addPoints(params) {
  return request(`/users/integral`, {
    method: 'POST',
    data: params,
  });
}
