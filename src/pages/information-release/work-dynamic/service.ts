import request from '@/utils/request';

/**
 * 工作动态-列表
 * @param {*} params
 */
export async function workDynamicList(params) {
  return request('/news', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-工作动态
 * @param {*} params
 */
export async function deleteWorkDynamic(params) {
  return request(`/news`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-工作动态
 * @param {*} params
 */
export async function addWorkDynamic(params) {
  return request(`/news`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 工作动态-详情
 * @param {*} params
 */
export async function detailWorkDynamic(params) {
  return request(`/news/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-工作动态
 * @param {*} params
 */
export async function updateWorkDynamic(params) {
  return request(`/news/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
