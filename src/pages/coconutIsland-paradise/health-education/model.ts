import { message } from 'antd';
import {
  addHealthEducationInfo,
  deleteHealthEducationInfo,
  updateHealthEducationInfo,
  healthEducationInfoList,
  detailHealthEducationInfo,
} from './service';

const Model = {
  namespace: 'healthEducation',
  state: {
    healthEducationInfoListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *healthEducationInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.healthEducation.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(healthEducationInfoList, params);

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
            healthEducationInfoListData: result,
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
    *addHealthEducationInfo({ payload, resolve }, { call, put }) {
      const response = yield call(addHealthEducationInfo, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增保健教育成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateHealthEducationInfo({ payload, resolve }, { call, put }) {
      const response = yield call(updateHealthEducationInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改保健教育成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteHealthEducationInfo({ payload }, { call, put }) {
      const response = yield call(deleteHealthEducationInfo, payload);

      if (!response.error) {
        message.success('保健教育删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailHealthEducationInfo({ payload, resolve }, { call }) {
      const response = yield call(detailHealthEducationInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
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
