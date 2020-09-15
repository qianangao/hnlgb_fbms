import request from '@/utils/request';

/**
 * 活动中心-列表
 * @param {*} params
 */
export async function activityCenterInfoList(params) {
  return request('/activity', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-活动中心
 * @param {*} params
 */
export async function deleteActivityCenterInfo(params) {
  return request(`/activity`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-活动中心
 * @param {*} params
 */
export async function addActivityCenterInfo(params) {
  return request(`/activity`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 活动中心-详情
 * @param {*} params
 */
export async function detailActivityCenterInfo(params) {
  return request(`/activity/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-活动中心
 * @param {*} params
 */
export async function updateActivityCenterInfo(params) {
  return request(`/activity/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
