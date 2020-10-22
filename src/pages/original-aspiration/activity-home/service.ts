import request from '@/utils/request';

/**
 * 活动列表
 * @param {*} params
 */
export async function getActivityList(params) {
  return request('/exercise/message', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-活动
 * @param {*} params
 */
export async function deleteActivity(params) {
  return request(`/exercise/message`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-活动
 * @param {*} params
 */
export async function addActivity(params) {
  return request(`/exercise/message`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 活动-详情
 * @param {*} params
 */
export async function detailActivity(params) {
  return request(`/exercise/message/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-活动
 * @param {*} params
 */
export async function updateActivity(params) {
  return request(`/exercise/message/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
