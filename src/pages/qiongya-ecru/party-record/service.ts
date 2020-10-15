import request from '@/utils/request';

/**
 * 党费记录-列表
 * @param {*} params
 */
export async function partyRecordList(params) {
  return request('/lgbsmp/api/partyDue', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-党费记录
 * @param {*} params
 */
export async function deletePartyRecord(params) {
  return request(`/lgbsmp/api/partyDue`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-党费记录
 * @param {*} params
 */
export async function addPartyRecord(params) {
  return request(`/lgbsmp/api/partyDue`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 党费记录-详情
 * @param {*} params
 */
export async function detailPartyRecord(params) {
  return request(`/lgbsmp/api/partyDue/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-党费记录
 * @param {*} params
 */
export async function updatePartyRecord(params) {
  return request(`/lgbsmp/api/partyDue/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 导出-党费记录
 * @param {*} params
 */
export async function exportPartyRecord(params) {
  return request(`/lgbsmp/api/partyDueExport`, {
    method: 'GET',
    params,
  });
}
