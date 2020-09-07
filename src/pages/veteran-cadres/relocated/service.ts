import request from '@/utils/request';

/**
 * 异地安置-列表
 * @param {*} params
 */
export async function relocatedList(params) {
  return request('/relocated', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-异地安置
 * @param {*} params
 */
export async function deleteRelocated(params) {
  return request(`/relocated`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-异地安置
 * @param {*} params
 */
export async function addRelocated(params) {
  return request(`/relocated`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 异地安置-详情
 * @param {*} params
 */
export async function detailRelocated(params) {
  return request(`/relocated/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-异地安置
 * @param {*} params
 */
export async function updateRelocated(params) {
  return request(`/relocated/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}