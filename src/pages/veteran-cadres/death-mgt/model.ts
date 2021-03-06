import { message } from 'antd';
import moment from 'moment';
import {
  deleteLgb,
  updateLgb,
  getLgbList,
  initReminiscence,
  getSpouseInfo,
  exportRecord,
} from './service';

const Model = {
  namespace: 'vcDeathInfo',
  state: {
    lgbListData: {},
    surviviorValues: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.vcDeathInfo.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const { dateOfBirth } = params;

      if (dateOfBirth && dateOfBirth.length === 2) {
        params.dateOfBirthStart = moment(dateOfBirth[0]).format('YYYY-MM-DD');
        params.dateOfBirthEnd = moment(dateOfBirth[1]).format('YYYY-MM-DD');
      }

      delete params.dateOfBirth;
      const { dieDate } = params;

      if (dieDate && dieDate.length === 2) {
        params.dieDateStart = moment(dieDate[0]).format('YYYY-MM-DD');
        params.dieDateEnd = moment(dieDate[1]).format('YYYY-MM-DD');
      }

      delete params.dieDate;

      const response = yield call(getLgbList, params);

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
            lgbListData: result,
          },
        });
      }
    },

    *getSpouseInfo({ payload, resolve }, { put, call }) {
      const response = yield call(getSpouseInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            surviviorValues: response,
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

    *updateLgb({ payload, resolve }, { call, put }) {
      const response = yield call(updateLgb, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改老干部离世信息成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteLgb({ payload }, { call, put }) {
      const response = yield call(deleteLgb, payload);

      if (!response.error) {
        message.success('老干部恢复在世成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *initReminiscence({ payload, resolve }, { call, put }) {
      const response = yield call(initReminiscence, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('追思缅怀活动发起成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *exportRecord({ payload, resolve }, { call, put }) {
      const response = yield call(exportRecord, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('离世信息导出成功！');
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
