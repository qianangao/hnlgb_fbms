import { message } from 'antd';
import {
  addPolicyStipulate,
  deletePolicyStipulate,
  updatePolicyStipulate,
  policyStipulateList,
  detailPolicyStipulate,
} from './service';

const Model = {
  namespace: 'policyStipulate',
  state: {
    policyStipulateData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailPolicyStipulateData: {},
  },
  effects: {
    *policyStipulateList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.policyStipulate.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(policyStipulateList, params);

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
            policyStipulateData: result,
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

    *addPolicyStipulate({ payload }, { call, put }) {
      const response = yield call(addPolicyStipulate, payload);
      const publishStatus = payload.isRelease;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });
        message.success(
          publishStatus === 0 ? '政策规定与解答新增成功！' : '政策规定与解答发布成功！',
        );
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updatePolicyStipulate({ payload }, { call, put }) {
      const response = yield call(updatePolicyStipulate, payload);
      const publishStatus = payload.isRelease;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success(
          publishStatus === 0 ? '政策规定与解答修改成功！' : '政策规定与解答发布成功！',
        );

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deletePolicyStipulate({ payload }, { call, put }) {
      const response = yield call(deletePolicyStipulate, payload);

      if (!response.error) {
        message.success('政策规定与解答删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailPolicyStipulate({ payload, resolve }, { call, put }) {
      const response = yield call(detailPolicyStipulate, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailPolicyStipulateData: response,
          },
        });
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
