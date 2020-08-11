import request from '@/utils/request';
/**
 * 账户登录
 * @param {*} params 登陆信息
 */
export async function accountLogin(params) {
  return request('/login', {
    method: 'POST',
    data: params,
  });
}

/**
 * 账户登出
 * @param {*} params
 */
export async function accountLogout(params) {
  return request('/logout', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取手机验证码
 * @param {*} params
 */
export async function getCaptcha(params) {
  return request('/sdsmp/api/v1/verification-code/login', {
    method: 'POST',
    data: params,
  });
}
