import { message } from 'antd';
import moment from 'moment';
import { downloadXlsFile } from '@/utils';
import { encrypt } from '@/utils/format';
import {
  addLgb,
  deleteLgb,
  getLgbList,
  importLgbs,
  exportLgbsAsync,
  exportLgbs,
  updateLgbOrg,
  resetLgbPwd,
  getLgbDetail,
  updateLgb,
  getFamilyLgb,
  updateFamilyLgb,
  getPartTimeLgb,
  updatePartTimeLgb,
  getHealthyLgb,
  updateHealthyLgb,
  checkPassword,
  updatePhotoInfo,
  deletePhotoInfo,
  addPhotoInfo,
} from './service';

const Model = {
  namespace: 'vcBasicInfo',
  state: {
    lgbListData: {},
    lgbDetailData: {},
    lgbFamilyData: {},
    lgbPartTimeData: {},
    lgbHealthyData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.vcBasicInfo.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      if (payload.idCard) {
        params.idCard = encrypt(payload.idCard);
      } else {
        delete params.idCard;
      }

      const { dateOfBirth } = params;

      if (dateOfBirth && dateOfBirth.length === 2) {
        params.dateOfBirthStart = moment(dateOfBirth[0]).format('YYYY-MM-DD');
        params.dateOfBirthEnd = moment(dateOfBirth[1]).format('YYYY-MM-DD');
      }

      delete params.dateOfBirth;

      const response = yield call(getLgbList, params);

      if (!response.error) {
        const { items, currentPage, totalNum } = response;

        const result = {
          data: items,
          page: currentPage,
          pageSize: payload.pageSize,
          success: true,
          total: totalNum,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            lgbListData: result,
          },
        });
      }
    },
    *importLgbs({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.vcBasicInfo.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      if (!payload) {
        return;
      }

      const response = yield call(importLgbs, {
        url: payload.url,
        orgId: selectedOrgId || organizationId,
      });

      resolve && resolve(response);

      if (!response.error) {
        if (!response || response.length === 0) {
          message.success('老干部信息批量导入成功！');
          yield put({
            type: 'tableReload',
          });
        }
      }
    },
    *exportList({ payload }, { call, put, select }) {
      const MAX_EXPORT_VALUE = 3000; // 同步导出数据的最大条数
      const selectedOrgId = yield select(state => state.vcBasicInfo.selectedOrgId);
      const { total } = yield select(state => state.vcBasicInfo.lgbListData);
      const { organizationId } = yield select(state => state.user.userInfo);

      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
      };

      const { dateOfBirth } = params;

      if (dateOfBirth && dateOfBirth.length === 2) {
        params.dateOfBirthStart = moment(dateOfBirth[0]).format('YYYY-MM-DD');
        params.dateOfBirthEnd = moment(dateOfBirth[1]).format('YYYY-MM-DD');
      }

      delete params.dateOfBirth;

      if (params.ids || total < MAX_EXPORT_VALUE) {
        const response = yield call(exportLgbs, params);

        if (!response.error) {
          yield downloadXlsFile(response, `人员列表${moment().format('MM-DD HH:mm:ss')}.xls`);
        }
      } else {
        const fileName = `人员列表${moment().format('MM-DD HH:mm:ss')}.xls`;
        params.name = fileName;
        const response = yield call(exportLgbsAsync, params);

        message.info('文件导出中，请在用户信息栏通知中查看');

        if (!response.error) {
          yield put({
            type: 'global/refreshDownloadFiles',
          });
        }
      }
    },
    *selectOrgChange({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          selectedOrgId: payload,
        },
      });

      yield put({
        type: 'tableReload',
      });
    },
    *updateLgbOrg({ payload, resolve }, { call, put }) {
      const response = yield call(updateLgbOrg, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改所选老干部单位成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *resetLgbPwd({ payload }, { call, put }) {
      const response = yield call(resetLgbPwd, payload);

      if (!response.error) {
        message.success('老干部账号密码重置成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addLgb({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
      };
      if (payload.startWorkTime) {
        params.startWorkTime = `${payload.startWorkTime}-01`;
      }
      if (payload.treatmentApproveTime) {
        params.treatmentApproveTime = `${payload.treatmentApproveTime}-01`;
      }
      const response = yield call(addLgb, params);

      if (!response.error) {
        resolve && resolve(response);
        message.success('新增老干部成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteLgb({ payload }, { call, put }) {
      const response = yield call(deleteLgb, payload);

      if (!response.error) {
        message.success('老干部删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *getLgbDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getLgbDetail, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            lgbDetailData: response,
          },
        });
      }
    },
    *updateLgb({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
      };
      if (payload.startWorkTime && payload.startWorkTime.length === 7) {
        params.startWorkTime = `${payload.startWorkTime}-01`;
      }
      if (payload.treatmentApproveTime && payload.treatmentApproveTime.length === 7) {
        params.treatmentApproveTime = `${payload.treatmentApproveTime}-01`;
      }
      const response = yield call(updateLgb, params);

      if (!response.error) {
        message.success('修改老干部信息成功！');

        yield resolve && resolve();
        yield put({
          type: 'tableReload',
        });
      }
    },
    *getFamilyLgb({ payload, resolve }, { call, put }) {
      const response = yield call(getFamilyLgb, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            lgbFamilyData: response,
          },
        });
      }
    },
    *updateFamilyLgb({ payload, resolve }, { call }) {
      const response = yield call(updateFamilyLgb, payload);

      if (!response.error) {
        message.success('修改老干部家庭信息成功！');
        yield resolve && resolve();
      }
    },
    *getPartTimeLgb({ payload, resolve }, { call, put }) {
      const response = yield call(getPartTimeLgb, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            lgbPartTimeData: response,
          },
        });
      }
    },
    *updatePartTimeLgb({ payload, resolve }, { call }) {
      const response = yield call(updatePartTimeLgb, payload);

      if (!response.error) {
        message.success('修改老干部社会兼职信息成功！');
        yield resolve && resolve();
      }
    },
    *getHealthyLgb({ payload, resolve }, { call, put }) {
      const response = yield call(getHealthyLgb, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            lgbHealthyData: response,
          },
        });
      }
    },
    *updateHealthyLgb({ payload, resolve }, { call }) {
      const response = yield call(updateHealthyLgb, payload);

      if (!response.error) {
        message.success('修改老干部健康档案信息成功！');
        yield resolve && resolve();
      }
    },

    *checkPassword({ payload, resolve }, { call }) {
      const response = yield call(checkPassword, payload);

      if (response === true) {
        resolve && resolve(response);
        message.success('密码校验成功！');
      } else {
        message.error('密码校验失败！');
      }
    },
    *updatePhotoInfo({ payload, resolve }, { call }) {
      const response = yield call(updatePhotoInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改照片信息成功！');
      }
    },
    *deletePhotoInfo({ payload }, { call }) {
      const response = yield call(deletePhotoInfo, payload);

      if (!response.error) {
        message.success('照片信息删除成功！');
      }
    },
    *addPhotoInfo({ payload, resolve }, { call }) {
      const response = yield call(addPhotoInfo, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增照片信息成功！');
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    tableReload(state) {
      const tableRef = state.tableRef || {};
      setTimeout(() => {
        tableRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};
export default Model;
