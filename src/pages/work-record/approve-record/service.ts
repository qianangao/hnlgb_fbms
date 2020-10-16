import request from '@/utils/request';

/**
 * 审批备案-列表
 * @param {*} params
 */
export async function approveRecordList(params) {
  return request('/examine_record', {
    method: 'GET',
    params,
  });
}

/**
 * 新增-审批备案
 * @param {*} params
 */
export async function addApproveRecord(params) {
  return request(`/examine_record`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除-审批备案
 * @param {*} params
 */
export async function deleteApproveRecord(params) {
  return request(`/examine_record`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 审批备案-详情
 * @param {*} params
 */
export async function detailApproveRecord(params) {
  return request(`/examine_record/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-审批备案
 * @param {*} params
 */
export async function updateApproveRecord(params) {
  return request(`/examine_record/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
