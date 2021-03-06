import request from '@/utils/request';

/**
 * 获取老干部兴趣爱好列表
 * @param {*} params
 */
export async function getBirthdayList(params) {
  return request('/birthday-reminder', {
    method: 'GET',
    params,
  });
}

/**
 * 获取提醒时间
 * @param {*} params
 */
export async function remindTime(params) {
  return request('/birthday-reminder/cron', {
    method: 'GET',
    params,
  });
}

/**
 * 修改生日是否提醒
 * @param {*} params
 */
export async function isReminder(params) {
  return request(`/birthday-reminder/reminder/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 修改生日提醒时间
 * @param {*} params
 */
export async function reminderCron(params) {
  return request(`/birthday-reminder/change_cron`, {
    method: 'PUT',
    data: params,
  });
}
