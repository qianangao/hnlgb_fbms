import { message } from 'antd';
import {
  addDifferentLivingInfo,
  deleteDifferentLivingInfo,
  updateDifferentLivingInfo,
  differentLivingInfoList,
  detailDifferentLivingInfo,
} from './service';

const Model = {
  namespace: 'differentLivingPlaces',
  state: {
    differentLivingInfoListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *differentLivingInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.differentLivingPlaces.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(differentLivingInfoList, params);

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
            differentLivingInfoListData: result,
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
    *addDifferentLivingInfo({ payload, resolve }, { call, put }) {
      const response = yield call(addDifferentLivingInfo, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增异地居住成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateDifferentLivingInfo({ payload, resolve }, { call, put }) {
      const response = yield call(updateDifferentLivingInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改异地居住成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteDifferentLivingInfo({ payload }, { call, put }) {
      const response = yield call(deleteDifferentLivingInfo, payload);

      if (!response.error) {
        message.success('异地居住删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailDifferentLivingInfo({ payload, resolve }, { call }) {
      const response = yield call(detailDifferentLivingInfo, payload);

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
