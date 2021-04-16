import moment from 'moment';
import { getHobbyList, detailHobby, updateHobby, detailUserIdHobby } from './service';
import { message } from 'antd';

const Model = {
  namespace: 'vcHobbyInfo',
  state: {
    hobbyListData: {},
    detailHobbyData: {},
    detailUserIdHobbyData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.vcHobbyInfo.selectedOrgId);
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

      const response = yield call(getHobbyList, params);

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
            hobbyListData: result,
          },
        });
      }
    },

    *detailHobby({ payload, resolve }, { call, put }) {
      const response = yield call(detailHobby, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailHobbyData: response,
          },
        });
      }
    },
    *detailUserIdHobby({ payload, resolve }, { call, put }) {
      const response = yield call(detailUserIdHobby, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailUserIdHobbyData: response,
          },
        });
      }
    },
    *updateHobby({ payload, resolve }, { call, put }) {
      const response = yield call(updateHobby, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('兴趣爱好修改成功！');

        yield put({
          type: 'tableReload',
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
