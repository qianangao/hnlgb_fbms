import { message } from 'antd';
import {
  updateHealthAssessmentTopic,
  healthAssessmentResultList,
  detailHealthAssessmentResult,
  healthAssessmentTopicList,
  detailHealthAssessmentTopic,
  healthAssessmentStatisticsInfo,
} from './service';

const Model = {
  namespace: 'healthAssessment',
  state: {
    healthAssessmentResultListData: {},
    healthAssessmentTopicListData: {},
    healthAssessmentStatisticsData: {},
    detailResultData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *healthAssessmentResultList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.healthAssessment.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(healthAssessmentResultList, params);

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
            healthAssessmentResultListData: result,
          },
        });
      }
    },
    *detailHealthAssessmentResult({ payload, resolve }, { call, put }) {
      const response = yield call(detailHealthAssessmentResult, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailResultData: response,
          },
        });
      }
    },

    *healthAssessmentTopicList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.healthAssessment.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(healthAssessmentTopicList, params);

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
            healthAssessmentTopicListData: result,
          },
        });
      }
    },

    *updateHealthAssessmentTopic({ payload }, { call, put }) {
      const response = yield call(updateHealthAssessmentTopic, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            topicModifyModal: false,
          },
        });

        message.success('修改健康测评成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },

    *detailHealthAssessmentTopic({ payload, resolve }, { call }) {
      const response = yield call(detailHealthAssessmentTopic, payload);

      if (!response.error) {
        resolve && resolve(response);
      }
    },

    *healthAssessmentStatisticsInfo({ payload, resolve }, { call, put }) {
      const response = yield call(healthAssessmentStatisticsInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            healthAssessmentStatisticsData: response,
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
