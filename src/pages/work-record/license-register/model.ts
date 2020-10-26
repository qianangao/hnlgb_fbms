import { message } from 'antd';
import {
  addLicenseRegisterInfo,
  deleteLicenseRegisterInfo,
  updateLicenseRegisterInfo,
  licenseRegisterInfoList,
  detailLicenseRegisterInfo,
} from './service';

const Model = {
  namespace: 'licenseRegister',
  state: {
    licenseRegisterInfoListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *licenseRegisterInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.licenseRegister.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,

        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(licenseRegisterInfoList, params);
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
            licenseRegisterInfoListData: result,
          },
        });
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
    *addLicenseRegisterInfo({ payload, resolve }, { call, put }) {
      const response = yield call(addLicenseRegisterInfo, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增证照登记成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateLicenseRegisterInfo({ payload }, { call, put }) {
      const response = yield call(updateLicenseRegisterInfo, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success('修改证照登记成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteLicenseRegisterInfo({ payload }, { call, put }) {
      const response = yield call(deleteLicenseRegisterInfo, payload);

      if (!response.error) {
        message.success('证照登记删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailLicenseRegisterInfo({ payload, resolve }, { call }) {
      const response = yield call(detailLicenseRegisterInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
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
