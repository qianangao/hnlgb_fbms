import request from '@/utils/request';

/**
 * 异地居住-列表
 * @param {*} params
 */
export async function activityCenterInfoList(params) {
  return request('/activityCenter', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-异地居住
 * @param {*} params
 */
export async function deleteActivityCenterInfo(params) {
  return request(`/activityCenter`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-异地居住
 * @param {*} params
 */
export async function addActivityCenterInfo(params) {
  return request(`/activityCenter`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 异地居住-详情
 * @param {*} params
 */
export async function detailActivityCenterInfo(params) {
  return request(`/activityCenter/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-异地安置
 * @param {*} params
 */
export async function updateActivityCenterInfo(params) {
  return request(`/activityCenter/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
