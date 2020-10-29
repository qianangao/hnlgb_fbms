import { message } from 'antd';
import {
  addOnlineRegistrationInfo,
  deleteOnlineRegistrationInfo,
  updateOnlineRegistrationInfo,
  onlineRegistrationInfoList,
  detailOnlineRegistrationInfo,
  getMemberIds,
  addMember,
  deleteMember,
  getMemberList,
} from './service';

const Model = {
  namespace: 'onlineRegistration',
  state: {
    onlineRegistrationInfoListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailOnlineRegistrationData: {},
    memberListData: {},
    memberIds: {},
  },
  effects: {
    *onlineRegistrationInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.onlineRegistration.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(onlineRegistrationInfoList, params);

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
            onlineRegistrationInfoListData: result,
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
    *addOnlineRegistrationInfo({ payload, resolve }, { call, put }) {
      const response = yield call(addOnlineRegistrationInfo, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('网络报名新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateOnlineRegistrationInfo({ payload, resolve }, { call, put }) {
      const response = yield call(updateOnlineRegistrationInfo, payload);
      const publishStatus = payload.pushStatus;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishStatus === 0 ? '网络报名修改成功！' : '网络报名发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteOnlineRegistrationInfo({ payload }, { call, put }) {
      const response = yield call(deleteOnlineRegistrationInfo, payload);

      if (!response.error) {
        message.success('网络报名删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailOnlineRegistrationInfo({ payload, resolve }, { call, put }) {
      const response = yield call(detailOnlineRegistrationInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailOnlineRegistrationData: response,
          },
        });
      }
    },
    *addMember({ payload, resolve }, { call }) {
      const response = yield call(addMember, payload);

      if (!response.error) {
        message.success('添加成功！');
        resolve && resolve(response);
      }
    },
    *deleteMember({ payload, resolve }, { call }) {
      const response = yield call(deleteMember, payload);

      if (!response.error) {
        message.success('移除成功！');
        resolve && resolve(response);
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
