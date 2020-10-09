import request from '@/utils/request';

/**
 * 学习记录-列表
 * @param {*} params
 */
export async function studyRecordList(params) {
  return request('/lgbsmp/api/learningRecord', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-学习记录
 * @param {*} params
 */
export async function deleteStudyRecord(params) {
  return request(`/lgbsmp/api/learningRecord`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-学习记录
 * @param {*} params
 */
export async function addStudyRecord(params) {
  return request(`/lgbsmp/api/learningRecord`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 学习记录-详情
 * @param {*} params
 */
export async function detailStudyRecord(params) {
  return request(`/lgbsmp/api/learningRecord/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-学习记录
 * @param {*} params
 */
export async function updateStudyRecord(params) {
  return request(`/lgbsmp/api/learningRecord/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
