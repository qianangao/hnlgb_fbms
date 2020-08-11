import request from '@/utils/request';
/**
 * 上传文件到文件服务器
 * @param {*} params 登陆信息
 */
export async function uploadFile(params) {
  return request('/lgbsmp/api/v1/attachmentsftpto', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取用户下载文件列表
 * @param {*} params
 */
export async function getDownloadFiles(params) {
  return request('/lgbsmp/api/v1/download_center/user', {
    method: 'GET',
    params,
  });
}

/**
 * 删除用户下载文件缓存
 * @param {*} params
 */
export async function deleteDownloadFiles(params) {
  return request('/lgbsmp/api/v1/download_center', {
    method: 'DELETE',
    data: params,
  });
}
