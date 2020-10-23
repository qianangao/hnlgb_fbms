import request from '@/utils/request';

/**
 * 证照登记-列表
 * @param {*} params
 */
export async function licenseRegisterInfoList(params) {
  return request('/licence_register', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-证照登记
 * @param {*} params
 */
export async function deleteLicenseRegisterInfo(params) {
  return request(`/licence_register`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-证照登记
 * @param {*} params
 */
export async function addLicenseRegisterInfo(params) {
  return request(`/licence_register`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 证照登记-详情
 * @param {*} params
 */
export async function detailLicenseRegisterInfo(params) {
  return request(`/outbound_record/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-证照登记
 * @param {*} params
 */
export async function updateLicenseRegisterInfo(params) {
  return request(`/licence_register/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
