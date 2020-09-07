import request from '@/utils/request';

/**
 * 编辑老干部离世信息
 * @param {*} params
 */
export async function updateLgb(params) {
  return request(`/user/death/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 老干部恢复在世
 * @param {*} params
 */
export async function deleteLgb(params) {
  return request(`/user/death`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 获取老干部离世列表
 * @param {*} params
 */
export async function getLgbList(params) {
  return request('/user/death', {
    method: 'GET',
    params,
  });
}
