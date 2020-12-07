import request from '@/utils/request';

/**
 * 时政要闻-列表
 * @param {*} params
 */
export async function politicsNewsList(params) {
  return request('/news', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-时政要闻
 * @param {*} params
 */
export async function deletePoliticsNews(params) {
  return request(`/news`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-时政要闻
 * @param {*} params
 */
export async function addPoliticsNews(params) {
  return request(`/news`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 时政要闻-详情
 * @param {*} params
 */
export async function detailPoliticsNews(params) {
  return request(`/news/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-时政要闻
 * @param {*} params
 */
export async function updatePoliticsNews(params) {
  return request(`/news/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
