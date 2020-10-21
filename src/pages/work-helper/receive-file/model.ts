import { message } from 'antd';
import {
  addReceiveFile,
  deleteReceiveFile,
  updateReceiveFile,
  receiveFileList,
  detailReceiveFile,
} from './service';

const Model = {
  namespace: 'receiveFile',
  state: {
    receiveFileData: {},
    addModalVisible: false, // 新增modal visible
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    detailReceiveFileData: {},
  },
  effects: {
    *receiveFileList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.receiveFile.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(receiveFileList, params);

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
            receiveFileData: result,
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

    *addReceiveFile({ payload }, { call, put }) {
      const response = yield call(addReceiveFile, payload);
      const publishStatus = payload.isRelease;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            addModalVisible: false,
          },
        });
        message.success(publishStatus === 0 ? '收发文件新增成功！' : '收发文件发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateReceiveFile({ payload }, { call, put }) {
      const response = yield call(updateReceiveFile, payload);
      const publishStatus = payload.isRelease;
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success(publishStatus === 0 ? '收发文件修改成功！' : '收发文件发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteReceiveFile({ payload }, { call, put }) {
      const response = yield call(deleteReceiveFile, payload);

      if (!response.error) {
        message.success('收发文件删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailReceiveFile({ payload, resolve }, { call, put }) {
      const response = yield call(detailReceiveFile, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailReceiveFileData: response,
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
