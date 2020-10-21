import request from '@/utils/request';

/**
 * 作品园地-列表
 * @param {*} params
 */
export async function worksCornerInfoList(params) {
  return request('/work_corner', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-作品园地
 * @param {*} params
 */
export async function deleteWorksCornerInfo(params) {
  return request(`/work_corner`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-作品园地
 * @param {*} params
 */
export async function addWorksCornerInfo(params) {
  return request(`/work_corner`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 作品园地-详情
 * @param {*} params
 */
export async function detailWorksCornerInfo(params) {
  return request(`/work_corner/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-作品园地
 * @param {*} params
 */
export async function updateWorksCornerInfo(params) {
  return request(`/work_corner/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
