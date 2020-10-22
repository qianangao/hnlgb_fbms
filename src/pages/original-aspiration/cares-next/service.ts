import request from '@/utils/request';

/**
 * 获取关工组织列表
 * @param {*} params
 */
export async function getCaresList(params) {
  return request('/care-generation/mechanism/names', {
    method: 'GET',
    params,
  });
}

/**
 * 获取关工动态列表
 * @param {*} params
 */
export async function getTrendsList(params) {
  return request('/care-generation/names', {
    method: 'GET',
    params,
  });
}
/**
 * 获取关工组织成员列表
 * @param {*} params
 */
export async function getMemberList(params) {
  return request(`/care-generation/member/${params.mechanismId}`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取关工组织详情
 * @param {*} params
 */
export async function caresDetail(params) {
  return request(`/care-generation/mechanism/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 删除关工组织
 * @param {*} params
 */
export async function deleteCares(params) {
  return request(`/care-generation/mechanism`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 删除关工动态
 * @param {*} params
 */
export async function deleteTrends(params) {
  return request(`/care-generation/mechanism`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 获取关工动态详情
 * @param {*} params
 */
export async function trendsDetail(params) {
  return request(`/care-generation/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增关工组织
 * @param {*} params
 */
export async function addCares(params) {
  return request(`/care-generation/mechanism`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑关工组织
 * @param {*} params
 */
export async function updateCares(params) {
  return request(`/care-generation/mechanism/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 新增关工动态
 * @param {*} params
 */
export async function addTrends(params) {
  return request(`/care-generation`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 新增成员
 * @param {*} params
 */
export async function addMember(params) {
  return request(`/care-generation/member`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 编辑成员信息
 * @param {*} params
 */
export async function updateMember(params) {
  return request(`/care-generation/member/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 删除成员信息
 * @param {*} params
 */
export async function deleteMember(params) {
  return request(`/care-generation/member`, {
    method: 'DELETE',
    data: params,
  });
}
