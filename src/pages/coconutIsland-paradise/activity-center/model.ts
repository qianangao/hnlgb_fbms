import { message } from 'antd';
import {
  addActivityCenterInfo,
  deleteActivityCenterInfo,
  updateActivityCenterInfo,
  activityCenterInfoList,
  detailActivityCenterInfo,
  detailActivityCenterUnitInfo,
  updateActivityCenterUnitInfo,
  addSilhouette,
  getRegisteredList,
} from './service';

const Model = {
  namespace: 'activityCenter',
  state: {
    activityCenterInfoListData: {},
    detailActivityCenterUnitData: [],
    memberListData: {},
    tableRef: {},
    registeredTableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailActivityCenterData: {},
  },
  effects: {
    *activityCenterInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.activityCenter.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(activityCenterInfoList, params);

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
            activityCenterInfoListData: result,
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
    *addActivityCenterInfo({ payload, resolve }, { call, put }) {
      const response = yield call(addActivityCenterInfo, payload);
      const publishStatus = payload.pushStatus;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishStatus === 0 ? '活动中心新增成功！' : '活动中心发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *addSilhouette({ payload, resolve }, { call, put }) {
      const response = yield call(addSilhouette, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('剪影发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateActivityCenterUnitInfo({ payload, resolve }, { call, put }) {
      const response = yield call(updateActivityCenterUnitInfo, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('单位编辑成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateActivityCenterInfo({ payload, resolve }, { call, put }) {
      const response = yield call(updateActivityCenterInfo, payload);
      const publishStatus = payload.pushStatus;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishStatus === 0 ? '活动中心修改成功！' : '活动中心发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteActivityCenterInfo({ payload }, { call, put }) {
      const response = yield call(deleteActivityCenterInfo, payload);

      if (!response.error) {
        message.success('活动中心删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailActivityCenterInfo({ payload, resolve }, { call, put }) {
      const response = yield call(detailActivityCenterInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailActivityCenterData: response,
          },
        });
      }
    },

    *detailActivityCenterUnitInfo({ payload, resolve }, { call, put }) {
      const response = yield call(detailActivityCenterUnitInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailActivityCenterUnitData: response,
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
    registeredTableReload(state) {
      const registeredTableRef = state.registeredTableRef || {};
      setTimeout(() => {
        registeredTableRef.current && registeredTableRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};
export default Model;
