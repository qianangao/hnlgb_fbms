import request from '@/utils/request';

/**
 * 医疗政策-列表
 * @param {*} params
 */
export async function medicalPolicyInfoList(params) {
  return request('/medical-policy', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-医疗政策
 * @param {*} params
 */
export async function deleteMedicalPolicyInfo(params) {
  return request(`/medical-policy`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-医疗政策
 * @param {*} params
 */
export async function addMedicalPolicyInfo(params) {
  return request(`/medical-policy`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 医疗政策-详情
 * @param {*} params
 */
export async function detailMedicalPolicyInfo(params) {
  return request(`/medical-policy/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-医疗政策
 * @param {*} params
 */
export async function updateMedicalPolicyInfo(params) {
  return request(`/medical-policy/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
