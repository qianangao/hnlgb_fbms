import { message } from 'antd';
import moment from 'moment';

import {
  getSupportDifficultList,
  updateSupportDifficult,
  addSupportDifficult,
  deleteSupportDifficult,
  detailSupportDifficult,
} from './service';

const Model = {
  namespace: 'wrSupportDifficult',
  state: {
    visitListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailSupportDifficultData: {},
  },
  effects: {
    *getSupportDifficultList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.wrSupportDifficult.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const { searchTime } = params;

      if (searchTime && searchTime.length === 2) {
        params.searchTimeStart = moment(searchTime[0]).format('YYYY-MM-DD');
        params.searchTimeEnd = moment(searchTime[1]).format('YYYY-MM-DD');
      }

      delete params.searchTime;
      const response = yield call(getSupportDifficultList, params);

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
            visitListData: result,
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

    *addSupportDifficult({ payload, resolve }, { call, put }) {
      const response = yield call(addSupportDifficult, payload);
      if (!response.error) {
        resolve && resolve(response);

        message.success('新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },

    *updateSupportDifficult({ payload, resolve }, { call, put }) {
      const response = yield call(updateSupportDifficult, payload);
      if (!response.error) {
        resolve && resolve(response);

        message.success('修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteSupportDifficult({ payload }, { call, put }) {
      const response = yield call(deleteSupportDifficult, payload);

      if (!response.error) {
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *detailSupportDifficult({ payload, resolve }, { call, put }) {
      const response = yield call(detailSupportDifficult, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailSupportDifficultData: response,
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
