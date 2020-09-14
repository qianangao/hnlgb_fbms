import { message } from 'antd';
import {
  addNewsDynamic,
  deleteNewsDynamic,
  updateNewsDynamic,
  newsDynamicList,
  detailNewsDynamic,
} from './service';

const Model = {
  namespace: 'newsDynamic',
  state: {
    newsDynamicData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    status: 1, // type  0 草稿箱 ， 1 已发布
    detailNewsDynamicData: {},
  },
  effects: {
    *newsDynamicList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.newsDynamic.selectedOrgId);
      const status = yield select(state => state.newsDynamic.status);
      const params = {
        ...payload,
        orgIdForDataSelect,
        status,
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

    *publishStatusChange({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          status: payload,
        },
      });

      yield put({
        type: 'tableReload',
      });
    },

    *addNewsDynamic({ payload }, { call, put }) {
      const response = yield call(addNewsDynamic, payload);
      const { status } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });
        message.success(status == 0 ? '新闻动态新增成功！' : '新闻动态发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateNewsDynamic({ payload }, { call, put }) {
      const response = yield call(updateNewsDynamic, payload);
      const { status } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success(status == 0 ? '新闻动态修改成功！' : '新闻动态发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteNewsDynamic({ payload }, { call, put }) {
      const response = yield call(deleteNewsDynamic, payload);

      if (!response.error) {
        message.success('新闻动态删除成功！');
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
