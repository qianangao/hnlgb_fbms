import { message } from 'antd';
import {
  addDailyBroadcast,
  deleteDailyBroadcast,
  updateDailyBroadcast,
  dailyBroadcastList,
  detailDailyBroadcast,
} from './service';

const Model = {
  namespace: 'dailyBroadcast',
  state: {
    dailyBroadcastData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    status: 1, // type  0 草稿箱 ， 1 已发布
    detailDailyBroadcastData: {},
  },
  effects: {
    *dailyBroadcastList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.dailyBroadcast.selectedOrgId);
      const status = yield select(state => state.dailyBroadcast.status);
      const params = {
        ...payload,
        orgIdForDataSelect,
        status,
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

    *publishStatusChange({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          status: payload,
        },
      });

      yield put({
        type: 'tableReload',
      });
    },

    *addDailyBroadcast({ payload }, { call, put }) {
      const response = yield call(addDailyBroadcast, payload);
      if (!response.error) {
        const { status } = payload;
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });
        message.success(status == 0 ? '每日播报新增成功！' : '每日播报发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateDailyBroadcast({ payload }, { call, put }) {
      const response = yield call(updateDailyBroadcast, payload);
      const { status } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success(status == 0 ? '每日播报修改成功！' : '每日播报发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteDailyBroadcast({ payload }, { call, put }) {
      const response = yield call(deleteDailyBroadcast, payload);

      if (!response.error) {
        message.success('新闻每日播报成功！');
        yield put({
          type: 'tableReload',
        });
      }
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
