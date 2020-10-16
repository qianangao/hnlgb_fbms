import { message } from 'antd';
import {
  addMedicalPolicyInfo,
  deleteMedicalPolicyInfo,
  updateMedicalPolicyInfo,
  medicalPolicyInfoList,
  detailMedicalPolicyInfo,
} from './service';

const Model = {
  namespace: 'medicalPolicy',
  state: {
    medicalPolicyInfoListData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *medicalPolicyInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.medicalPolicy.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(medicalPolicyInfoList, params);

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
            medicalPolicyInfoListData: result,
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
    *addMedicalPolicyInfo({ payload }, { call, put }) {
      const response = yield call(addMedicalPolicyInfo, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });

        message.success('新增医疗政策成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateMedicalPolicyInfo({ payload }, { call, put }) {
      const response = yield call(updateMedicalPolicyInfo, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success('修改医疗政策成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteMedicalPolicyInfo({ payload }, { call, put }) {
      const response = yield call(deleteMedicalPolicyInfo, payload);

      if (!response.error) {
        message.success('医疗政策删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailMedicalPolicyInfo({ payload, resolve }, { call }) {
      const response = yield call(detailMedicalPolicyInfo, payload);

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
