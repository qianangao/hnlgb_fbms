import request from '@/utils/request';

/**
 * 每日播报-列表
 * @param {*} params
 */
export async function dailyBroadcastList(params) {
  return request('/dailyBroadcast', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-每日播报
 * @param {*} params
 */
export async function deleteDailyBroadcast(params) {
  return request(`/dailyBroadcast`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-每日播报
 * @param {*} params
 */
export async function addDailyBroadcast(params) {
  return request(`/dailyBroadcast`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 每日播报-详情
 * @param {*} params
 */
export async function detailDailyBroadcast(params) {
  return request(`/dailyBroadcast/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-每日播报
 * @param {*} params
 */
export async function updateDailyBroadcast(params) {
  return request(`/dailyBroadcast/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
