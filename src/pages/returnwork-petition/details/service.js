import request from '@/utils/request';

/**
 * 根据企业id查询企业详情
 * @param {} params
 */
export async function getShopsBaseInfo(params) {
  return request(`/lgbsmp/api/v1/enterprise/${params.id}`);
}

/**
 * 根据企业id查询企业复工人员列表
 * @param {*} params
 */
export async function getShopsBasePersonList(params) {
  return request(`/lgbsmp/api/v1/enterprise/recovery/list/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 企业绑定信息修改
 * @param {*} params
 */
export async function editReturnworkEnterprise(params) {
  return request(`/lgbsmp/api/v1/enterprise/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 新增复工人员
 * @param {*} params
 */
export async function addReturnworkPerson(data) {
  return request(`/lgbsmp/api/v1/enterprise/recovery`, {
    method: 'POST',
    data,
  });
}

/**
 * 复工人员信息修改
 * @param {*} params
 */
export async function editReturnworkPerson(params) {
  return request(`/lgbsmp/api/v1/enterprise/recovery/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 删除复工人员
 * @param {*} params
 */
export async function deleteReturnworkPerson(params) {
  return request(`/lgbsmp/api/v1/enterprise/recovery`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 导入复工人员
 * @param {*} params
enterpriseId string (query)	企业id
excelName string (query)	文件名
path string (query)           文件路径
 */
export async function importReturnworkPersonList(params) {
  return request(`/lgbsmp/api/v1/enterprise/users/excel`, {
    method: 'GET',
    params,
  });
}
