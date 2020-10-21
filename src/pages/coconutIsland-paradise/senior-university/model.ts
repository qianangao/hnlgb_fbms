import { message } from 'antd';
import {
  addSeniorUniversityInfo,
  deleteSeniorUniversityInfo,
  updateSeniorUniversityInfo,
  seniorUniversityInfoList,
  detailSeniorUniversityInfo,
} from './service';

const Model = {
  namespace: 'seniorUniversity',
  state: {
    seniorUniversityInfoListData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailSeniorUniversityData: {},
  },
  effects: {
    *seniorUniversityInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.seniorUniversity.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(seniorUniversityInfoList, params);

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
            seniorUniversityInfoListData: result,
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
    *addSeniorUniversityInfo({ payload }, { call, put }) {
      const response = yield call(addSeniorUniversityInfo, payload);
      const publishStatus = payload.pushStatus;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });

        message.success(publishStatus === 0 ? '老年大学新增成功！' : '老年大学发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateSeniorUniversityInfo({ payload }, { call, put }) {
      const response = yield call(updateSeniorUniversityInfo, payload);
      const publishStatus = payload.pushStatus;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success(publishStatus === 0 ? '老年大学修改成功！' : '老年大学发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteSeniorUniversityInfo({ payload }, { call, put }) {
      const response = yield call(deleteSeniorUniversityInfo, payload);

      if (!response.error) {
        message.success('老年大学删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailSeniorUniversityInfo({ payload, resolve }, { call, put }) {
      const response = yield call(detailSeniorUniversityInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailSeniorUniversityData: response,
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
