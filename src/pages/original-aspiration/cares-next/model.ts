import { message } from 'antd';
import {
  getCaresList,
  getTrendsList,
  caresDetail,
  deleteCares,
  deleteTrends,
  trendsDetail,
  getMemberList,
  addCares,
  updateCares,
  addTrends,
  addMember,
  updateMember,
  deleteMember,
} from './service';

const Model = {
  namespace: 'oaCaresNext',
  state: {
    caresListData: {},
    trendsListData: {},
    memberListData: {},
    caresDetailData: {},
    trendsDetailData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    caresDetailModalVisible: false, // 关工组织详情modal visible
    caresModifyModalVisible: false, // 关工组织编辑modal visible
    caresAddModalVisible: false, // 新增关工组织modal visible
    trendsAddModalVisible: false, // 发布动态modal visible
    memberModifyModalVisible: false, // 编辑成员modal visible
    memberAddModalVisible: false, // 新增成员modal visible
  },
  effects: {
    *getCaresList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.oaCaresNext.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getCaresList, params);

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
            trendsListData: result,
          },
        });
      }
    },
    *getTrendsList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.oaCaresNext.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getTrendsList, params);

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
            trendsListData: result,
          },
        });
      }
    },

    *getMemberList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getMemberList, params);
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
            memberListData: result,
          },
        });
      }
    },
    *getCaresDetail({ payload, resolve }, { call, put }) {
      const response = yield call(caresDetail, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            caresDetailData: response,
          },
        });
      }
    },
    *updateCares({ payload }, { call, put }) {
      const response = yield call(updateCares, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            caresModifyModalVisible: false,
          },
        });
        message.success('关工组织修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteCares({ payload }, { call, put }) {
      const response = yield call(deleteCares, payload);

      if (!response.error) {
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteTrends({ payload }, { call, put }) {
      const response = yield call(deleteTrends, payload);

      if (!response.error) {
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *getTrendsDetail({ payload, resolve }, { call, put }) {
      const response = yield call(trendsDetail, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            trendsDetailData: response,
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

    *addCares({ payload }, { call, put }) {
      const response = yield call(addCares, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            caresAddModalVisible: false,
          },
        });
        message.success('新增关工组织成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addTrends({ payload }, { call, put }) {
      const response = yield call(addTrends, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            trendsAddModalVisible: false,
          },
        });
        message.success('关工动态发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addMember({ payload }, { call, put }) {
      const response = yield call(addMember, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            memberAddModalVisible: false,
          },
        });
        message.success('成员新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateMember({ payload }, { call, put }) {
      const response = yield call(updateMember, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            memberModifyModalVisible: false,
          },
        });
        message.success('成员信息修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteMember({ payload }, { call, put }) {
      const response = yield call(deleteMember, payload);

      if (!response.error) {
        message.success('删除成功！');
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