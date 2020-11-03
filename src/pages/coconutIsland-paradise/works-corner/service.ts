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
 * 评论-列表
 * @param {*} params
 */
export async function getCommentList(params) {
  return request(`/work_corner_comment`, {
    method: 'GET',
    params,
  });
}
/**
 * 审核-评论
 * @param {*} params
 */
export async function commentAudit(params) {
  return request(`/work_corner_comment/examine`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 删除-评论
 * @param {*} params
 */
export async function deleteComment(params) {
  return request(`/work_corner_comment`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 审核-作品
 * @param {*} params
 */
export async function approval(params) {
  return request(`/work_corner/audit/${params.id}/${params.status}`, {
    method: 'PUT',
    data: params,
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
