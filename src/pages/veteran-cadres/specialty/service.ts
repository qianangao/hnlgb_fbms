import request from '@/utils/request';

/**
 * 银色人才-列表
 * @param {*} params
 */
export async function specialtyList(params) {
  return request('/silverTalent', {
    method: 'GET',
    params,
  });
}

/**
 * 新增-银色人才
 * @param {*} params
 */
export async function addSpecialty(params) {
  return request(`/silverTalent`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除-银色人才
 * @param {*} params
 */
export async function deleteSpecialty(params) {
  return request(`/silverTalent`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 银色人才-详情
 * @param {*} params
 */
export async function detailSpecialty(params) {
  return request(`/silverTalent/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-银色人才
 * @param {*} params
 */
export async function updateSpecialty(params) {
  return request(`/silverTalent/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
