import { message } from 'antd';
import {
  getVisitList,
  updateVisit,
  addVisit,
  deleteVisit,
  detailVisit,
  getVisitStatistics,
} from './service';

const Model = {
  namespace: 'wrVisitsCondolences',
  state: {
    visitListData: {},
    visiStatisticsData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailVisitData: {},
    visitTotalNumber: '',
  },
  effects: {
    *getVisitList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.wrVisitsCondolences.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const { searchTime } = params;

      if (searchTime && searchTime.length === 2) {
        [params.searchTimeStart, params.searchTimeEnd] = searchTime;
      }

      delete params.searchTime;
      const response = yield call(getVisitList, params);

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
            visitListData: result,
          },
        });
      }
    },

    *getVisitStatistics({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.wrVisitsCondolences.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
      };
      const { searchTime } = params;

      if (searchTime && searchTime.length === 2) {
        [params.searchTimeStart, params.searchTimeEnd] = searchTime;
      }

      delete params.searchTime;
      const response = yield call(getVisitStatistics, params);

      if (!response.error) {
        const { items, totalNum } = response;

        const result = {
          data: items,
          success: true,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            visiStatisticsData: result,
            visitTotalNumber: totalNum,
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

    *addVisit({ payload }, { call, put }) {
      const response = yield call(addVisit, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });

        message.success('新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },

    *updateVisit({ payload }, { call, put }) {
      const response = yield call(updateVisit, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success('修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteVisit({ payload }, { call, put }) {
      const response = yield call(deleteVisit, payload);

      if (!response.error) {
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *detailVisit({ payload, resolve }, { call, put }) {
      const response = yield call(detailVisit, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailVisitData: response,
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