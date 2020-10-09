import { message } from 'antd';
import {
  addStudyRecord,
  deleteStudyRecord,
  updateStudyRecord,
  studyRecordList,
  detailStudyRecord,
} from './service';

const Model = {
  namespace: 'studyRecord',
  state: {
    studyRecordData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailStudyRecordData: {},
    partyUserListData: {},
  },
  effects: {
    *studyRecordList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.studyRecord.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(studyRecordList, params);

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
            studyRecordData: result,
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

    *addStudyRecord({ payload }, { call, put }) {
      const response = yield call(addStudyRecord, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });
        message.success('学习记录新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateStudyRecord({ payload }, { call, put }) {
      const response = yield call(updateStudyRecord, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });
        message.success('学习记录修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteStudyRecord({ payload }, { call, put }) {
      const response = yield call(deleteStudyRecord, payload);
      if (!response.error) {
        message.success('学习记录新增删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailStudyRecord({ payload, resolve }, { call, put }) {
      const response = yield call(detailStudyRecord, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailStudyRecordData: response,
          },
        });
      }
    },
    *partyUserList({ payload, resolve }, { call, put }) {
      const response = yield call(partyUserList, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            partyUserListData: response,
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
