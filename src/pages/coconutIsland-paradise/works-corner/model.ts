import { message } from 'antd';
import {
  addWorksCornerInfo,
  deleteWorksCornerInfo,
  updateWorksCornerInfo,
  worksCornerInfoList,
  detailWorksCornerInfo,
  approval,
  getCommentList,
  commentAudit,
  deleteComment,
} from './service';

const Model = {
  namespace: 'worksCorner',
  state: {
    worksCornerInfoListData: {},
    CommentListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailWorksCornerData: {},
  },
  effects: {
    *worksCornerInfoList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.worksCorner.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(worksCornerInfoList, params);

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
            worksCornerInfoListData: result,
          },
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
    *commentAudit({ payload }, { call, put }) {
      const response = yield call(commentAudit, payload);

      if (!response.error) {
        message.success('评论审核成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteComment({ payload }, { call, put }) {
      const response = yield call(deleteComment, payload);

      if (!response.error) {
        message.success('评论删除成功！');
        yield put({
          type: 'tableReload',
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

    *approval({ payload }, { call, put }) {
      const response = yield call(approval, payload);

      if (!response.error) {
        message.success('作品审批成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addWorksCornerInfo({ payload, resolve }, { call, put }) {
      const response = yield call(addWorksCornerInfo, payload);
      const publishStatus = payload.status;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishStatus === 0 ? '作品园地新增成功！' : '作品园地发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateWorksCornerInfo({ payload, resolve }, { call, put }) {
      const response = yield call(updateWorksCornerInfo, payload);
      const publishStatus = payload.status;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishStatus === 0 ? '作品园地修改成功！' : '作品园地发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteWorksCornerInfo({ payload }, { call, put }) {
      const response = yield call(deleteWorksCornerInfo, payload);

      if (!response.error) {
        message.success('作品园地删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailWorksCornerInfo({ payload, resolve }, { call, put }) {
      const response = yield call(detailWorksCornerInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailWorksCornerData: response,
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
