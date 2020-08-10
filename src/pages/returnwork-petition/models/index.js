import moment from 'moment';
import { downloadCSVFile, downloadExcelFile } from '@/utils';
import { getReturnworkList, exportReturnworkList } from '../service';

const Model = {
  namespace: 'returnworkPetition',
  state: {
    returnworkList: {
      data: [],
      page: 1,
      pageSize: 10,
      success: undefined,
      total: 0,
    },
  },
  effects: {
    *getList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      if (payload.gmtModified && payload.gmtModified.length === 2) {
        params.modifiedTimeStart = moment(payload.gmtModified[0]).format('YYYY-MM-DD HH:mm:ss');
        params.modifiedTimeEnd = moment(payload.gmtModified[1]).format('YYYY-MM-DD HH:mm:ss');
        delete params.gmtModified;
      }

      const response = yield call(getReturnworkList, params);

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
            returnworkList: result,
          },
        });
      }
    },
    *exportList({ payload }, { call }) {
      const params = {
        ...payload.formData,
      };

      delete params.current;
      delete params.pageSize;

      if (payload.gmtModified && payload.gmtModified.length === 2) {
        params.modifiedTimeStart = moment(payload.gmtModified[0]).format('YYYY-MM-DD HH:mm:ss');
        params.modifiedTimeEnd = moment(payload.gmtModified[1]).format('YYYY-MM-DD HH:mm:ss');
        delete params.gmtModified;
      }

      const response = yield call(exportReturnworkList, payload);

      if (!response || !response.error) {
        if (payload.type === 'csv') {
          yield downloadCSVFile(response, '申请复工商户列表');
        } else {
          yield downloadExcelFile(response, '申请复工商户列表');
        }
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
