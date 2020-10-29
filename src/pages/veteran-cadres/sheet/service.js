import request from '@/utils/request';

/**
 * 离休干部基本情况统计表
 * @param {*} params
 */
export async function getRetireReBasicsData(params) {
  return request(`/lgbsmp/api/v1/retirement-statment/itemsPage`, {
    method: 'GET',
    params,
  });
}

/**
 * 退休干部两年数字变化情况统计表
 * @param {*} params
 */
export async function getRetireTotalYearsData(params) {
  return request(`/lgbsmp/api/v1/retirement-statment/twoYearItemsPage`, {
    method: 'GET',
    params,
  });
}

/**
 * 离休干部两年数字变化情况统计表
 * @param {*} params
 */
export async function getRetireReTotalYearsData(params) {
  return request(`/lgbsmp/api/v1/statistic-report/retirement`, {
    method: 'GET',
    params,
  });
}

/**
 * 退休干部基本情况统计表
 * @param {*} params
 */
export async function getRetireBaseData(params) {
  return request(`/lgbsmp/api/v1/statistic-analysis/retireNumber`, {
    method: 'GET',
    params,
  });
}
