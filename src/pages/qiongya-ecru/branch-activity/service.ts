import request from '@/utils/request';

/**
 * 支部活动-列表
 * @param {*} params
 */
export async function branchActivityList(params) {
  return request('/orgLife', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-支部活动
 * @param {*} params
 */
export async function deleteBranchActivity(params) {
  return request(`/orgLife`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-支部活动
 * @param {*} params
 */
export async function addBranchActivity(params) {
  return request(`/orgLife`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 支部活动-详情
 * @param {*} params
 */
export async function detailBranchActivity(params) {
  return request(`/orgLife/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-支部活动
 * @param {*} params
 */
export async function updateBranchActivity(params) {
  return request(`/orgLife`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 支部成员-列表
 * @param {*} params
 */
export async function branchActivityUser(params) {
  return request(`/org_life_user/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 新增-支部活动
 * @param {*} params
 */
export async function addBranchActivityUser(params) {
  return request(`/org_life_user`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 评论-列表
 * @param {*} params
 */
export async function getCommentList(params) {
  return request(`/orglife_comment`, {
    method: 'GET',
    params,
  });
}

/**
 * 删除-评论
 * @param {*} params
 */
export async function deleteComment(params) {
  return request(`/orglife_comment`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 审核-评论
 * @param {*} params
 */
export async function commentAudit(params) {
  return request(`/orglife_comment/examine`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 统计-列表
 * @param {*} params
 */
export async function getStatisticsList(params) {
  return request(`/getOrgLifeByMonth`, {
    method: 'GET',
    params,
  });
}

/**
 * 统计-列表
 * @param {*} params
 */
export async function getOrgLifeStatisticsVo(params) {
  return request(`/getOrgLifeStatisticsVo`, {
    method: 'GET',
    params,
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

// 提醒
export async function feachRemind(params) {
  return request(`/party/remind`, {
    method: 'GET',
    params,
  });
}
