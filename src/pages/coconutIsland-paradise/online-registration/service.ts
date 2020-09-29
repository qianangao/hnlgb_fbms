import request from '@/utils/request';

/**
 * 网络报名-列表
 * @param {*} params
 */
export async function onlineRegistrationInfoList(params) {
  return request('/online_registration', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-网络报名
 * @param {*} params
 */
export async function deleteOnlineRegistrationInfo(params) {
  return request(`/online_registration`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-网络报名
 * @param {*} params
 */
export async function addOnlineRegistrationInfo(params) {
  return request(`/online_registration`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 网络报名-详情
 * @param {*} params
 */
export async function detailOnlineRegistrationInfo(params) {
  return request(`/online_registration/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-网络报名
 * @param {*} params
 */
export async function updateOnlineRegistrationInfo(params) {
  return request(`/online_registration/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
