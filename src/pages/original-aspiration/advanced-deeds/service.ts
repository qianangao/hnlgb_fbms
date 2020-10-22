import request from '@/utils/request';

/**
 * 个人事迹列表
 * @param {*} params
 */
export async function getPersonalList(params) {
  return request('/person-advanced-deeds/names', {
    method: 'GET',
    params,
  });
}
/**
 * 集体事迹列表
 * @param {*} params
 */
export async function getCollectiveList(params) {
  return request('/unit-advanced-deeds/names', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-个人
 * @param {*} params
 */
export async function deletePersonal(params) {
  return request(`/person-advanced-deeds`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 删除-集体
 * @param {*} params
 */
export async function deleteCollective(params) {
  return request(`/unit-advanced-deeds`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-个人
 * @param {*} params
 */
export async function addPersonal(params) {
  return request(`/person-advanced-deeds`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 新增-集体
 * @param {*} params
 */
export async function addCollective(params) {
  return request(`/unit-advanced-deeds`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 个人-详情
 * @param {*} params
 */
export async function detailPersonal(params) {
  return request(`/person-advanced-deeds/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 集体-详情
 * @param {*} params
 */
export async function detailCollective(params) {
  return request(`/unit-advanced-deeds/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-个人
 * @param {*} params
 */
export async function updatePersonal(params) {
  return request(`/person-advanced-deeds/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 编辑-集体
 * @param {*} params
 */
export async function updateCollective(params) {
  return request(`/unit-advanced-deeds/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
