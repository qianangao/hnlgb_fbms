import request from '@/utils/request';

/**
 * 待办事项-列表
 * @param {*} params
 */
export async function toDoList(params) {
  return request('/worker_pend_events', {
    method: 'GET',
    params,
  });
}
