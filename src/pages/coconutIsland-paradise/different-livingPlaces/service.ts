import request from '@/utils/request';

/**
 * 异地居住-列表
 * @param {*} params
 */
export async function differentLivingInfoList(params) {
  return request('/differentLivingPlaces', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-异地居住
 * @param {*} params
 */
export async function deleteDifferentLivingInfo(params) {
  return request(`/differentLivingPlaces`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-异地居住
 * @param {*} params
 */
export async function addDifferentLivingInfo(params) {
  return request(`/differentLivingPlaces`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 异地居住-详情
 * @param {*} params
 */
export async function detailDifferentLivingInfo(params) {
  return request(`/differentLivingPlaces/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-异地安置
 * @param {*} params
 */
export async function updateDifferentLivingInfo(params) {
  return request(`/differentLivingPlaces/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
