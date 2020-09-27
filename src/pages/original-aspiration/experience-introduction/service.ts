import request from '@/utils/request';

/**
 * 活动列表
 * @param {*} params
 */
export async function getExperienceList(params) {
  return request('/experience-introduction', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-活动
 * @param {*} params
 */
export async function deleteExperience(params) {
  return request(`/experience-introduction`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-活动
 * @param {*} params
 */
export async function addExperience(params) {
  return request(`/experience-introduction`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 活动-详情
 * @param {*} params
 */
export async function detailExperience(params) {
  return request(`/experience-introduction/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-活动
 * @param {*} params
 */
export async function updateExperience(params) {
  return request(`/experience-introduction/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
