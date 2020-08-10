import { getInspectLog } from './service';

const Model = {
  namespace: 'inspectLog',
  state: {
    logList: {
      data: [],
      page: 1,
      pageSize: 10,
      success: undefined,
      total: 0,
    },
  },
  effects: {
    *getList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getInspectLog, params);

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
            logList: result,
          },
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
