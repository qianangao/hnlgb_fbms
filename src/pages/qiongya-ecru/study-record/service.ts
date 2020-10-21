import request from '@/utils/request';

/**
 * 学习记录-列表
 * @param {*} params
 */
export async function studyRecordList(params) {
  return request('/learning_record', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-学习记录
 * @param {*} params
 */
export async function deleteStudyRecord(params) {
  return request(`/learning_record`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-学习记录
 * @param {*} params
 */
export async function addStudyRecord(params) {
  return request(`/learning_record`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 学习记录-详情
 * @param {*} params
 */
export async function detailStudyRecord(params) {
  return request(`/learning_record/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-学习记录
 * @param {*} params
 */
export async function updateStudyRecord(params) {
  return request(`/learning_record/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 学习记录-成员列表
 * @param {*} params
 */
export async function studyRecordUser(params) {
  return request(`/learning_record/learn_user/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增-学习记录成员
 * @param {*} params
 */
export async function addStudyRecordUser(params) {
  return request(`/learning_record/insert_lu`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除-学习记录成员
 * @param {*} params
 */
export async function deleteStudyRecordUser(params) {
  return request(`/learning_record/lu`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 学习记录-成员ids
 * @param {*} params
 */
export async function getMemberIds(params) {
  return request(`/learning_record/learn_user_id/${params.id}`, {
    method: 'GET',
    params,
  });
}
