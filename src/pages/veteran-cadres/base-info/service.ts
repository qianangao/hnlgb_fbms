import request from '@/utils/request';

/**
 * 删除老干部
 * @param {*} params
 */
export async function deleteLgb(params) {
  return request(`/users`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 获取老干部列表
 * @param {*} params
 */
export async function getLgbList(params) {
  return request('/users', {
    method: 'GET',
    params,
  });
}

/**
 * 重制老干部账号密码
 * @param {*} params
 */
export async function resetLgbPwd(params) {
  return request(`/users/password/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 新增老干部
 * @param {*} params
 */
export async function addLgb(params) {
  return request(`/users`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取老干部详情
 * @param {*} params
 */
export async function getLgbDetail(params) {
  return request(`/users/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑老干部信息
 * @param {*} params
 */
export async function updateLgb(params) {
  return request(`/users/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 获取老干部家庭信息
 * @param {*} params
 */
export async function getFamilyLgb(params) {
  return request(`/users/family/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑老干部家庭信息
 * @param {*} params
 */
export async function updateFamilyLgb(params) {
  return request(`/users/family/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 获取老干部社会兼职信息
 * @param {*} params
 */
export async function getPartTimeLgb(params) {
  return request(`/part_time/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑老干部社会兼职信息
 * @param {*} params
 */
export async function updatePartTimeLgb(params) {
  return request(`/part_time/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 获取老干部健康信息
 * @param {*} params
 */
export async function getHealthyLgb(params) {
  return request(`/users/health/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑老干部健康信息
 * @param {*} params
 */
export async function updateHealthyLgb(params) {
  return request(`/users/health/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
