import { message } from 'antd';
import {
  addOutRegisterInfo,
  deleteOutRegisterInfo,
  updateOutRegisterInfo,
  outRegisterInfoList,
  detailOutRegisterInfo,
} from './service';

const Model = {
  namespace: 'outRegister',
  state: {
    outRegisterInfoListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *outRegisterInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.licenseRegister.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,

        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(outRegisterInfoList, params);

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
            outRegisterInfoListData: result,
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
    *addOutRegisterInfo({ payload, resolve }, { call, put }) {
      const response = yield call(addOutRegisterInfo, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增外出登记成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateOutRegisterInfo({ payload, resolve }, { call, put }) {
      const response = yield call(updateOutRegisterInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改住院登记成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteOutRegisterInfo({ payload }, { call, put }) {
      const response = yield call(deleteOutRegisterInfo, payload);

      if (!response.error) {
        message.success('外出登记删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailOutRegisterInfo({ payload, resolve }, { call }) {
      const response = yield call(detailOutRegisterInfo, payload);

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
