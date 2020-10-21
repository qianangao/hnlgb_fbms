import { message } from 'antd';
import {
  addBranchInformation,
  deleteBranchInformation,
  updateBranchInformation,
  branchInformationList,
  detailBranchInformation,
  partyUserList,
  addPartyUser,
  deletePartyUser,
  getUsersNoParty,
} from './service';

const Model = {
  namespace: 'branchInformation',
  state: {
    branchInformationData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailbranchInformationData: {},
    partyUserListData: {},
    politicalStatusLgbsData: {},
    partyData: {},
  },
  effects: {
    *branchInformationList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.branchInformation.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(branchInformationList, params);

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
        const partyData = {};
        response.items.length > 0 &&
          response.items.forEach(item => {
            partyData[item.id] = item.partyName;
          });
        yield put({
          type: 'save',
          payload: {
            branchInformationData: result,
            partyData,
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

    *addBranchInformation({ payload }, { call, put }) {
      const response = yield call(addBranchInformation, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });
        message.success('支部信息新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateBranchInformation({ payload }, { call, put }) {
      const response = yield call(updateBranchInformation, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });
        message.success('支部信息修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteBranchInformation({ payload }, { call, put }) {
      const response = yield call(deleteBranchInformation, payload);
      if (!response.error) {
        message.success('支部信息删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailBranchInformation({ payload, resolve }, { call, put }) {
      const response = yield call(detailBranchInformation, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailBranchInformationData: response,
          },
        });
      }
    },
    *getPartyUserList({ payload, resolve }, { call, put }) {
      const response = yield call(partyUserList, payload);

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
            partyUserListData: result,
          },
        });
      }
    },
    *addPartyUser({ payload, resolve }, { call }) {
      const response = yield call(addPartyUser, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('支部成员新增成功！');
      }
    },
    *deletePartyUser({ payload, resolve }, { call }) {
      const response = yield call(deletePartyUser, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('支部成员删除成功！');
      }
    },
    *getUsersNoParty({ payload, resolve }, { call, put }) {
      const response = yield call(getUsersNoParty, payload);
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
            politicalStatusLgbsData: result,
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
