import request from '@/utils/request';

/**
 * 获取申请复工企业列表
 * @param {*} params
 */
export async function getReturnworkList(params) {
  return request('/lgbsmp/api/v1/enterprise/list', {
    method: 'GET',
    params,
  });
}

/**
 * 根据组织id查询下属居委会/网格
 * @param {*} params
 */
export async function getOrganization(params) {
  return request(`/lgbsmp/api/v1/organization/branch/${params.id}`);
}

/**
 * 批量导出企业信息
 * @param {*} params
 */
export async function exportReturnworkList(params) {
  return request('/lgbsmp/api/v1/enterprise/export', {
    method: 'GET',
    responseType: 'blob',
    params,
  });
}
