import { getChartData } from './service';

const Model = {
  namespace: 'vcAnalysisChart',
  state: {
    chartData: {},
  },
  effects: {
    *getChartData({ payload, resolve }, { call, put }) {
      const response = yield call(getChartData, payload);

      if (!response.error) {
        yield put({
          type: 'saveChartData',
          payload: {
            [payload.path]: response,
          },
        });

        resolve && resolve(response);
      }
    },
  },
  reducers: {
    saveChartData(state, { payload }) {
      const chartData = { ...state.chartData, ...payload };
      return { ...state, chartData };
    },
  },
};

export default Model;
