import { message } from 'antd';
import {
  addMedicalGuideInfo,
  deleteMedicalGuideInfo,
  updateMedicalGuideInfo,
  medicalGuideInfoList,
  detailMedicalGuideInfo,
} from './service';

const Model = {
  namespace: 'medicalGuide',
  state: {
    medicalGuideInfoListData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *medicalGuideInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.medicalGuide.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(medicalGuideInfoList, params);

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
            medicalGuideInfoListData: result,
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
    *addMedicalGuideInfo({ payload }, { call, put }) {
      const response = yield call(addMedicalGuideInfo, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });

        message.success('新增就医指南成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateMedicalGuideInfo({ payload }, { call, put }) {
      const response = yield call(updateMedicalGuideInfo, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success('修改就医指南成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteMedicalGuideInfo({ payload }, { call, put }) {
      const response = yield call(deleteMedicalGuideInfo, payload);

      if (!response.error) {
        message.success('就医指南删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailMedicalGuideInfo({ payload, resolve }, { call }) {
      const response = yield call(detailMedicalGuideInfo, payload);

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
