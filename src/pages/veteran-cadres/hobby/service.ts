import request from '@/utils/request';

/**
 * 获取老干部兴趣爱好列表
 * @param {*} params
 */
export async function getHobbyList(params) {
  return request('/hobby', {
    method: 'GET',
    params,
  });
}
/**
 * 兴趣爱好-详情
 * @param {*} params
 */
export async function detailHobby(params) {
  return request(`/hobby/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-兴趣爱好
 * @param {*} params
 */
export async function updateHobby(params) {
  return request(`/hobby/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 兴趣爱好-根据userId查询-详情
 * @param {*} params
 */
export async function detailUserIdHobby(params) {
  return request(`/hobby/user/${params.id}`, {
    method: 'GET',
    params,
  });
}
