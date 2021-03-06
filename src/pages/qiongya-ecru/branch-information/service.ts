import request from '@/utils/request';

/**
 * 支部信息-列表
 * @param {*} params
 */
export async function branchInformationList(params) {
  return request('/partyOr', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-支部信息
 * @param {*} params
 */
export async function deleteBranchInformation(params) {
  return request(`/party`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-支部信息
 * @param {*} params
 */
export async function addBranchInformation(params) {
  return request(`/party`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 支部信息-详情
 * @param {*} params
 */
export async function detailBranchInformation(params) {
  return request(`/party/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-支部信息
 * @param {*} params
 */
export async function updateBranchInformation(params) {
  return request(`/party`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 支部成员列表
 * @param {*} params
 */
export async function partyUserList(params) {
  return request(`/partyUser/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增-支部成员
 * @param {*} params
 */
export async function addPartyUser(params) {
  return request(`/partyUser`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除-支部成员
 * @param {*} params
 */
export async function deletePartyUser(params) {
  return request(`/partyUser/${params.partyId}`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 支部-新增成員
 * @param {*} params
 */
export async function getUsersNoParty(params) {
  return request(`/getUsersNoParty`, {
    method: 'GET',
    params,
  });
}
/**
 * 编辑-支部成员角色
 * @param {*} params
 */
export async function updateBranchMembers(params) {
  return request(`/updatePartyUserRole`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 支部成员(系统外)列表
 * @param {*} params
 */
export async function getLgbOuterList(params) {
  return request(`/mobileParty`, {
    method: 'GET',
    params,
  });
}
/**
 * 支部-新增成員(系统外)
 * @param {*} params
 */
export async function addLgbOuter(params) {
  return request(`/mobileParty`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑-支部成员(系统外)
 * @param {*} params
 */
export async function updateLgbOuter(params) {
  return request(`/mobileParty/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 删除-支部成员(外部)
 * @param {*} params
 */
export async function deleteLgbOuter(params) {
  return request(`/mobileParty`, {
    method: 'DELETE',
    data: params,
  });
}
