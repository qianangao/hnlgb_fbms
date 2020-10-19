import request from '@/utils/request';

/**
 * 基本志愿服务列表
 * @param {*} params
 */
export async function getTeamList(params) {
  return request('/team', {
    method: 'GET',
    params,
  });
}
/**
 * 活动列表
 * @param {*} params
 */
export async function getActivityList(params) {
  return request('/teamActivity', {
    method: 'GET',
    params,
  });
}
/**
 * 获取活动详情
 * @param {*} params
 */
export async function getActivityDetail(params) {
  return request(`/teamActivity/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 编辑-活动
 * @param {*} params
 */
export async function updateActivity(params) {
  return request(`/teamActivity/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 成员列表
 * @param {*} params
 */
export async function getMemberList(params) {
  return request(`/team/user/${params.teamId}`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取成员Ids
 * @param {*} params
 */
export async function getMemberIds(params) {
  return request(`/team/user/Ids/${params.teamId}`, {
    method: 'GET',
    params,
  });
}
/**
 * 已报名成员列表
 * @param {*} params
 */
export async function getRegisteredList(params) {
  return request(`/team/registered/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 添加成员
 * @param {*} params
 */
export async function addMember(params) {
  return request(`/team/user`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 移除成员
 * @param {*} params
 */
export async function deleteMember(params) {
  return request(`/team/user`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 发布活动
 * @param {*} params
 */
export async function addActivity(params) {
  return request(`/team`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除-基本志愿服务
 * @param {*} params
 */
export async function deleteActivity(params) {
  return request(`/teamActivity`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 删除-专项志愿服务
 * @param {*} params
 */
export async function deleteTeam(params) {
  return request(`/team`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-基本志愿服务
 * @param {*} params
 */
export async function addPersonal(params) {
  return request(`/team`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 新增-团队
 * @param {*} params
 */
export async function addTeam(params) {
  return request(`/team`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 基本志愿服务-详情
 * @param {*} params
 */
export async function detailPersonal(params) {
  return request(`/team/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 专项志愿服务-详情
 * @param {*} params
 */
export async function detailTeam(params) {
  return request(`/team/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-基本志愿服务
 * @param {*} params
 */
export async function updatePersonal(params) {
  return request(`/team/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 编辑-专项志愿服务
 * @param {*} params
 */
export async function updateTeam(params) {
  return request(`/team/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
