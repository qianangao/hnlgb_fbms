import { message } from 'antd';
import {
  addOnlineRegistrationInfo,
  deleteOnlineRegistrationInfo,
  updateOnlineRegistrationInfo,
  onlineRegistrationInfoList,
  detailOnlineRegistrationInfo,
} from './service';

const Model = {
  namespace: 'onlineRegistration',
  state: {
    onlineRegistrationInfoListData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailOnlineRegistrationData: {},
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
    *addOnlineRegistrationInfo({ payload }, { call, put }) {
      const response = yield call(addOnlineRegistrationInfo, payload);
      const publishStatus = payload.pushStatus;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });

        message.success(publishStatus === 0 ? '网络报名新增成功！' : '网络报名发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateOnlineRegistrationInfo({ payload }, { call, put }) {
      const response = yield call(updateOnlineRegistrationInfo, payload);
      const publishStatus = payload.pushStatus;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

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
