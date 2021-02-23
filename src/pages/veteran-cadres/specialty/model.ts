import { message } from 'antd';
import moment from 'moment';
import {
  addSpecialty,
  deleteSpecialty,
  updateSpecialty,
  specialtyList,
  detailSpecialty,
  specialtyFlowList,
  addSpecialtyFlow,
  updateSpecialtyFlow,
  deleteSpecialtyFlow,
  detailSpecialtyFlow,
} from './service';

const Model = {
  namespace: 'specialty',
  state: {
    specialtyListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *specialtyList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.specialty.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const { dateOfBirth } = params;

      if (dateOfBirth && dateOfBirth.length === 2) {
        params.dateOfBirthStart = moment(dateOfBirth[0]).format('YYYY-MM-DD');
        params.dateOfBirthEnd = moment(dateOfBirth[1]).format('YYYY-MM-DD');
      }

      delete params.dateOfBirth;
      const response = yield call(specialtyList, params);

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
            specialtyListData: result,
          },
        });
      }
    },
    // 查询候鸟型银色人才
    *specialtyFlowList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.specialty.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const { dateOfBirth } = params;

      if (dateOfBirth && dateOfBirth.length === 2) {
        params.dateOfBirthStart = moment(dateOfBirth[0]).format('YYYY-MM-DD');
        params.dateOfBirthEnd = moment(dateOfBirth[1]).format('YYYY-MM-DD');
      }

      delete params.dateOfBirth;
      const response = yield call(specialtyFlowList, params);

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
            specialtyFlowListData: result,
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
    *addSpecialty({ payload, resolve }, { call, put }) {
      const response = yield call(addSpecialty, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('新增银发人才成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *addSpecialtyFlow({ payload, resolve }, { call, put }) {
      const response = yield call(addSpecialtyFlow, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('新增候鸟型银发人才成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateSpecialty({ payload, resolve }, { call, put }) {
      const response = yield call(updateSpecialty, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('银发人才修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateSpecialtyFlow({ payload, resolve }, { call, put }) {
      const response = yield call(updateSpecialtyFlow, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('候鸟型银发人才修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteSpecialty({ payload }, { call, put }) {
      const response = yield call(deleteSpecialty, payload);

      if (!response.error) {
        message.success('银发人才删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteSpecialtyFlow({ payload }, { call, put }) {
      const response = yield call(deleteSpecialtyFlow, payload);

      if (!response.error) {
        message.success('候鸟型银发人才删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailSpecialty({ payload, resolve }, { call }) {
      const response = yield call(detailSpecialty, payload);

      if (!response.error) {
        resolve && resolve(response);
      }
    },
    *detailSpecialtyFlow({ payload, resolve }, { call }) {
      const response = yield call(detailSpecialtyFlow, payload);

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
