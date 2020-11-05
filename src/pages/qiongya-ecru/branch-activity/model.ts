import { message } from 'antd';
import {
  addBranchActivity,
  deleteBranchActivity,
  updateBranchActivity,
  branchActivityList,
  detailBranchActivity,
  branchActivityUser,
  addBranchActivityUser,
  getCommentList,
  deleteComment,
  commentAudit,
  getStatisticsList,
  getOrgLifeStatisticsVo,
} from './service';

const Model = {
  namespace: 'branchActivity',
  state: {
    branchActivityData: {},
    tableRef: {},
    tableCommentRef: {},
    tableUserRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailBranchActivityData: {},
    branchPartyUserList: {}, // 支部成员列表
    CommentListData: {},
    statisticsData: {},
    getOrgLifeStatisticsVoData: {},
    totalNumber: '',
    totalNum: '',
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
    // 评论-列表
    *getCommentList({ payload, resolve }, { call, put }) {
      const response = yield call(getCommentList, payload);

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
            CommentListData: result,
          },
        });
      }
    },
    *deleteComment({ payload }, { call, put }) {
      const response = yield call(deleteComment, payload);

      if (!response.error) {
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    // 审核-评论
    *commentAudit({ payload }, { call, put }) {
      const response = yield call(commentAudit, payload);

      if (!response.error) {
        message.success(payload.commentStatus === 0 ? '审核未通过成功！' : '审核未通过成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    // 按年统计-列表
    *getOrgLifeByMonth({ payload, resolve }, { call, put }) {
      const response = yield call(getStatisticsList, payload);
      if (!response.error) {
        const { orgLifeMonthList, totalNumber } = response;
        const result = {
          data: orgLifeMonthList,
          success: true,
        };
        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            statisticsData: result,
            totalNumber,
          },
        });
      }
    },

    // 按类型统计-列表
    *getOrgLifeStatisticsVo({ payload, resolve }, { call, put }) {
      const response = yield call(getOrgLifeStatisticsVo, payload);
      if (!response.error) {
        const { orgLifeStatisticsVoList, totalNumber } = response;
        const result = {
          data: orgLifeStatisticsVoList,
          success: true,
        };
        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            getOrgLifeStatisticsVoData: result,
            totalNum: totalNumber,
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
      const tableCommentRef = state.tableCommentRef || {};
      const tableUserRef = state.tableUserRef || {};
      setTimeout(() => {
        tableRef.current && tableRef.current.reloadAndRest();
        tableCommentRef.current && tableCommentRef.current.reloadAndRest();
        tableUserRef.current && tableUserRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};
export default Model;
