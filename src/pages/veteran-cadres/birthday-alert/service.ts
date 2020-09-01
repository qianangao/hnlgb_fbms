import request from '@/utils/request';

/**
 * 获取老干部兴趣爱好列表
 * @param {*} params
 */
export async function getBirthdayList(params) {
  return request('/user/birthday', {
    method: 'GET',
    params,
  });
}

/**
 * 修改生日是否提醒
 * @param {*} params
 */
export async function isReminder(params) {
  return request(`/user/isReminder`, {
    method: 'POST',
    data: params,
  });
}
