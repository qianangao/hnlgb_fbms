import request from '@/utils/request';

/**
 * 每日播报-列表
 * @param {*} params
 */
export async function dailyBroadcastList(params) {
  return request('/daily-report', {
    method: 'GET',
    params,
  });
}

/**
 * 每日播报-详情
 * @param {*} params
 */
export async function detailDailyBroadcast(params) {
  return request(`/daily-report/${params.id}`, {
    method: 'GET',
    params,
  });
}
