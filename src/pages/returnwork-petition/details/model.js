import { message } from 'antd';
import {
  getShopsBaseInfo,
  getShopsBasePersonList,
  editReturnworkEnterprise,
  addReturnworkPerson,
  editReturnworkPerson,
  deleteReturnworkPerson,
  importReturnworkPersonList,
} from './service';

const Model = {
  namespace: 'returnworkPetitionDetails',
  state: {
    detailData: {},
    tableRef: {},
    personnelInformation: {
      data: [],
      page: 1,
      pageSize: 10,
      success: undefined,
      total: 0,
    },
    enterpriseModalVisable: false,
    personModalVisable: false,
  },
  effects: {
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getShopsBaseInfo, payload);

      if (!response || !response.error) {
        yield put({
          type: 'save',
          payload: {
            detailData: response,
          },
        });
      }
    },
    *getReturnworkPersonList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getShopsBasePersonList, params);

      if (!response || !response.error) {
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
            personnelInformation: result,
          },
        });
      }
    },
    *editReturnworkEnterprise({ payload }, { call, put }) {
      const response = yield call(editReturnworkEnterprise, payload);

      if (!response || !response.error) {
        yield put({
          type: 'changeEnterpriseModalVisable',
          payload: {
            visible: false,
          },
        });

        yield put({
          type: 'getDetail',
          payload: {
            id: payload.id,
          },
        });
      }
    },
    *addReturnworkPerson({ payload }, { call, put }) {
      const params = {
        enterpriseId: payload.enterpriseId,
        personnelList: [{ ...payload }],
      };
      const response = yield call(addReturnworkPerson, params);

      if (!response || !response.error) {
        yield put({
          type: 'changePersonModalVisable',
          payload: {
            visible: false,
          },
        });
        message.success('新增复工员工成功！');
        yield put({
          type: 'tableReset',
        });
      }
    },
    *editReturnworkPerson({ payload }, { call, put }) {
      const response = yield call(editReturnworkPerson, payload);

      if (!response || !response.error) {
        yield put({
          type: 'changePersonModalVisable',
          payload: {
            visible: false,
          },
        });
        message.success('所选复工员工信息更新成功！');
        yield put({
          type: 'tableReset',
        });
      }
    },
    *deleteReturnworkPerson({ payload }, { call, put }) {
      const response = yield call(deleteReturnworkPerson, payload);

      if (!response || !response.error) {
        message.success('所选复工员工成功删除！');
        yield put({
          type: 'tableReset',
        });
      }
    },
    *importReturnworkPersonList({ payload }, { call, put }) {
      const res = yield (yield put({
        type: 'global/uploadFile',
        payload,
      })).then(data => data);

      if (!res) {
        return;
      }

      const response = yield call(importReturnworkPersonList, {
        enterpriseId: payload.id,
        excelName: res.url.slice(res.url.lastIndexOf('/') + 1),
        path: res.path,
      });

      if (!response || !response.error) {
        if (response && response.length > 0) {
          message.warning('导入数据格式有误，请确认并更正数据后重新导入！');
        } else {
          message.success('复工员工信息批量导入成功！');
          yield put({
            type: 'tableReset',
          });
        }
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    changeEnterpriseModalVisable(state, { payload: { visible } }) {
      return { ...state, enterpriseModalVisable: visible };
    },
    changePersonModalVisable(state, { payload: { visible } }) {
      return { ...state, personModalVisable: visible };
    },
    tableReset(state) {
      const tableRef = state.tableRef || {};
      setTimeout(() => {
        tableRef.current.reload();
      }, 0);
      return { ...state };
    },
  },
};
export default Model;
