import request from '@/utils/request';

/**
 * 活动中心-列表
 * @param {*} params
 */
export async function activityCenterInfoList(params) {
  return request('/activityCenter', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-活动中心
 * @param {*} params
 */
export async function deleteActivityCenterInfo(params) {
  return request(`/activityCenter`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-活动中心
 * @param {*} params
 */
export async function addActivityCenterInfo(params) {
  return request(`/activityCenter`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 活动中心-详情
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
