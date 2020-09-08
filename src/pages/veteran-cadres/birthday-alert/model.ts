import { message } from 'antd';
import { getBirthdayList, isReminder, reminderCron } from './service';

const Model = {
  namespace: 'vcBirthdayInfo',
  state: {
    BirthdayListData: {},
    tableRef: {},
    openRemindModal: false, // 提醒时间modal
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.vcBirthdayInfo.selectedOrgId);
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

      const response = yield call(getBirthdayList, params);

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
            BirthdayListData: result,
          },
        });
      }
    },

    *isReminder({ payload }, { call, put }) {
      const response = yield call(isReminder, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            // modifyModalVisible: false,
          },
        });

        message.success('修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },

    *ReminderSet({ payload }, { call, put }) {
      const response = yield call(reminderCron, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            openRemindModal: false,
          },
        });

        message.success('设置成功！');

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