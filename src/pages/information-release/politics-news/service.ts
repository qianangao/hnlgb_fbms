import request from '@/utils/request';

/**
 * 要闻速览-列表
 * @param {*} params
 */
export async function politicsNewsList(params) {
  return request('/news', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-要闻速览
 * @param {*} params
 */
export async function deletePoliticsNews(params) {
  return request(`/news`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-要闻速览
 * @param {*} params
 */
export async function addPoliticsNews(params) {
  return request(`/news`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 要闻速览-详情
 * @param {*} params
 */
export async function detailPoliticsNews(params) {
  return request(`/news/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-要闻速览
 * @param {*} params
 */
export async function updatePoliticsNews(params) {
  return request(`/news/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
