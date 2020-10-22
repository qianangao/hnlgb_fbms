import request from '@/utils/request';

/**
 * 获取角色数据
 * @param {*} params
 */
export async function getRoles(params) {
  return request('/role/nopage', {
    method: 'GET',
    params,
  });
}

/**
 * 新增工作人员
 * @param {*} params
 */
export async function addStaff(params) {
  return request('/user', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改工作人员信息
 * @param {*} params
 */
export async function updateStaff(params) {
  return request(`/user/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 删除工作人员
 * @param {*} params
 */
export async function deleteStaffs(params) {
  return request(`/user`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 获取工作人员列表
 * @param {*} params
 */
export async function getStaffList(params) {
  return request('/user', {
    method: 'GET',
    params,
  });
}

/**
 * 工作人员重置密码
 * @param {*} params
 */
export async function resetStaffPwd(params) {
  return request(`/user/reset_password/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
