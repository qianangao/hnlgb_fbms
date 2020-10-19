import request from '@/utils/request';

/**
 * 保健教育-列表
 * @param {*} params
 */
export async function healthEducationInfoList(params) {
  return request('/health-education', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-保健教育
 * @param {*} params
 */
export async function deleteHealthEducationInfo(params) {
  return request(`/health-education`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-保健教育
 * @param {*} params
 */
export async function addHealthEducationInfo(params) {
  return request(`/health-education`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 保健教育-详情
 * @param {*} params
 */
export async function detailHealthEducationInfo(params) {
  return request(`/health-education/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-保健教育
 * @param {*} params
 */
export async function updateHealthEducationInfo(params) {
  return request(`/health-education/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
