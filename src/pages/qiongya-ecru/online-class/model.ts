import { message } from 'antd';
import {
  addOnlineClass,
  deleteOnlineClass,
  updateOnlineClass,
  onlineClassList,
  detailOnlineClass,
} from './service';

const Model = {
  namespace: 'onlineClass',
  state: {
    onlineClassData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailOnlineClassData: {},
  },
  effects: {
    *onlineClassList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.receiveFile.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(onlineClassList, params);

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
            onlineClassData: result,
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

    *addOnlineClass({ payload, resolve }, { call, put }) {
      const response = yield call(addOnlineClass, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('网络课堂新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateOnlineClass({ payload, resolve }, { call, put }) {
      const response = yield call(updateOnlineClass, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('网络课堂修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteOnlineClass({ payload }, { call, put }) {
      const response = yield call(deleteOnlineClass, payload);

      if (!response.error) {
        message.success('网络课堂删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailOnlineClass({ payload, resolve }, { call, put }) {
      const response = yield call(detailOnlineClass, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailOnlineClassData: response,
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
