import request from '@/utils/request';

/**
 * 照片信息-列表
 * @param {*} params
 */
export async function photoInfoList(params) {
  return request('/photoInfo', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-照片信息
 * @param {*} params
 */
export async function deletePhotoInfo(params) {
  return request(`/photoInfo`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-照片信息
 * @param {*} params
 */
export async function addPhotoInfo(params) {
  return request(`/photoInfo`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 照片信息-详情
 * @param {*} params
 */
export async function detailPhotoInfo(params) {
  return request(`/photoInfo/${params.id}`, {
    method: 'GET',
    params,
  });
}

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
