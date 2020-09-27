import request from '@/utils/request';

/**
 * 助老志愿-列表
 * @param {*} params
 */
export async function helpElderlyInfoList(params) {
  return request('/help_old', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-助老志愿
 * @param {*} params
 */
export async function deleteHelpElderlyInfo(params) {
  return request(`/help_old`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-助老志愿
 * @param {*} params
 */
export async function addHelpElderlyInfo(params) {
  return request(`/help_old`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 助老志愿-详情
 * @param {*} params
 */
export async function detailHelpElderlyInfo(params) {
  return request(`/help_old/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-助老志愿
 * @param {*} params
 */
export async function updateHelpElderlyInfo(params) {
  return request(`/help_old/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
