import {
  getRetireReBasicsData,
  getRetireReTotalYearsData,
  getRetireTotalYearsData,
  getRetireBaseData,
} from './service';

const Model = {
  namespace: 'retiredCadresAnalysisSheet',
  state: {
    sheetData: {
      retireReTotalYearsData: [],
      retireTotalYearsData: [],
      retireBaseData: [],
    },
  },
  effects: {
    *getRetireReBasicsData({ payload }, { call, put }) {
      const response = yield call(getRetireReBasicsData, payload);

      if (!response || !response.error) {
        yield put({
          type: 'saveSheetData',
          payload: {
            [payload.dictUnitNature]: response || [],
          },
        });
      }
    },
    *getRetireReTotalYearsData({ payload }, { call, put }) {
      const response = yield call(getRetireReTotalYearsData, payload);

      if (!response || !response.error) {
        yield put({
          type: 'saveSheetData',
          payload: {
            retireReTotalYearsData: response || [],
          },
        });
      }
    },
    *getRetireTotalYearsData({ payload }, { call, put }) {
      const response = yield call(getRetireTotalYearsData, payload);

      if (!response || !response.error) {
        yield put({
          type: 'saveSheetData',
          payload: {
            retireTotalYearsData: response || [],
          },
        });
      }
    },
    *getRetireBaseData({ payload }, { call, put }) {
      const response = yield call(getRetireBaseData, payload);

      if (!response || !response.error) {
        yield put({
          type: 'saveSheetData',
          payload: {
            retireBaseData: response || [],
          },
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveSheetData(state, { payload }) {
      const sheetData = { ...state.sheetData, ...payload };
      return { ...state, sheetData };
    },
  },
};

export default Model;
