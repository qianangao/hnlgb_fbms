import request from '@/utils/request';

/**
 * 银色人才-列表
 * @param {*} params
 */
export async function specialtyList(params) {
  return request('/specialty', {
    method: 'GET',
    params,
  });
}

/**
 * 新增-银色人才
 * @param {*} params
 */
export async function addSpecialty(params) {
  return request(`/specialty`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除-银色人才
 * @param {*} params
 */
export async function deleteSpecialty(params) {
  return request(`/specialty`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 银色人才-详情
 * @param {*} params
 */
export async function getLgbDetail(params) {
  return request(`/specialty/${params.id}`, {
    method: 'GET',
    params,
  });
}


/**
 * 编辑-银色人才
 * @param {*} params
 */
export async function updateSpecialty(params) {
  return request(`/specialty/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}