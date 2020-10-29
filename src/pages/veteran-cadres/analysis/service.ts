import request from '@/utils/request';

/**
 * 获取图表数据
 * @param {*} params
 */
export async function getChartData(params) {
  return request(`/statistic_analysis/${params.path}`);
}
