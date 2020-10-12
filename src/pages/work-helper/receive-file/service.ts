import request from '@/utils/request';

/**
 * 收发文件-列表
 * @param {*} params
 */
export async function receiveFileList(params) {
  return request('/receiveFile', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-收发文件
 * @param {*} params
 */
export async function deleteReceiveFile(params) {
  return request(`/receiveFile`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-收发文件
 * @param {*} params
 */
export async function addReceiveFile(params) {
  return request(`/receiveFile`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 收发文件-详情
 * @param {*} params
 */
export async function detailReceiveFile(params) {
  return request(`/receiveFile/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-收发文件
 * @param {*} params
 */
export async function updateReceiveFile(params) {
  return request(`/receiveFile/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}