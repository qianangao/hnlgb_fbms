import { message } from 'antd';
import {
  getCommunityList,
  getActivityList,
  getCommunityDetail,
  deleteCommunity,
  deleteActivity,
  getActivityDetail,
  getMemberList,
  addCommunity,
  updateCommunity,
  addActivity,
  getMemberIds,
  addMember,
  deleteMember,
} from './service';

const Model = {
  namespace: 'oaCommunity',
  state: {
    communityListData: {},
    activityListData: {},
    memberListData: {},
    communityDetailData: {},
    activityDetailData: {},
    tableRef: {},
    memberIds: {},
    selectedOrgId: undefined, // 选择的组织id
    communityDetailModalVisible: false, // 社区详情modal visible
    communityModifyModalVisible: false, // 社区编辑modal visible
    communityAddModalVisible: false, // 新增社团modal visible
    activityAddModalVisible: false, // 发布活动modal visible
    memberModifyModalVisible: false, // 编辑成员modal visible
    memberAddModalVisible: false, // 新增成员modal visible
  },
  effects: {
    *getCommunityList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.oaCommunity.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getCommunityList, params);

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
            communityListData: result,
          },
        });
      }
    },
    *getActivityList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.oaCommunity.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getActivityList, params);

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
            activityListData: result,
          },
        });
      }
    },

    *getMemberIds({ payload, resolve }, { call, put }) {
      const response = yield call(getMemberIds, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            memberIds: response,
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
    *getCommunityDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getCommunityDetail, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            communityDetailData: response,
          },
        });
      }
    },
    *updateCommunity({ payload }, { call, put }) {
      const response = yield call(updateCommunity, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            communityModifyModalVisible: false,
          },
        });
        message.success('社团信息修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteCommunity({ payload }, { call, put }) {
      const response = yield call(deleteCommunity, payload);

      if (!response.error) {
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteActivity({ payload }, { call, put }) {
      const response = yield call(deleteActivity, payload);

      if (!response.error) {
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *getActivityDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getActivityDetail, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            activityDetailData: response,
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

    *addCommunity({ payload }, { call, put }) {
      const response = yield call(addCommunity, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            communityAddModalVisible: false,
          },
        });
        message.success('新增社团成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addActivity({ payload }, { call, put }) {
      const response = yield call(addActivity, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            activityAddModalVisible: false,
          },
        });
        message.success('社团活动发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addMember({ payload, resolve }, { call }) {
      const response = yield call(addMember, payload);

      if (!response.error) {
        // message.success('添加成功！');
        // yield put({
        //   type: 'tableReload',
        // });
        resolve && resolve(response);
      }
    },
    *deleteMember({ payload }, { call, put }) {
      const response = yield call(deleteMember, payload);

      if (!response.error) {
        message.success('移除成功！');
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
