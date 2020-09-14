import { message } from 'antd';
import {
  addElderlyPolicyInfo,
  deleteElderlyPolicyInfo,
  updateElderlyPolicyInfo,
  elderlyPolicyInfoList,
  detailElderlyPolicyInfo,
} from './service';

const Model = {
  namespace: 'elderlyPolicy',
  state: {
    elderlyPolicyInfoListData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *elderlyPolicyInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.elderlyPolicy.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(elderlyPolicyInfoList, params);

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
            elderlyPolicyInfoListData: result,
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
    *addElderlyPolicyInfo({ payload }, { call, put }) {
      const response = yield call(addElderlyPolicyInfo, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });

        message.success('新增活动中心成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateElderlyPolicyInfo({ payload }, { call, put }) {
      const response = yield call(updateElderlyPolicyInfo, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success('修改活动中心成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteElderlyPolicyInfo({ payload }, { call, put }) {
      const response = yield call(deleteElderlyPolicyInfo, payload);

      if (!response.error) {
        message.success('活动中心删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailElderlyPolicyInfo({ payload, resolve }, { call }) {
      const response = yield call(detailElderlyPolicyInfo, payload);

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
