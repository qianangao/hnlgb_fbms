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
  namespace: 'oaVolunteerTeam',
  state: {
    PersonalListData: {},
    CollectiveListData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailDeedsData: {},
  },
  effects: {
    *getPersonalList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.oaVolunteerTeam.selectedOrgId);
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
            PersonalListData: result,
          },
        });
      }
    },

    *getCollectiveList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.oaVolunteerTeam.selectedOrgId);
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
            CollectiveListData: result,
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

    *addPersonal({ payload }, { call, put }) {
      const response = yield call(addPersonal, payload);
      const { isPublished } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });
        message.success(isPublished === 0 ? '基本志愿服务新增成功！' : '基本志愿服务发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addCollective({ payload }, { call, put }) {
      const response = yield call(addCollective, payload);
      const { isPublished } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });
        message.success(isPublished === 0 ? '专项志愿服务新增成功！' : '专项志愿服务发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updatePersonal({ payload }, { call, put }) {
      const response = yield call(updatePersonal, payload);
      const { isPublished } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success(isPublished === 0 ? '基本志愿服务修改成功！' : '基本志愿服务发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateCollective({ payload }, { call, put }) {
      const response = yield call(updateCollective, payload);
      const { isPublished } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success(isPublished === 0 ? '专项志愿服务修改成功！' : '专项志愿服务发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deletePersonal({ payload }, { call, put }) {
      const response = yield call(deletePersonal, payload);

      if (!response.error) {
        message.success('基本志愿服务删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteCollective({ payload }, { call, put }) {
      const response = yield call(deleteCollective, payload);

      if (!response.error) {
        message.success('专项志愿服务删除成功！');
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
