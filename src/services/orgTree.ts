import request from '@/utils/request';

/**
 * 根据id获取组织树信息
 * @param {*} params
 */
export async function getOrgTreeById(params) {
  return request(`/organization/directly-child/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 根据搜索获取完整组织树结构
 * @param {*} params
 */
export async function searchOrgTree(params) {
  return request('/organization/all-child', {
    method: 'GET',
    params,
  });
}
