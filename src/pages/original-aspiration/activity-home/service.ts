import request from '@/utils/request';

/**
 * 活动列表
 * @param {*} params
 */
export async function getActivityList(params) {
  return request('/activity/information', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-活动
 * @param {*} params
 */
export async function deleteActivity(params) {
  return request(`/activity/information`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-活动
 * @param {*} params
 */
export async function addActivity(params) {
  return request(`/activity/information`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 活动-详情
 * @param {*} params
 */
export async function detailActivity(params) {
  return request(`/activity/information/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-活动
 * @param {*} params
 */
export async function updateActivity(params) {
  return request(`/activity/information/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}