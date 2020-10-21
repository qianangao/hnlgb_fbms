import request from '@/utils/request';

/**
 * 新闻动态-列表
 * @param {*} params
 */
export async function noticeAnnouncementList(params) {
  return request('/notice', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-新闻动态
 * @param {*} params
 */
export async function deleteNoticeAnnouncement(params) {
  return request(`/notice`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-新闻动态
 * @param {*} params
 */
export async function addNoticeAnnouncement(params) {
  return request(`/notice`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 新闻动态-详情
 * @param {*} params
 */
export async function detailNoticeAnnouncement(params) {
  return request(`/notice/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-新闻动态
 * @param {*} params
 */
export async function updateNoticeAnnouncement(params) {
  return request(`/notice/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
