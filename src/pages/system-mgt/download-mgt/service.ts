import request from '@/utils/request';

/**
 * 获取所有下载记录
 * @param {*} params
 */
export async function getDownloadList(params) {
  return request('/download_center/user/all', {
    method: 'GET',
    params,
  });
}
