import { message } from 'antd';
import {
  getTeamList,
  getActivityList,
  getMemberList,
  getRegisteredList,
  addTeam,
  getActivityDetail,
  addActivity,
  updateActivity,
  updateTeam,
  deleteActivity,
  deleteTeam,
  detailPersonal,
  detailTeam,
  getMemberIds,
  addMember,
  deleteMember,
} from './service';

const Model = {
  namespace: 'oaVolunteerTeam',
  state: {
    teamListData: {},
    activityListData: {},
    memberListData: {},
    addModalVisible: false,
    activityDetailData: {},
    activityAddModalVisible: false,
    activityModifyModalVisible: false,
    teamModifyModalVisible: false,
    registeredModalVisible: false,
    tableRef: {},
    memberIds: {},
    selectedOrgId: undefined, // 选择的组织id
    detailDeedsData: {},
  },
  effects: {
    *getTeamList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.oaVolunteerTeam.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getTeamList, params);

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
            teamListData: result,
          },
        });
      }
    },

    *getActivityList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.oaVolunteerTeam.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
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
    *getRegisteredList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getRegisteredList, params);
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

    *addMember({ payload, resolve }, { call }) {
      const response = yield call(addMember, payload);

      if (!response.error) {
        resolve && resolve(response);
      }
    },
    *deleteMember({ payload, resolve }, { call }) {
      const response = yield call(deleteMember, payload);

      if (!response.error) {
        resolve && resolve(response);
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
    *addTeam({ payload }, { call, put }) {
      const response = yield call(addTeam, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });
        message.success('新增成功！');
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
    *addActivity({ payload }, { call, put }) {
      const response = yield call(addActivity, payload);
      const { publishState } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            activityAddModalVisible: false,
          },
        });
        message.success(publishState === 0 ? '新增成功！' : '发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateActivity({ payload }, { call, put }) {
      const response = yield call(updateActivity, payload);
      const { publishState } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            activityModifyModalVisible: false,
          },
        });

        message.success(publishState === 0 ? '修改成功！' : '发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateTeam({ payload }, { call, put }) {
      const response = yield call(updateTeam, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            teamModifyModalVisible: false,
          },
        });

        message.success('修改成功！');

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
    *deleteTeam({ payload }, { call, put }) {
      const response = yield call(deleteTeam, payload);

      if (!response.error) {
        message.success('删除成功！');
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
    *detailTeam({ payload, resolve }, { call, put }) {
      const response = yield call(detailTeam, payload);

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
        tableRef.current && tableRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};
export default Model;
