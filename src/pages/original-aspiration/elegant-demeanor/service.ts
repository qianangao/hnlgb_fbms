import request from '@/utils/request';

/**
 * 风采列表
 * @param {*} params
 */
export async function getElegantDemeanorList(params) {
  return request('/style_five_old', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-风采
 * @param {*} params
 */
export async function deleteElegantDemeanor(params) {
  return request(`/style_five_old`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-风采
 * @param {*} params
 */
export async function addElegantDemeanor(params) {
  return request(`/style_five_old`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 风采-详情
 * @param {*} params
 */
export async function detailElegantDemeanor(params) {
  return request(`/style_five_old/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-风采
 * @param {*} params
 */
export async function updateElegantDemeanor(params) {
  return request(`/style_five_old/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
