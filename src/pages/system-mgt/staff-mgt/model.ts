import { message } from 'antd';
import {
  getRoles,
  addStaff,
  updateStaff,
  deleteStaffs,
  getStaffList,
  getStaffInfo,
  resetStaffPwd,
} from './service';

const Model = {
  namespace: 'smStaffMgt',
  state: {
    roleData: {},
    searchRoleData: {},
    staffListData: {},
    staffInfo: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getRoles({ payload }, { call, put }) {
      const params = {
        allIndex: 'ONLY',
        ...payload,
      };
      const response = yield call(getRoles, params);
      if (!response.error) {
        const items = {};
        response.length > 0 &&
          response.forEach(item => {
            items[item.id] = item.roleName;
          });

        yield put({
          type: 'save',
          payload: {
            roleData: items,
          },
        });
      }
    },
    *getSearchRoles({ payload }, { call, put }) {
      const params = {
        ...payload,
      };
      const response = yield call(getRoles, params);
      if (!response.error) {
        const items = {};
        response.length > 0 &&
          response.forEach(item => {
            items[item.id] = item.roleName;
          });

        yield put({
          type: 'save',
          payload: {
            searchRoleData: items,
          },
        });
      }
    },
    *getStaffList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.smStaffMgt.selectedOrgId);

      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getStaffList, params);

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
            staffListData: result,
          },
        });
      }
    },
    *getStaffInfo({ payload, resolve }, { call, put }) {
      const response = yield call(getStaffInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            staffInfo: response,
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
    *addStaff({ payload, resolve }, { call, put }) {
      const response = yield call(addStaff, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('工作人员新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateStaff({ payload, resolve }, { call, put }) {
      const response = yield call(updateStaff, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改工作人员信息成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteStaffs({ payload }, { call, put }) {
      const response = yield call(deleteStaffs, payload);

      if (!response.error) {
        message.success('工作人员删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *resetStaffPwd({ payload }, { call }) {
      const response = yield call(resetStaffPwd, payload);

      if (!response.error) {
        yield message.success('工作人员密码重置成功！');
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
