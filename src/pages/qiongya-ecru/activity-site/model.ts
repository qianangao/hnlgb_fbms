import { message } from 'antd';
import { addSite, updateSite, deleteSites, getSiteList } from './service';

const Model = {
  namespace: 'qeActivitySite',
  state: {
    siteListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.qeActivitySite.selectedOrgId);

      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getSiteList, params);

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
            siteListData: result,
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
    *addSite({ payload, resolve }, { call, put }) {
      const response = yield call(addSite, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('活动地点新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateSite({ payload, resolve }, { call, put }) {
      const response = yield call(updateSite, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改活动地点信息成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteSites({ payload }, { call, put }) {
      const response = yield call(deleteSites, payload);

      if (!response.error) {
        message.success('活动地点删除成功！');
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
