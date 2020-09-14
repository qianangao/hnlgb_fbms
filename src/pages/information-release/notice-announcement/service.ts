import request from '@/utils/request';

/**
 * 新闻动态-列表
 * @param {*} params
 */
export async function noticeAnnouncementList(params) {
  return request('/noticeAnnouncement', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-新闻动态
 * @param {*} params
 */
export async function deleteNoticeAnnouncement(params) {
  return request(`/noticeAnnouncement`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-新闻动态
 * @param {*} params
 */
export async function addNoticeAnnouncement(params) {
  return request(`/noticeAnnouncement`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 新闻动态-详情
 * @param {*} params
 */
export async function detailNoticeAnnouncement(params) {
  return request(`/noticeAnnouncement/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-新闻动态
 * @param {*} params
 */
export async function updateNoticeAnnouncement(params) {
  return request(`/noticeAnnouncement/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
