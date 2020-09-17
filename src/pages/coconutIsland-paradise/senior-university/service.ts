import request from '@/utils/request';

/**
 * 老年大学-列表
 * @param {*} params
 */
export async function seniorUniversityInfoList(params) {
  return request('/university', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-老年大学
 * @param {*} params
 */
export async function deleteSeniorUniversityInfo(params) {
  return request(`/university`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-老年大学
 * @param {*} params
 */
export async function addSeniorUniversityInfo(params) {
  return request(`/university`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 老年大学-详情
 * @param {*} params
 */
export async function detailSeniorUniversityInfo(params) {
  return request(`/university/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-老年大学
 * @param {*} params
 */
export async function updateSeniorUniversityInfo(params) {
  return request(`/university/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
