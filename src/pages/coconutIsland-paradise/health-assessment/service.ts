import request from '@/utils/request';

/**
 * 健康测评结果-列表
 * @param {*} params
 */
export async function healthAssessmentResultList(params) {
  return request('/health_assess/user/complete', {
    method: 'GET',
    params,
  });
}
/**
 * 健康测评结果-详情
 * @param {*} params
 */
export async function detailHealthAssessmentResult(params) {
  return request(`/health_assess/user/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 健康测评题目-列表
 * @param {*} params
 */
export async function healthAssessmentTopicList(params) {
  return request('/health_assess', {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-健康测评题目
 * @param {*} params
 */
export async function updateHealthAssessmentTopic(params) {
  return request(`/health_assess/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 健康测评题目-详情
 * @param {*} params
 */
export async function detailHealthAssessmentTopic(params) {
  return request(`/health_assess/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 健康测评统计
 * @param {*} params
 */
export async function healthAssessmentStatisticsInfo(params) {
  return request('/health_assess/statistics', {
    method: 'GET',
    params,
  });
}
