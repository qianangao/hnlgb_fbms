import { message } from 'antd';
import {
  getExperienceList,
  addExperience,
  deleteExperience,
  updateExperience,
  detailExperience,
} from './service';

const Model = {
  namespace: 'oaExperienceIntroduction',
  state: {
    ExperienceListData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailExperienceData: {},
  },
  effects: {
    *getExperienceList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(
        state => state.oaExperienceIntroduction.selectedOrgId,
      );
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getExperienceList, params);

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
            ExperienceListData: result,
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

    *addExperience({ payload }, { call, put }) {
      const response = yield call(addExperience, payload);
      const { isPublished } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });
        message.success(isPublished === 0 ? '经验介绍新增成功！' : '经验介绍发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateExperience({ payload }, { call, put }) {
      const response = yield call(updateExperience, payload);
      const { isPublished } = payload;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success(isPublished === 0 ? '经验介绍修改成功！' : '经验介绍发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteExperience({ payload }, { call, put }) {
      const response = yield call(deleteExperience, payload);

      if (!response.error) {
        message.success('经验介绍删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailExperience({ payload, resolve }, { call, put }) {
      const response = yield call(detailExperience, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailExperienceData: response,
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
