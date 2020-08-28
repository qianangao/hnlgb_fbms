import request from '@/utils/request';

/**
 * 编辑老干部信息
 * @param {*} params
 */
export async function updateLgb(params) {
  return request(`/users/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 新增老干部
 * @param {*} params
 */
export async function addLgb(params) {
  return request(`/users`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除老干部
 * @param {*} params
 */
export async function deleteLgb(params) {
  return request(`/users`, {
    method: 'DELETE',
    data: params,
  });
}

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
 * 获取老干部详情
 * @param {*} params
 */
export async function getLgbDetail(params) {
  return request(`/users/${params.id}`, {
    method: 'GET',
    params,
  });
}
