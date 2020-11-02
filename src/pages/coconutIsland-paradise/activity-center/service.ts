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
 * 活动中心-单位
 * @param {*} params
 */
export async function detailActivityCenterUnitInfo(params) {
  return request(`/activity/org/${params.id}`, {
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
 * 新增-剪影
 * @param {*} params
 */
export async function addSilhouette(params) {
  return request(`/activity/silhouette/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 编辑-活动中心-单位
 * @param {*} params
 */
export async function updateActivityCenterUnitInfo(params) {
  return request(`/activity/add`, {
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

/**
 * 已报名成员列表
 * @param {*} params
 */
export async function getRegisteredList(params) {
  return request(`/activity/user/${params.activityId}`, {
    method: 'GET',
    params,
  });
}
