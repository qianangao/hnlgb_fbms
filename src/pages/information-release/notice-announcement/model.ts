import { message } from 'antd';
import {
  addNoticeAnnouncement,
  deleteNoticeAnnouncement,
  updateNoticeAnnouncement,
  noticeAnnouncementList,
  detailNoticeAnnouncement,
} from './service';

const Model = {
  namespace: 'noticeAnnouncement',
  state: {
    noticeAnnouncementData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailNoticeAnnouncementData: {},
    noticeData: {},
  },
  effects: {
    *noticeAnnouncementList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.noticeAnnouncement.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(noticeAnnouncementList, params);

      if (!response.error) {
        const { items, currentPage, totalNum } = response;
        const noticeData = {};
        response.items.length > 0 &&
          response.items.forEach(item => {
            noticeData[item.id] = item.partyName;
          });
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
            noticeAnnouncementData: result,
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

    *addNoticeAnnouncement({ payload, resolve }, { call, put }) {
      const response = yield call(addNoticeAnnouncement, payload);
      const publishStatus = payload.dictPublishStatus;
      if (!response.error) {
        resolve && resolve(response);
        message.success(publishStatus === 0 ? '通知公告新增成功！' : '通知公告发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateNoticeAnnouncement({ payload, resolve }, { call, put }) {
      const response = yield call(updateNoticeAnnouncement, payload);
      const publishStatus = payload.dictPublishStatus;
      if (!response.error) {
        resolve && resolve(response);

        message.success(publishStatus === 0 ? '通知公告修改成功！' : '通知公告发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteNoticeAnnouncement({ payload }, { call, put }) {
      const response = yield call(deleteNoticeAnnouncement, payload);

      if (!response.error) {
        message.success('通知公告删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailNoticeAnnouncement({ payload, resolve }, { call, put }) {
      const response = yield call(detailNoticeAnnouncement, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailNoticeAnnouncementData: response,
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
