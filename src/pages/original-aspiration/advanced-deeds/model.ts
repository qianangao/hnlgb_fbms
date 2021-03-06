import { message } from 'antd';
import {
  getPersonalList,
  getCollectiveList,
  addPersonal,
  addCollective,
  updatePersonal,
  updateCollective,
  deletePersonal,
  deleteCollective,
  detailPersonal,
  detailCollective,
} from './service';

const Model = {
  namespace: 'oaAdvancedDeeds',
  state: {
    personalListData: {},
    collectiveListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailDeedsData: {},
  },
  effects: {
    *getPersonalList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.oaAdvancedDeeds.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getPersonalList, params);

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
            personalListData: result,
          },
        });
      }
    },

    *getCollectiveList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.oaAdvancedDeeds.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getCollectiveList, params);

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
            collectiveListData: result,
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

    *addPersonal({ payload, resolve }, { call, put }) {
      const response = yield call(addPersonal, payload);
      const { isPublished } = payload;
      if (!response.error) {
        resolve && resolve(response);
        message.success(isPublished === 0 ? '个人先进事迹新增成功！' : '个人先进事迹发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addCollective({ payload, resolve }, { call, put }) {
      const response = yield call(addCollective, payload);
      const { isPublished } = payload;
      if (!response.error) {
        resolve && resolve(response);
        message.success(isPublished === 0 ? '集体先进事迹新增成功！' : '集体先进事迹发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updatePersonal({ payload, resolve }, { call, put }) {
      const response = yield call(updatePersonal, payload);
      const { isPublished } = payload;
      if (!response.error) {
        resolve && resolve(response);
        message.success(isPublished === 0 ? '个人先进事迹修改成功！' : '个人先进事迹发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateCollective({ payload, resolve }, { call, put }) {
      const response = yield call(updateCollective, payload);
      const { isPublished } = payload;
      if (!response.error) {
        resolve && resolve(response);

        message.success(isPublished === 0 ? '集体先进事迹修改成功！' : '集体先进事迹发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deletePersonal({ payload }, { call, put }) {
      const response = yield call(deletePersonal, payload);

      if (!response.error) {
        message.success('个人先进事迹删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteCollective({ payload }, { call, put }) {
      const response = yield call(deleteCollective, payload);

      if (!response.error) {
        message.success('集体先进事迹删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailPersonal({ payload, resolve }, { call, put }) {
      const response = yield call(detailPersonal, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailDeedsData: response,
          },
        });
      }
    },
    *detailCollective({ payload, resolve }, { call, put }) {
      const response = yield call(detailCollective, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailDeedsData: response,
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
