import { message } from 'antd';
import { getRoleList, getRules, getRuleIds, updateRoleRules } from './service';

const transformRuleData = tree => {
  tree.forEach(node => {
    if (node.routes) {
      node.children = node.routes;
      transformRuleData(node.children);
    }

    node.key = node.id || node.key;
    node.title = node.ruleName || node.title;
    return node;
  });
};

const Model = {
  namespace: 'smRoleRule',
  state: {
    roleListData: {},
    ruleData: [],
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getRoleList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.smRoleRule.selectedOrgId);

      const params = {
        ...payload,
        orgIdForDataSelect,
        allIndex: 'ONLY',
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getRoleList, params);

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
            roleListData: result,
          },
        });
      }
    },

    *getRuleIds({ payload, resolve }, { call }) {
      const response = yield call(getRuleIds, payload);

      if (!response.error) {
        yield resolve && resolve(response);
      }
    },
    *getRules({ payload }, { call, put }) {
      const response = yield call(getRules, payload);

      transformRuleData(response);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            ruleData: response,
          },
        });
      }
    },
    *updateRoleRules({ payload, resolve }, { call }) {
      const response = yield call(updateRoleRules, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('角色权限修改成功！');
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
