import moment from 'moment';
import { getDownloadList } from './service';

const Model = {
  namespace: 'smDownloadMgt',
  state: {
    downloadListData: {},
  },
  effects: {
    *getDownloadList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const { gmtCreate } = params;

      if (gmtCreate && gmtCreate.length === 2) {
        params.downloadDateFrom = moment(gmtCreate[0]).format('YYYY-MM-DD');
        params.downloadDateTo = moment(gmtCreate[1]).format('YYYY-MM-DD');
      }

      delete params.gmtCreate;

      const response = yield call(getDownloadList, params);

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
            downloadListData: result,
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
