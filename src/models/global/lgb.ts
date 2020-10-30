import { getLgbList } from '@/services/global/lgb';

const Model = {
  namespace: 'globalLgb',
  state: {
    lgbListData: {},
  },
  effects: {
    *getLgbList({ payload, resolve }, { call, put, select }) {
      const { organizationId } = yield select(state => state.user.userInfo);

      const params = {
        ...payload,
        orgIdForDataSelect: payload.orgIdForDataSelect || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getLgbList, params);

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
            lgbListData: result,
          },
        });
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
