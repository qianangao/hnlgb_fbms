import request from '@/utils/request';

/**
 * 走访慰问事迹列表
 * @param {*} params
 */
export async function getVisitList(params) {
  return request('/visit', {
    method: 'GET',
    params,
  });
}
/**
 * 获取成员列表
 * @param {*} params
 */
export async function getDeathMemberList(params) {
  return request(`/users/death`, {
    method: 'GET',
    params,
  });
}

/**
 * 走访慰问统计列表
 * @param {*} params
 */
export async function getVisitStatistics(params) {
  return request('/visit/statistics', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-走访慰问
 * @param {*} params
 */
export async function deleteVisit(params) {
  return request(`/visit`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-走访慰问
 * @param {*} params
 */
export async function addVisit(params) {
  return request(`/visit`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 走访慰问-详情
 * @param {*} params
 */
export async function detailVisit(params) {
  return request(`/visit/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-走访慰问
 * @param {*} params
 */
export async function updateVisit(params) {
  return request(`/visit/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
