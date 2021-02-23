import request from '@/utils/request';

/**
 * 银发人才-列表
 * @param {*} params
 */
export async function specialtyList(params) {
  return request('/silverTalent', {
    method: 'GET',
    params,
  });
}

/**
 *候鸟型银发人才-列表
 * @param {*} params
 */
export async function specialtyFlowList(params) {
  return request('/silverTalent/findTabAll', {
    method: 'GET',
    params,
  });
}

/**
 * 新增-银发人才
 * @param {*} params
 */
export async function addSpecialty(params) {
  return request(`/silverTalent`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 新增-候鸟型银发人才
 * @param {*} params
 */
export async function addSpecialtyFlow(params) {
  return request(`/silverTalent/insertTab`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除-银发人才
 * @param {*} params
 */
export async function deleteSpecialty(params) {
  return request(`/silverTalent`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 删除-候鸟型银发人才
 * @param {*} params
 */
export async function deleteSpecialtyFlow(params) {
  return request(`/silverTalent/deleteTab`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 银发人才-详情
 * @param {*} params
 */
export async function detailSpecialty(params) {
  return request(`/silverTalent/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 候鸟型银发人才-详情
 * @param {*} params
 */
export async function detailSpecialtyFlow(params) {
  return request(`/silverTalent/findTab/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-银发人才
 * @param {*} params
 */
export async function updateSpecialty(params) {
  return request(`/silverTalent/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 编辑-候鸟型银发人才
 * @param {*} params
 */
export async function updateSpecialtyFlow(params) {
  return request(`/silverTalent/putTab/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
