import request from '@/utils/request';

/**
 * 列表-网络课堂
 * @param {*} params
 */
export async function onlineClassList(params) {
  return request('/onlineStudy', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-网络课堂
 * @param {*} params
 */
export async function deleteOnlineClass(params) {
  return request(`/onlineStudy`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-网络课堂
 * @param {*} params
 */
export async function addOnlineClass(params) {
  return request(`/onlineStudy`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 编辑-网络课堂
 * @param {*} params
 */
export async function updateOnlineClass(params) {
  return request(`/onlineStudy`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 详情-网络课堂
 * @param {*} params
 */
export async function detailOnlineClass(params) {
  return request(`/onlineStudy/${params.id}`, {
    method: 'GET',
    params,
  });
}
