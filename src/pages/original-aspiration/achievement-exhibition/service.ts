import request from '@/utils/request';

/**
 * 活动列表
 * @param {*} params
 */
export async function getAchievementList(params) {
  return request('/result-display', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-活动
 * @param {*} params
 */
export async function deleteAchievement(params) {
  return request(`/result-display`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-活动
 * @param {*} params
 */
export async function addAchievement(params) {
  return request(`/result-display`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 活动-详情
 * @param {*} params
 */
export async function detailAchievement(params) {
  return request(`/result-display/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-活动
 * @param {*} params
 */
export async function updateAchievement(params) {
  return request(`/result-display/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
