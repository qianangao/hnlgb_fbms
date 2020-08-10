import { message } from 'antd';
import { addInspection, updateInspection, deleteInspection, getInspectionList } from './service';

const Model = {
  namespace: 'inspectionMgt',
  state: {
    inspectionList: {
      data: [],
      page: 1,
      pageSize: 10,
      success: undefined,
      total: 0,
    },
    modifyModalVisible: false, // 新增修改modal visible
    tableRef: {},
  },
  effects: {
    *getList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getInspectionList, params);

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
            inspectionList: result,
          },
        });
      }
    },
    *addInspection({ payload }, { call, put }) {
      const response = yield call(addInspection, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success('新增巡检成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateInspection({ payload }, { call, put }) {
      const response = yield call(updateInspection, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success('修改巡检信息成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteInspection({ payload }, { call, put }) {
      const response = yield call(deleteInspection, payload);

      message.success('巡检删除成功！');

      if (!response.error) {
        yield put({
          type: 'tableReload',
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
