import { message } from 'antd';
import {
  addRelocated,
  deleteRelocated,
  updateRelocated,
  relocatedList,
  detailRelocated,
} from './service';

const Model = {
  namespace: 'relocated',
  state: {
    relocatedListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *relocatedList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.relocated.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(relocatedList, params);

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
            relocatedListData: result,
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
    *addRelocated({ payload, resolve }, { call, put }) {
      const response = yield call(addRelocated, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('新增易地安置成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateRelocated({ payload, resolve }, { call, put }) {
      const response = yield call(updateRelocated, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改易地安置成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteRelocated({ payload }, { call, put }) {
      const response = yield call(deleteRelocated, payload);

      if (!response.error) {
        message.success('易地安置删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailRelocated({ payload, resolve }, { call }) {
      const response = yield call(detailRelocated, payload);

      if (!response.error) {
        resolve && resolve(response);
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
