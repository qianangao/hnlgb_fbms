import request from '@/utils/request';

/**
 * 活动列表
 * @param {*} params
 */
export async function getActivityList(params) {
  return request('/exercise/message', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-活动
 * @param {*} params
 */
export async function deleteActivity(params) {
  return request(`/exercise/message`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-活动
 * @param {*} params
 */
export async function addActivity(params) {
  return request(`/exercise/message`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 活动-详情
 * @param {*} params
 */
export async function detailActivity(params) {
  return request(`/exercise/message/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-活动
 * @param {*} params
 */
export async function updateActivity(params) {
  return request(`/exercise/message/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 评论-列表
 * @param {*} params
 */
export async function getCommentList(params) {
  return request(`/exercise/comment`, {
    method: 'GET',
    params,
  });
}
/**
 * 审核-评论
 * @param {*} params
 */
export async function commentAudit(params) {
  return request(`/exercise/comment/examine`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 删除-评论
 * @param {*} params
 */
export async function deleteComment(params) {
  return request(`/exercise/comment`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 活动地点查询（无分页）
 * @param {*} params
 */
export async function getSiteData(params) {
  return request(`/field_manage/nopage`, {
    method: 'GET',
    params,
  });
}

/**
 * 预约活动时段查询
 * @param {*} params
 */
export async function getSiteTimeData(params) {
  return request(`/field_order/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 设置预约活动地点
 * @param {*} params
 */
export async function setSite(params) {
  return request(`/field_order`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 取消预约活动
 * @param {*} params
 */
export async function clearSite(params) {
  return request(`/field_order/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
