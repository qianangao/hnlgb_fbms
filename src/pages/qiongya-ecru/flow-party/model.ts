import { message } from 'antd';
import {
  addFlowParty,
  deleteFlowParty,
  updateFlowParty,
  flowPartyList,
  detailFlowParty,
} from './service';

const Model = {
  namespace: 'flowParty',
  state: {
    flowPartyListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *flowPartyList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.flowParty.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);
      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(flowPartyList, params);

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
            flowPartyListData: result,
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
    *addFlowParty({ payload, resolve }, { call, put }) {
      const response = yield call(addFlowParty, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增流动党员登记成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateFlowParty({ payload, resolve }, { call, put }) {
      const response = yield call(updateFlowParty, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改流动党员登记成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteFlowParty({ payload }, { call, put }) {
      const response = yield call(deleteFlowParty, payload);

      if (!response.error) {
        message.success('流动党员登记删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailFlowParty({ payload, resolve }, { call }) {
      const response = yield call(detailFlowParty, payload);

      if (!response.error) {
        resolve && resolve(response);
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
