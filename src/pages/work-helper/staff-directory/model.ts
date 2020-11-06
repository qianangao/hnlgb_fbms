import { staffDirectoryList, detailStaffDirectory } from './service';

const Model = {
  namespace: 'staffDirectory',
  state: {
    staffDirectoryData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailStaffDirectoryData: {},
  },
  effects: {
    *staffDirectoryList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.staffDirectory.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(staffDirectoryList, params);

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
            staffDirectoryData: result,
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

    *detailStaffDirectory({ payload, resolve }, { call, put }) {
      const response = yield call(detailStaffDirectory, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailStaffDirectoryData: response,
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
