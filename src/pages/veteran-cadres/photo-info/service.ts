import request from '@/utils/request';

/**
 * 编辑-异地安置
 * @param {*} params
 */
export async function updatePhotoInfo(params) {
  return request(`/photoInfo/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 新增-异地安置
 * @param {*} params
 */
export async function addPhotoInfo(params) {
  return request(`/photoInfo`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除-异地安置
 * @param {*} params
 */
export async function deletePhotoInfo(params) {
  return request(`/photoInfo`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 异地安置-列表
 * @param {*} params
 */
export async function photoInfoList(params) {
  return request('/photoInfo', {
    method: 'GET',
    params,
  });
}

/**
 * 异地安置-详情
 * @param {*} params
 */
export async function getLgbDetail(params) {
  return request(`/photoInfo/${params.id}`, {
    method: 'GET',
    params,
  });
}
