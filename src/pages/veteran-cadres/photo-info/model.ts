import { message } from 'antd';
import {
  addPhotoInfo,
  deletePhotoInfo,
  updatePhotoInfo,
  photoInfoList,
  detailPhotoInfo,
  detailUserIdPhotoInfo,
} from './service';

const Model = {
  namespace: 'photoInfo',
  state: {
    photoInfoListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *photoInfoList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.vcBasicInfo.selectedOrgId);
      const params = {
        ...payload,
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(photoInfoList, params);

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
            photoInfoListData: result,
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
    *addPhotoInfo({ payload, resolve }, { call, put }) {
      const response = yield call(addPhotoInfo, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增照片信息成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updatePhotoInfo({ payload, resolve }, { call, put }) {
      const response = yield call(updatePhotoInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改照片信息成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deletePhotoInfo({ payload }, { call, put }) {
      const response = yield call(deletePhotoInfo, payload);

      if (!response.error) {
        message.success('照片信息删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *detailPhotoInfo({ payload, resolve }, { call }) {
      const response = yield call(detailPhotoInfo, payload);

      if (!response.error) {
        resolve && resolve(response);
      }
    },
    *detailUserIdPhotoInfo({ payload, resolve }, { call }) {
      const response = yield call(detailUserIdPhotoInfo, payload);

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
