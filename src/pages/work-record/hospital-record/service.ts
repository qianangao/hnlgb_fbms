import request from '@/utils/request';

/**
 * 住院登记-列表
 * @param {*} params
 */
export async function hospitalRegistrationInfoList(params) {
  return request('/hospital_register', {
    method: 'GET',
    params,
  });
}

/**
 * 删除-住院登记
 * @param {*} params
 */
export async function deleteHospitalRegistrationInfo(params) {
  return request(`/hospital_register`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增-住院登记
 * @param {*} params
 */
export async function addHospitalRegistrationInfo(params) {
  return request(`/hospital_register`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 住院登记-详情
 * @param {*} params
 */
export async function detailHospitalRegistrationInfo(params) {
  return request(`/hospital_register/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 编辑-住院登记
 * @param {*} params
 */
export async function updateHospitalRegistrationInfo(params) {
  return request(`/hospital_register/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 审核-住院登记
 * @param {*} params
 */
export async function approvalHospitalRegistrationInfo(params) {
  return request(`/hospital_register/audit/${params.id}/${params.status}`, {
    method: 'PUT',
    data: params,
  });
}
