import { message } from 'antd';
import {
  addPoliticsNews,
  deletePoliticsNews,
  updatePoliticsNews,
  politicsNewsList,
  detailPoliticsNews,
} from './service';

const Model = {
  namespace: 'politicsNews',
  state: {
    politicsNewsData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailPoliticsNewsData: {},
  },
  effects: {
    *politicsNewsList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.politicsNews.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(politicsNewsList, params);

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
            politicsNewsData: result,
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

    *addPoliticsNews({ payload, resolve }, { call, put }) {
      const response = yield call(addPoliticsNews, payload);
      const publishStatus = payload.status;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishStatus === 0 ? '时政要闻新增成功！' : '时政要闻发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updatePoliticsNews({ payload, resolve }, { call, put }) {
      const response = yield call(updatePoliticsNews, payload);
      const publishStatus = payload.status;
      if (!response.error) {
        resolve && resolve(response);

        message.success(publishStatus === 0 ? '时政要闻修改成功！' : '时政要闻发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deletePoliticsNews({ payload }, { call, put }) {
      const response = yield call(deletePoliticsNews, payload);

      if (!response.error) {
        message.success('时政要闻删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailPoliticsNews({ payload, resolve }, { call, put }) {
      const response = yield call(detailPoliticsNews, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailPoliticsNewsData: response,
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
