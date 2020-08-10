import request from '@/utils/request';

/**
 * 新增巡检地点
 * @param {*} params
 */
export async function addPlace(params) {
  return request('/place/add', {
    method: 'POST',
    data: params,
  });
}

/**
 * 编辑巡检地点
 * @param {*} params
 */
export async function updatePlace(params) {
  return request(`/place/update/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 删除巡检地点
 * @param {*} params
 */
export async function deletePlace(params) {
  return request(`/place/delete`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 获取巡检地点列表
 * @param {*} params
 */
export async function getPlaceList(params) {
  return request('/place/list', {
    method: 'GET',
    params,
  });
}
