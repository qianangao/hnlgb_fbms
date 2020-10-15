import request from '@/utils/request';

/**
 * 流动党员登记-列表
 * @param {*} params
 */
export async function flowPartyList(params) {
  return request('/lgbsmp/api/flow_party', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-流动党员登记
 * @param {*} params
 */
export async function deleteFlowParty(params) {
  return request(`/lgbsmp/api/flow_party`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-流动党员登记
 * @param {*} params
 */
export async function addFlowParty(params) {
  return request(`/lgbsmp/api/flow_party`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 详情-流动党员登记
 * @param {*} params
 */
export async function detailFlowParty(params) {
  return request(`/lgbsmp/api/flow_party/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-流动党员登记
 * @param {*} params
 */
export async function updateFlowParty(params) {
  return request(`/lgbsmp/api/flow_party/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
