import { getOrganization } from '../service';

const Model = {
  namespace: 'returnworkGlobal',
  state: {
    organizations: {
      0: [
        {
          value: '1003',
          label: '伦教镇',
          isLeaf: false,
        },
      ],
    },
  },
  effects: {
    *getOrganization({ payload, callback }, { call, put, select }) {
      const organizations = yield select(state => state.returnworkGlobal.organizations);

      if (organizations[payload.id] && organizations[payload.id].length > 0) {
        callback(organizations[payload.id]);
        return;
      }

      const response = yield call(getOrganization, payload);

      if (!response || !response.error) {
        const result = response.map(item => ({
          value: item.id,
          label: item.organizationName,
          isLeaf: item.id.split('-').length === 3, // 入如果d为三级，标记为子节点
        }));

        callback(result);
        yield put({
          type: 'saveOrganizations',
          payload: {
            organizations: {
              [payload.id]: result,
            },
          },
        });
      } else {
        callback([]);
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveOrganizations(state, { payload: organizations }) {
      return { ...state, organizations: { ...state.organizations, ...organizations } };
    },
  },
};
export default Model;
