import request from '@/utils/request';

/**
 * 新增活动地点
 * @param {*} params
 */
export async function addSite(params) {
  return request('/field_manage', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改活动地点信息
 * @param {*} params
 */
export async function updateSite(params) {
  return request(`/field_manage/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 删除活动地点
 * @param {*} params
 */
export async function deleteSites(params) {
  return request(`/field_manage`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 获取活动地点列表
 * @param {*} params
 */
export async function getSiteList(params) {
  return request('/field_manage', {
    method: 'GET',
    params,
  });
}
