import request from '@/utils/request';

/**
 * 体检管理-列表
 * @param {*} params
 */
export async function physicalExaminationList(params) {
  return request('/physicals_management', {
    method: 'GET',
    params,
  });
}
/**
 * 获取已报名成员列表
 * @param {*} params
 */
export async function getMemberList(params) {
  return request(`/physicals_management/sign/list/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增-体检管理
 * @param {*} params
 */
export async function addPhysicalExamination(params) {
  return request(`/physicals_management`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 新增-体检报告
 * @param {*} params
 */
export async function addPhysicalReport(params) {
  return request(`/physicals_management/report`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除-体检管理
 * @param {*} params
 */
export async function deletePhysicalExamination(params) {
  return request(`/physicals_management`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 体检管理-详情
 * @param {*} params
 */
export async function detailPhysicalExamination(params) {
  return request(`/physicals_management/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-体检管理
 * @param {*} params
 */
export async function updatePhysicalExamination(params) {
  return request(`/physicals_management/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
