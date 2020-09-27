import request from '@/utils/request';

/**
 * 支部信息-列表
 * @param {*} params
 */
export async function branchInformationList(params) {
  return request('/branchInformation', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-支部信息
 * @param {*} params
 */
export async function deleteBranchInformation(params) {
  return request(`/branchInformation`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-支部信息
 * @param {*} params
 */
export async function addBranchInformation(params) {
  return request(`/branchInformation`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 支部信息-详情
 * @param {*} params
 */
export async function detailBranchInformation(params) {
  return request(`/branchInformation/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-支部信息
 * @param {*} params
 */
export async function updateBranchInformation(params) {
  return request(`/branchInformation/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
