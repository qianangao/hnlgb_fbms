import request from '@/utils/request';

/**
 * 涉老政策-列表
 * @param {*} params
 */
export async function elderlyPolicyInfoList(params) {
  return request('/elderlyPolicy', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-涉老政策
 * @param {*} params
 */
export async function deleteElderlyPolicyInfo(params) {
  return request(`/elderlyPolicy`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-涉老政策
 * @param {*} params
 */
export async function addElderlyPolicyInfo(params) {
  return request(`/elderlyPolicy`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 涉老政策-详情
 * @param {*} params
 */
export async function detailElderlyPolicyInfo(params) {
  return request(`/elderlyPolicy/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-异地安置
 * @param {*} params
 */
export async function updateElderlyPolicyInfo(params) {
  return request(`/elderlyPolicy/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
