import { message } from 'antd';
import {
  addHelpElderlyInfo,
  deleteHelpElderlyInfo,
  updateHelpElderlyInfo,
  helpElderlyInfoList,
  detailHelpElderlyInfo,
} from './service';

const Model = {
  namespace: 'helpElderly',
  state: {
    helpElderlyInfoListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailHelpElderlyData: {},
  },
  effects: {
    *helpElderlyInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.helpElderly.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(helpElderlyInfoList, params);

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
            helpElderlyInfoListData: result,
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
    *addHelpElderlyInfo({ payload, resolve }, { call, put }) {
      const response = yield call(addHelpElderlyInfo, payload);
      const publishStatus = payload.pushStatus;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishStatus === 0 ? '助老志愿新增成功！' : '助老志愿发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateHelpElderlyInfo({ payload, resolve }, { call, put }) {
      const response = yield call(updateHelpElderlyInfo, payload);
      const publishStatus = payload.pushStatus;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishStatus === 0 ? '助老志愿修改成功！' : '助老志愿发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteHelpElderlyInfo({ payload }, { call, put }) {
      const response = yield call(deleteHelpElderlyInfo, payload);

      if (!response.error) {
        message.success('助老志愿删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailHelpElderlyInfo({ payload, resolve }, { call, put }) {
      const response = yield call(detailHelpElderlyInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailHelpElderlyData: response,
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
