import request from '@/utils/request';

/**
 * 外出登记-列表
 * @param {*} params
 */
export async function outRegisterInfoList(params) {
  return request('/outbound_record', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-外出登记
 * @param {*} params
 */
export async function deleteOutRegisterInfo(params) {
  return request(`/outbound_record`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-外出登记
 * @param {*} params
 */
export async function addOutRegisterInfo(params) {
  return request(`/outbound_record`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 外出登记-详情
 * @param {*} params
 */
export async function detailOutRegisterInfo(params) {
  return request(`/outbound_record/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-外出登记
 * @param {*} params
 */
export async function updateOutRegisterInfo(params) {
  return request(`/outbound_record/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
