import { message } from 'antd';
import moment from 'moment';
import {
  getVisitList,
  updateVisit,
  addVisit,
  deleteVisit,
  detailVisit,
  getVisitStatistics,
  getDeathMemberList,
} from './service';

const Model = {
  namespace: 'wrVisitsCondolences',
  state: {
    visitListData: {},
    visiStatisticsData: {},
    memberListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailVisitData: {},
    totalNumber: '',
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
        params.searchTimeStart = moment(searchTime[0]).format('YYYY-MM-DD');
        params.searchTimeEnd = moment(searchTime[1]).format('YYYY-MM-DD');
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
    *getDeathMemberList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.wrVisitsCondolences.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getDeathMemberList, params);
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
            memberListData: result,
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
        params.searchTimeStart = moment(searchTime[0]).format('YYYY-MM-DD');
        params.searchTimeEnd = moment(searchTime[1]).format('YYYY-MM-DD');
      }

      delete params.searchTime;
      const response = yield call(getVisitStatistics, params);

      if (!response.error) {
        const { statistics, totalNumber } = response;

        const result = {
          data: statistics,
          success: true,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            visiStatisticsData: result,
            totalNumber,
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

    *addVisit({ payload, resolve }, { call, put }) {
      const response = yield call(addVisit, payload);
      if (!response.error) {
        resolve && resolve(response);

        message.success('新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },

    *updateVisit({ payload, resolve }, { call, put }) {
      const response = yield call(updateVisit, payload);
      if (!response.error) {
        resolve && resolve(response);

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
