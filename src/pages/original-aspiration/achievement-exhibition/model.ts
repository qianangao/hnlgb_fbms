import { message } from 'antd';
import {
  getAchievementList,
  addAchievement,
  deleteAchievement,
  updateAchievement,
  detailAchievement,
} from './service';

const Model = {
  namespace: 'oaAchievementExhibition',
  state: {
    AchievementListData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailAchievementData: {},
  },
  effects: {
    *getAchievementList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.oaAchievementExhibition.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getAchievementList, params);

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
            AchievementListData: result,
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

    *addAchievement({ payload }, { call, put }) {
      const response = yield call(addAchievement, payload);
      const { isPublished } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });
        message.success(isPublished === 0 ? '成果信息新增成功！' : '成果信息发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateAchievement({ payload }, { call, put }) {
      const response = yield call(updateAchievement, payload);
      const { isPublished } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success(isPublished === 0 ? '成果信息修改成功！' : '成果信息发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteAchievement({ payload }, { call, put }) {
      const response = yield call(deleteAchievement, payload);

      if (!response.error) {
        message.success('成果信息删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailAchievement({ payload, resolve }, { call, put }) {
      const response = yield call(detailAchievement, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailAchievementData: response,
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
