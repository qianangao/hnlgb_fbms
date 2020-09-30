import request from '@/utils/request';

/**
 * 获取角色列表
 * @param {*} params
 */
export async function getRoleList(params) {
  return request('/role', {
    method: 'GET',
    params,
  });
}

/**
 * 获取权限菜单树
 * @param {*} params
 */
export async function getRules(params) {
  return request('/rule', {
    method: 'GET',
    params,
  });
}

/**
 * 根据角色id获取权限列表
 * @param {*} params
 */
export async function getRuleIds(params) {
  return request(`/role/${params.id}/rule`, {
    method: 'GET',
    params,
  });
}

/**
 * 更改角色的权限列表
 * @param {*} params
 */
export async function updateRoleRules(params) {
  return request(`/role/update_rule`, {
    method: 'POST',
    data: params,
  });
}
