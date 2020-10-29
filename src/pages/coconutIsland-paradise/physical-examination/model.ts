import { message } from 'antd';
import {
  addPhysicalExamination,
  deletePhysicalExamination,
  updatePhysicalExamination,
  physicalExaminationList,
  detailPhysicalExamination,
  getMemberList,
  addPhysicalReport,
} from './service';

const Model = {
  namespace: 'opPhysicalExamination',
  state: {
    physicalExaminationListData: {},
    tableRef: {},
    memberListData: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *physicalExaminationList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.opPhysicalExamination.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const { activityDate } = params;

      if (activityDate && activityDate.length === 2) {
        [params.activityDateStart, params.activityDateEnd] = activityDate;
      }

      delete params.activityDate;
      const response = yield call(physicalExaminationList, params);

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
            physicalExaminationListData: result,
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
    *addPhysicalExamination({ payload, resolve }, { call, put }) {
      const response = yield call(addPhysicalExamination, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *addPhysicalReport({ payload, resolve }, { call, put }) {
      const response = yield call(addPhysicalReport, payload);

      if (!response.error) {
        message.success('上传成功！');
        resolve && resolve(response);

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updatePhysicalExamination({ payload, resolve }, { call, put }) {
      const response = yield call(updatePhysicalExamination, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deletePhysicalExamination({ payload }, { call, put }) {
      const response = yield call(deletePhysicalExamination, payload);

      if (!response.error) {
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailPhysicalExamination({ payload, resolve }, { call }) {
      const response = yield call(detailPhysicalExamination, payload);

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
