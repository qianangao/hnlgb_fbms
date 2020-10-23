import request from '@/utils/request';

/**
 * 新闻动态-列表
 * @param {*} params
 */
export async function newsDynamicList(params) {
  return request('/news', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-新闻动态
 * @param {*} params
 */
export async function deleteNewsDynamic(params) {
  return request(`/news`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-新闻动态
 * @param {*} params
 */
export async function addNewsDynamic(params) {
  return request(`/news`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 新闻动态-详情
 * @param {*} params
 */
export async function detailNewsDynamic(params) {
  return request(`/news/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-新闻动态
 * @param {*} params
 */
export async function updateNewsDynamic(params) {
  return request(`/news/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
