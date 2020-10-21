import request from '@/utils/request';

/**
 * 走访慰问事迹列表
 * @param {*} params
 */
export async function getSupportDifficultList(params) {
  return request('/difficulty_help', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-走访慰问
 * @param {*} params
 */
export async function deleteSupportDifficult(params) {
  return request(`/difficulty_help`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-走访慰问
 * @param {*} params
 */
export async function addSupportDifficult(params) {
  return request(`/difficulty_help`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 走访慰问-详情
 * @param {*} params
 */
export async function detailSupportDifficult(params) {
  return request(`/difficulty_help/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-走访慰问
 * @param {*} params
 */
export async function updateSupportDifficult(params) {
  return request(`/difficulty_help/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
