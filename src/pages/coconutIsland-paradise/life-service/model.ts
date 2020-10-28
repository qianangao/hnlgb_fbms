import { message } from 'antd';
import {
  addLifeServiceInfo,
  deleteLifeServiceInfo,
  updateLifeServiceInfo,
  lifeServiceInfoList,
  detailLifeServiceInfo,
} from './service';

const Model = {
  namespace: 'lifeService',
  state: {
    lifeServiceInfoListData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailLifeServiceData: {},
  },
  effects: {
    *lifeServiceInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.lifeService.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(lifeServiceInfoList, params);

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
            lifeServiceInfoListData: result,
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
    *addLifeServiceInfo({ payload }, { call, put }) {
      const response = yield call(addLifeServiceInfo, payload);
      const publishStatus = payload.pushStatus;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });

        message.success(publishStatus === 0 ? '生活服务新增成功！' : '生活服务发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateLifeServiceInfo({ payload }, { call, put }) {
      const response = yield call(updateLifeServiceInfo, payload);
      const publishStatus = payload.pushStatus;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success(publishStatus === 0 ? '生活服务修改成功！' : '生活服务发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteLifeServiceInfo({ payload }, { call, put }) {
      const response = yield call(deleteLifeServiceInfo, payload);

      if (!response.error) {
        message.success('生活服务删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailLifeServiceInfo({ payload, resolve }, { call, put }) {
      const response = yield call(detailLifeServiceInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailLifeServiceData: response,
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
