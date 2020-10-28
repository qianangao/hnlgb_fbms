import { message } from 'antd';
import {
  getElegantDemeanorList,
  addElegantDemeanor,
  deleteElegantDemeanor,
  updateElegantDemeanor,
  detailElegantDemeanor,
} from './service';

const Model = {
  namespace: 'oaElegantDemeanor',
  state: {
    elegantDemeanorListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailElegantDemeanorData: {},
  },
  effects: {
    *getElegantDemeanorList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.oaElegantDemeanor.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getElegantDemeanorList, params);

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
            elegantDemeanorListData: result,
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

    *addElegantDemeanor({ payload, resolve }, { call, put }) {
      const response = yield call(addElegantDemeanor, payload);
      const { pushStatus } = payload;
      if (!response.error) {
        resolve && resolve(response);
        message.success(pushStatus === 0 ? '五老风采新增成功！' : '五老风采发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateElegantDemeanor({ payload, resolve }, { call, put }) {
      const response = yield call(updateElegantDemeanor, payload);
      const { pushStatus } = payload;
      if (!response.error) {
        resolve && resolve(response);

        message.success(pushStatus === 0 ? '五老风采修改成功！' : '五老风采发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteElegantDemeanor({ payload }, { call, put }) {
      const response = yield call(deleteElegantDemeanor, payload);

      if (!response.error) {
        message.success('五老风采删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailElegantDemeanor({ payload, resolve }, { call, put }) {
      const response = yield call(detailElegantDemeanor, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailElegantDemeanorData: response,
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
