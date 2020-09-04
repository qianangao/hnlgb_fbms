import { message } from 'antd';
import { addSpecialty, deleteSpecialty, updateSpecialty, specialtyList } from './service';

const Model = {
  namespace: 'specialty',
  state: {
    specialtyListData: {},
    modifyModalVisible: false, // 新增修改modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *specialtyList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.specialty.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const { dateOfBirth } = params;

      if (dateOfBirth && dateOfBirth.length === 2) {
        [params.dateOfBirthStart, params.dateOfBirthEnd] = dateOfBirth;
      }

      delete params.dateOfBirth;
      const response = yield call(specialtyList, params);

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
            specialtyListData: result,
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
    *addSpecialty({ payload }, { call, put }) {
      const response = yield call(addSpecialty, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });

        message.success('新增银色人才成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateSpecialty({ payload }, { call, put }) {
      const response = yield call(updateSpecialty, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success('银色人才修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteSpecialty({ payload }, { call, put }) {
      const response = yield call(deleteSpecialty, payload);

      if (!response.error) {
        message.success('银色人才删除成功！');
        yield put({
          type: 'tableReload',
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
