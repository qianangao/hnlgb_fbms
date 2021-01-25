import { message } from 'antd';
import {
  addHospitalRegistrationInfo,
  addVisit,
  deleteHospitalRegistrationInfo,
  updateHospitalRegistrationInfo,
  hospitalRegistrationInfoList,
  detailHospitalRegistrationInfo,
  approvalHospitalRegistrationInfo,
} from './service';

const Model = {
  namespace: 'hospitalRegistration',
  state: {
    hospitalRegistrationInfoListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *hospitalRegistrationInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.hospitalRegistration.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,

        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(hospitalRegistrationInfoList, params);

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
            hospitalRegistrationInfoListData: result,
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
    *addHospitalRegistrationInfo({ payload, resolve }, { call, put }) {
      const response = yield call(addHospitalRegistrationInfo, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增住院登记成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *addVisit({ payload, resolve }, { call, put }) {
      const response = yield call(addVisit, payload);
      if (!response.error) {
        resolve && resolve(response);

        message.success('看望记录已添加！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateHospitalRegistrationInfo({ payload, resolve }, { call, put }) {
      const response = yield call(updateHospitalRegistrationInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改住院登记成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteHospitalRegistrationInfo({ payload }, { call, put }) {
      const response = yield call(deleteHospitalRegistrationInfo, payload);

      if (!response.error) {
        message.success('住院登记删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *approvalHospitalRegistrationInfo({ payload }, { call, put }) {
      const response = yield call(approvalHospitalRegistrationInfo, payload);

      if (!response.error) {
        message.success('住院登记审批成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailHospitalRegistrationInfo({ payload, resolve }, { call }) {
      const response = yield call(detailHospitalRegistrationInfo, payload);

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
