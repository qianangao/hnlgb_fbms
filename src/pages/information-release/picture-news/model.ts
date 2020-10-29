import { message } from 'antd';
import {
  addNewsDynamic,
  deleteNewsDynamic,
  updateNewsDynamic,
  newsDynamicList,
  detailNewsDynamic,
} from './service';

const Model = {
  namespace: 'pictureNews',
  state: {
    newsDynamicData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailNewsDynamicData: {},
  },
  effects: {
    *newsDynamicList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.newsDynamic.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(newsDynamicList, params);

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
            newsDynamicData: result,
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

    *addNewsDynamic({ payload, resolve }, { call, put }) {
      const response = yield call(addNewsDynamic, payload);
      const publishStatus = payload.status;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishStatus === 0 ? '图片新闻新增成功！' : '图片新闻发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateNewsDynamic({ payload, resolve }, { call, put }) {
      const response = yield call(updateNewsDynamic, payload);
      const publishStatus = payload.status;
      if (!response.error) {
        resolve && resolve(response);

        message.success(publishStatus === 0 ? '图片新闻修改成功！' : '图片新闻发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteNewsDynamic({ payload }, { call, put }) {
      const response = yield call(deleteNewsDynamic, payload);

      if (!response.error) {
        message.success('图片新闻删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailNewsDynamic({ payload, resolve }, { call, put }) {
      const response = yield call(detailNewsDynamic, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailNewsDynamicData: response,
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
