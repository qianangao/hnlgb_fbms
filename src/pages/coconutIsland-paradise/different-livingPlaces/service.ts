import request from '@/utils/request';

/**
 * 异地居住-列表
 * @param {*} params
 */
export async function differentLivingInfoList(params) {
  return request('/user_address', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-异地居住
 * @param {*} params
 */
export async function deleteDifferentLivingInfo(params) {
  return request(`/user_address`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-异地居住
 * @param {*} params
 */
export async function addDifferentLivingInfo(params) {
  return request(`/user_address`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 异地居住-详情
 * @param {*} params
 */
export async function detailDifferentLivingInfo(params) {
  return request(`/user_address/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-易地安置
 * @param {*} params
 */
export async function updateDifferentLivingInfo(params) {
  return request(`/user_address/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
