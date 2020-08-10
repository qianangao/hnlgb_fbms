import request from '@/utils/request';

/**
 * 新增巡检人员
 * @param {*} params
 */
export async function addInspection(params) {
  return request('/inspection_user/add', {
    method: 'POST',
    data: params,
  });
}

/**
 * 编辑巡检人员
 * @param {*} params
 */
export async function updateInspection(params) {
  return request(`/inspection_user/update/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 删除巡检人员
 * @param {*} params
 */
export async function deleteInspection(params) {
  return request(`/inspection_user/delete`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 获取巡检人员列表
 * @param {*} params
 */
export async function getInspectionList(params) {
  return request('/inspection_user/list', {
    method: 'GET',
    params,
  });
}
