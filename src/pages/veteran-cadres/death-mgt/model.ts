import { message } from 'antd';
import { deleteLgb, updateLgb, getLgbList } from './service';

const Model = {
  namespace: 'vcDeathInfo',
  state: {
    lgbListData: {},
    modifyModalVisible: false, // 新增修改modal visible
    orgSelectModalVisible: false, // 单位选择modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.vcDeathInfo.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const { dateOfBirth } = params;

      if (dateOfBirth && dateOfBirth.length === 2) {
        [params.dateOfBirthStart, params.dateOfBirthEnd] = dateOfBirth;
      }

      delete params.dateOfBirth;
      const { dieDate } = params;

      if (dieDate && dieDate.length === 2) {
        [params.dieDateStart, params.dieDateEnd] = dieDate;
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

    *updateLgb({ payload }, { call, put }) {
      const response = yield call(updateLgb, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

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
