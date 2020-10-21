import request from '@/utils/request';

/**
 * 就医指南-列表
 * @param {*} params
 */
export async function medicalGuideInfoList(params) {
  return request('/medical_guide', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-就医指南
 * @param {*} params
 */
export async function deleteMedicalGuideInfo(params) {
  return request(`/medical_guide`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-就医指南
 * @param {*} params
 */
export async function addMedicalGuideInfo(params) {
  return request(`/medical_guide`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 就医指南-详情
 * @param {*} params
 */
export async function detailMedicalGuideInfo(params) {
  return request(`/medical_guide/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-就医指南
 * @param {*} params
 */
export async function updateMedicalGuideInfo(params) {
  return request(`/medical_guide/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
