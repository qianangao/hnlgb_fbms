import request from '@/utils/request';

/**
 * 基本志愿服务列表
 * @param {*} params
 */
export async function getPersonalList(params) {
  return request('/person-advanced-deeds', {
    method: 'GET',
    params,
  });
}
/**
 * 专项志愿服务列表
 * @param {*} params
 */
export async function getCollectiveList(params) {
  return request('/unit-advanced-deeds', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-基本志愿服务
 * @param {*} params
 */
export async function deletePersonal(params) {
  return request(`/person-advanced-deeds`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 删除-专项志愿服务
 * @param {*} params
 */
export async function deleteCollective(params) {
  return request(`/unit-advanced-deeds`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-基本志愿服务
 * @param {*} params
 */
export async function addPersonal(params) {
  return request(`/person-advanced-deeds`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 新增-专项志愿服务
 * @param {*} params
 */
export async function addCollective(params) {
  return request(`/unit-advanced-deeds`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 基本志愿服务-详情
 * @param {*} params
 */
export async function detailPersonal(params) {
  return request(`/person-advanced-deeds/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 专项志愿服务-详情
 * @param {*} params
 */
export async function detailCollective(params) {
  return request(`/unit-advanced-deeds/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-基本志愿服务
 * @param {*} params
 */
export async function updatePersonal(params) {
  return request(`/person-advanced-deeds/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 编辑-专项志愿服务
 * @param {*} params
 */
export async function updateCollective(params) {
  return request(`/unit-advanced-deeds/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
