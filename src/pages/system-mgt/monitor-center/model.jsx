import { getSummaryData, getMonitorPersonList } from './service';

const Model = {
  namespace: 'smMonitorCenter',
  state: {
    sumData: {},
    selectMonitorItem: {},
    monitorPersonList: {
      data: [],
      page: 1,
      pageSize: 20,
      success: false,
      total: 0,
    },
  },
  effects: {
    *getSummaryData({ payload }, { call, put, select }) {
      const { organizationId } = yield select(state => state.user.userInfo);

      const response = yield call(getSummaryData, {
        orgIdForDataSelect: organizationId,
        ...payload,
      });

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            sumData: response,
          },
        });
      }
    },
    *getMonitorPersonList({ payload, resolve }, { select, call, put }) {
      const selectMonitorItem = yield select(state => state.smMonitorCenter.selectMonitorItem);
      const { organizationId } = yield select(state => state.user.userInfo);
      let type = 0;
      // 1-老同志月活跃数，2-工作人员月活跃数,3-老干部登陆总数，4-工作人员登陆总数
      switch (selectMonitorItem.field) {
        case 'cadreActiveNum':
          type = 1;
          break;
        case 'staffActiveNum':
          type = 2;
          break;
        case 'lgbLoginNum':
          type = 3;
          break;
        case 'workLoginNum':
          type = 4;
          break;
        default:
          break;
      }

      const params = {
        ...payload,
        type,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      params.orgIdForDataSelect || (params.orgIdForDataSelect = organizationId);
      const response = yield call(getMonitorPersonList, params);

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
            monitorPersonList: result,
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
