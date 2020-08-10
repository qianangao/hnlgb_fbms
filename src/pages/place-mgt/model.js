import { message } from 'antd';
import { addPlace, updatePlace, deletePlace, getPlaceList } from './service';

const Model = {
  namespace: 'placeMgt',
  state: {
    placeList: {
      data: [],
      page: 1,
      pageSize: 10,
      success: undefined,
      total: 0,
    },
    modifyModalVisible: false, // 新增修改modal visible
    qrcodeModalVisible: false, // 二维码modal visible
    tableRef: {},
    qrcodePlaceId: '',
  },
  effects: {
    *getList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getPlaceList, params);

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
            placeList: result,
          },
        });
      }
    },
    *addPlace({ payload }, { call, put }) {
      const response = yield call(addPlace, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success('新增地址成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updatePlace({ payload }, { call, put }) {
      const response = yield call(updatePlace, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });

        message.success('修改地址信息成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deletePlace({ payload }, { call, put }) {
      const response = yield call(deletePlace, payload);

      message.success('地址删除成功！');

      if (!response.error) {
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
