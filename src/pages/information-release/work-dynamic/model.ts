import { message } from 'antd';
import {
  addWorkDynamic,
  deleteWorkDynamic,
  updateWorkDynamic,
  workDynamicList,
  detailWorkDynamic,
} from './service';

const Model = {
  namespace: 'workDynamic',
  state: {
    workDynamicData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailWorkDynamicData: {},
  },
  effects: {
    *workDynamicList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.workDynamic.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(workDynamicList, params);

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
            workDynamicData: result,
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

    *addWorkDynamic({ payload, resolve }, { call, put }) {
      const response = yield call(addWorkDynamic, payload);
      const publishStatus = payload.status;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishStatus === 0 ? '工作动态新增成功！' : '工作动态发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateWorkDynamic({ payload, resolve }, { call, put }) {
      const response = yield call(updateWorkDynamic, payload);
      const publishStatus = payload.status;
      if (!response.error) {
        resolve && resolve(response);

        message.success(publishStatus === 0 ? '工作动态修改成功！' : '工作动态发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteWorkDynamic({ payload }, { call, put }) {
      const response = yield call(deleteWorkDynamic, payload);

      if (!response.error) {
        message.success('工作动态删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailWorkDynamic({ payload, resolve }, { call, put }) {
      const response = yield call(detailWorkDynamic, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailWorkDynamicData: response,
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
