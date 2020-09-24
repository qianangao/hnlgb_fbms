import request from '@/utils/request';

/**
 * 生活服务-列表
 * @param {*} params
 */
export async function lifeServiceInfoList(params) {
  return request('/life_service', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-生活服务
 * @param {*} params
 */
export async function deleteLifeServiceInfo(params) {
  return request(`/life_service`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-生活服务
 * @param {*} params
 */
export async function addLifeServiceInfo(params) {
  return request(`/life_service`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 生活服务-详情
 * @param {*} params
 */
export async function detailLifeServiceInfo(params) {
  return request(`/life_service/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-生活服务
 * @param {*} params
 */
export async function updateLifeServiceInfo(params) {
  return request(`/life_service/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
