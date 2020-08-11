import request from '@/utils/request';

/**
 * 重置用户密码
 * @param {*} params
 */
export async function resetPassword(params) {
  return request(`/lgbsmp/api/v1/user/checkoutPassword/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
