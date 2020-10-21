import request from '@/utils/request';

/**
 * 政策规定与解答-列表
 * @param {*} params
 */
export async function policyStipulateList(params) {
  return request('/policyStipulate', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-政策规定与解答
 * @param {*} params
 */
export async function deletePolicyStipulate(params) {
  return request(`/policyStipulate`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-政策规定与解答
 * @param {*} params
 */
export async function addPolicyStipulate(params) {
  return request(`/policyStipulate`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 政策规定与解答-详情
 * @param {*} params
 */
export async function detailPolicyStipulate(params) {
  return request(`/policyStipulate/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-政策规定与解答
 * @param {*} params
 */
export async function updatePolicyStipulate(params) {
  return request(`/policyStipulate/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
