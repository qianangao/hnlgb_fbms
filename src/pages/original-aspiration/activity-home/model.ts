import { message } from 'antd';
import {
  getActivityList,
  addActivity,
  deleteActivity,
  updateActivity,
  detailActivity,
} from './service';

const Model = {
  namespace: 'oaActivityHome',
  state: {
    ActivityListData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailActivityData: {},
  },
  effects: {
    *getActivityList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.oaActivityHome.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getActivityList, params);

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
            ActivityListData: result,
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

    *addActivity({ payload }, { call, put }) {
      const response = yield call(addActivity, payload);
      const { isPublished } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });
        message.success(isPublished === 0 ? '活动信息新增成功！' : '活动信息发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateActivity({ payload }, { call, put }) {
      const response = yield call(updateActivity, payload);
      const { isPublished } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success(isPublished === 0 ? '活动信息修改成功！' : '活动信息发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteActivity({ payload }, { call, put }) {
      const response = yield call(deleteActivity, payload);

      if (!response.error) {
        message.success('活动信息删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailActivity({ payload, resolve }, { call, put }) {
      const response = yield call(detailActivity, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailActivityData: response,
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
