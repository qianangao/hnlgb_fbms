import { message } from 'antd';
import {
  addBranchActivity,
  deleteBranchActivity,
  updateBranchActivity,
  branchActivityList,
  detailBranchActivity,
  branchActivityUser,
  addBranchActivityUser,
} from './service';

const Model = {
  namespace: 'branchActivity',
  state: {
    branchActivityData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailBranchActivityData: {},
    branchPartyUserList: {}, // 支部成员列表
  },
  effects: {
    *branchActivityList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.receiveFile.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(branchActivityList, params);

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
            branchActivityData: result,
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

    *addBranchActivity({ payload, resolve }, { call, put }) {
      const response = yield call(addBranchActivity, payload);
      const publishState = payload.isRelease;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishState === 0 ? '支部活动新增成功！' : '支部活动发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateBranchActivity({ payload, resolve }, { call, put }) {
      const response = yield call(updateBranchActivity, payload);
      const publishState = payload.isRelease;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishState === 0 ? '支部活动修改成功！' : '支部活动发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteBranchActivity({ payload }, { call, put }) {
      const response = yield call(deleteBranchActivity, payload);

      if (!response.error) {
        message.success('支部活动删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailBranchActivity({ payload, resolve }, { call, put }) {
      const response = yield call(detailBranchActivity, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailBranchActivityData: response,
          },
        });
      }
    },
    *getBranchActivityUser({ payload, resolve }, { call, put }) {
      const response = yield call(branchActivityUser, payload);

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
            studyRecordUserData: result,
          },
        });
      }
    },
    *addBranchActivityUser({ payload, resolve }, { call, put }) {
      const response = yield call(addBranchActivityUser, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'tableReload',
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
