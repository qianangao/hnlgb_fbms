import { dailyBroadcastList, detailDailyBroadcast } from './service';

const Model = {
  namespace: 'dailyBroadcast',
  state: {
    dailyBroadcastData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    publishStatus: 1, // type  0 草稿箱 ， 1 已发布
    detailDailyBroadcastData: {},
  },
  effects: {
    *dailyBroadcastList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.dailyBroadcast.selectedOrgId);
      const publishStatus = yield select(state => state.dailyBroadcast.publishStatus);
      const params = {
        ...payload,
        orgIdForDataSelect,
        status: publishStatus,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(dailyBroadcastList, params);

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
            dailyBroadcastData: result,
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

    *detailDailyBroadcast({ payload, resolve }, { call, put }) {
      const response = yield call(detailDailyBroadcast, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailDailyBroadcastData: response,
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
