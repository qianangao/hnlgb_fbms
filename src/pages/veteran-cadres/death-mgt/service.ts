import request from '@/utils/request';

/**
 * 编辑老干部离世信息
 * @param {*} params
 */
export async function updateLgb(params) {
  return request(`/users/death/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 老干部恢复在世
 * @param {*} params
 */
export async function deleteLgb(params) {
  return request(`/users/death`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 获取老干部遗属信息
 * @param {*} params
 */
export async function getSpouseInfo(params) {
  return request(`/users/survivior/${params.userId}`, {
    method: 'GET',
    params,
  });
}

/**
 * 发起追思缅怀活动
 * @param {*} params
 */
export async function initReminiscence(params) {
  return request(`/reminiscence`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取老干部离世列表
 * @param {*} params
 */
export async function getLgbList(params) {
  return request('/users/death', {
    method: 'GET',
    params,
  });
}
