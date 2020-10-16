import { message } from 'antd';
import {
  addApproveRecord,
  deleteApproveRecord,
  updateApproveRecord,
  approveRecordList,
  detailApproveRecord,
} from './service';

const Model = {
  namespace: 'wrApproveRecord',
  state: {
    approveRecordListData: {},
    modifyModalVisible: false, // 新增修改modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *approveRecordList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.wrApproveRecord.selectedOrgId);
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
      const response = yield call(approveRecordList, params);

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
            approveRecordListData: result,
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
    *addApproveRecord({ payload }, { call, put }) {
      const response = yield call(addApproveRecord, payload);

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
    *updateApproveRecord({ payload }, { call, put }) {
      const response = yield call(updateApproveRecord, payload);

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
    *deleteApproveRecord({ payload }, { call, put }) {
      const response = yield call(deleteApproveRecord, payload);

      if (!response.error) {
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailApproveRecord({ payload, resolve }, { call }) {
      const response = yield call(detailApproveRecord, payload);

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