import request from '@/utils/request';

/**
 * 支部活动-列表
 * @param {*} params
 */
export async function branchActivityList(params) {
  return request('/orgLife', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-支部活动
 * @param {*} params
 */
export async function deleteBranchActivity(params) {
  return request(`/orgLife`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-支部活动
 * @param {*} params
 */
export async function addBranchActivity(params) {
  return request(`/orgLife`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 支部活动-详情
 * @param {*} params
 */
export async function detailBranchActivity(params) {
  return request(`/orgLife/isInput`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-支部活动
 * @param {*} params
 */
export async function updateBranchActivity(params) {
  return request(`/orgLife/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 支部成员-列表
 * @param {*} params
 */
export async function branchPartyUser(params) {
  return request(`/branchPartyUser/${params.id}`, {
    method: 'GET',
    params,
  });
}
