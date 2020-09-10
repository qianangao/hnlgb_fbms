import { message } from 'antd';
import {
  addLgb,
  deleteLgb,
  getLgbList,
  resetLgbPwd,
  getLgbDetail,
  updateLgb,
  getFamilyLgb,
  updateFamilyLgb,
  getPartTimeLgb,
  updatePartTimeLgb,
  getHealthyLgb,
  updateHealthyLgb,
} from './service';

const Model = {
  namespace: 'vcBasicInfo',
  state: {
    lgbListData: {},
    lgbDetailData: {},
    addModalVisible: false, // 新增modal visible
    modifyModalVisible: false, // 修改modal visible
    detailModalVisible: false, // 详情modal visible
    orgSelectModalVisible: false, // 单位选择modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.vcBasicInfo.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);

      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const { dateOfBirth } = params;

      if (dateOfBirth && dateOfBirth.length === 2) {
        [params.dateOfBirthStart, params.dateOfBirthEnd] = dateOfBirth;
      }

      delete params.dateOfBirth;

      const response = yield call(getLgbList, params);

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
            lgbListData: result,
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
    *updateLgbOrg({ payload }, { call, put }) {
      const response = yield call(updateLgb, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            orgSelectModalVisible: false,
          },
        });

        message.success('修改所选老干部单位成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *resetLgbPwd({ payload }, { call, put }) {
      const response = yield call(resetLgbPwd, payload);

      if (!response.error) {
        message.success('老干部账号密码重置成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addLgb({ payload }, { call, put }) {
      const response = yield call(addLgb, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });

        message.success('新增老干部成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteLgb({ payload }, { call, put }) {
      const response = yield call(deleteLgb, payload);

      if (!response.error) {
        message.success('老干部删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *getLgbDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getLgbDetail, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            lgbDetailData: response,
          },
        });
      }
    },
    *updateLgb({ payload, resolve }, { call, put }) {
      const response = yield call(updateLgb, payload);

      if (!response.error) {
        message.success('修改老干部信息成功！');

        yield resolve && resolve();
        yield put({
          type: 'tableReload',
        });
      }
    },
    *getFamilyLgb({ payload, resolve }, { call }) {
      const response = yield call(getFamilyLgb, payload);

      if (!response.error) {
        resolve && resolve(response);
      }
    },
    *updateFamilyLgb({ payload, resolve }, { call }) {
      const response = yield call(updateFamilyLgb, payload);

      if (!response.error) {
        message.success('修改老干部家庭信息成功！');
        yield resolve && resolve();
      }
    },
    *getPartTimeLgb({ payload, resolve }, { call }) {
      const response = yield call(getPartTimeLgb, payload);

      if (!response.error) {
        resolve && resolve(response);
      }
    },
    *updatePartTimeLgb({ payload, resolve }, { call }) {
      const response = yield call(updatePartTimeLgb, payload);

      if (!response.error) {
        message.success('修改老干社会兼职信息成功！');
        yield resolve && resolve();
      }
    },
    *getHealthyLgb({ payload, resolve }, { call }) {
      const response = yield call(getHealthyLgb, payload);

      if (!response.error) {
        resolve && resolve(response);
      }
    },
    *updateHealthyLgb({ payload, resolve }, { call }) {
      const response = yield call(updateHealthyLgb, payload);

      if (!response.error) {
        message.success('修改老干健康档案信息成功！');
        yield resolve && resolve();
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
