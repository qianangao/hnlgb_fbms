import request from '@/utils/request';

/**
 * 工作人员电话簿-列表
 * @param {*} params
 */
export async function staffDirectoryList(params) {
  return request('/staffDirectory', {
    method: 'GET',
    params,
  });
}

/**
 * 工作人员电话簿-详情
 * @param {*} params
 */
export async function detailStaffDirectory(params) {
  return request(`/staffDirectory/${params.id}`, {
    method: 'GET',
    params,
  });
}
