import request from '@/utils/request';

/**
 * 获取社团列表
 * @param {*} params
 */
export async function getCommunityList(params) {
  return request('/club-house/club', {
    method: 'GET',
    params,
  });
}

/**
 * 获取活动列表
 * @param {*} params
 */
export async function getActivityList(params) {
  return request('/club-house/club-activity', {
    method: 'GET',
    params,
  });
}
/**
 * 获取成员列表
 * @param {*} params
 */
export async function getMemberList(params) {
  return request(`/club-house/club-member/${params.clubId}`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取成员Ids
 * @param {*} params
 */
export async function getMemberIds(params) {
  return request(`/club-house/club-member/user-ids/${params.clubId}`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取社团详情
 * @param {*} params
 */
export async function getCommunityDetail(params) {
  return request(`/club-house/club/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 删除活动
 * @param {*} params
 */
export async function deleteActivity(params) {
  return request(`/club-house/club-activity`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 删除社团
 * @param {*} params
 */
export async function deleteCommunity(params) {
  return request(`/club-house/club`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 获取活动详情
 * @param {*} params
 */
export async function getActivityDetail(params) {
  return request(`/club-house/club-activity/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增社团
 * @param {*} params
 */
export async function addCommunity(params) {
  return request(`/club-house/club`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑社团
 * @param {*} params
 */
export async function updateCommunity(params) {
  return request(`/club-house/club/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 新增活动
 * @param {*} params
 */
export async function addActivity(params) {
  return request(`/club-house/club-activity`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 添加成员
 * @param {*} params
 */
export async function addMember(params) {
  return request(`/club-house/club-member`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 移除成员
 * @param {*} params
 */
export async function deleteMember(params) {
  return request(`/club-house/club-member`, {
    method: 'DELETE',
    data: params,
  });
}
