import request from '@/utils/request';

/**
 * 获取老干部监控汇总数据
 * @param {*} params
 */
export async function getSummaryData(params) {
  return request(`/monitoring-center`, {
    method: 'GET',
    params,
  });
}

export async function getMonitorPersonList(params) {
  return request(`/monitoring-center/user`, {
    method: 'GET',
    params,
  });
}
