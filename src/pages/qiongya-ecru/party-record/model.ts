import { message } from 'antd';
import {
  addPartyRecord,
  deletePartyRecord,
  updatePartyRecord,
  partyRecordList,
  detailPartyRecord,
  exportPartyRecord,
} from './service';

const Model = {
  namespace: 'partyRecord',
  state: {
    partyRecordData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailPartyRecordData: {},
  },
  effects: {
    *partyRecordList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.partyRecord.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(partyRecordList, params);

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
            partyRecordData: result,
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

    *addPartyRecord({ payload, resolve }, { call, put }) {
      const response = yield call(addPartyRecord, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('党费记录新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updatePartyRecord({ payload, resolve }, { call, put }) {
      const response = yield call(updatePartyRecord, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('党费记录修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deletePartyRecord({ payload }, { call, put }) {
      const response = yield call(deletePartyRecord, payload);
      if (!response.error) {
        message.success('党费记录新增删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailPartyRecord({ payload, resolve }, { call, put }) {
      const response = yield call(detailPartyRecord, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailPartyRecordData: response,
          },
        });
      }
    },
    *exportPartyRecord({ payload, resolve }, { call, put }) {
      const response = yield call(exportPartyRecord, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('党费记录导出成功！');
        yield put({
          type: 'save',
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
