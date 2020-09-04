import { getOrgTreeById, searchOrgTree } from '@/services/global/orgTree';

const transformOrgTreeData = tree => {
  const parentIds = [];
  tree.map(node => {
    if (node.children) {
      parentIds.push(node.id);
      parentIds.push(...transformOrgTreeData(node.children));
    }
    node.key = node.id || node.key;
    node.title = node.organizationName || node.title;
    node.isSubunit !== undefined && (node.isLeaf = !node.isSubunit);
    return node;
  });

  return parentIds;
};

const updateTreeData = (list, key, children) => {
  return list.map(node => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
};

const model = {
  namespace: 'orgTree',
  state: {
    orgTreeData: [],
    searchOrgTreeData: null,
    orgLoadedLoadedKeys: [],
    orgSelectedKeys: [],
    orgExpandedKeys: [],
  },
  effects: {
    *getOrgTreeById({ payload = {}, orgSymbol, resolve }, { call, put, select }) {
      const { organizationId, organizationName } = yield select(state => state.user.userInfo);
      const orgTreeData = yield select(state => state.orgTree[orgSymbol].orgTreeData);
      const orgLoadedLoadedKeys = yield select(
        state => state.orgTree[orgSymbol].orgLoadedLoadedKeys,
      );
      const id = payload.id || organizationId; // 默认使用user的orgid

      const response = yield call(getOrgTreeById, {
        id,
      });

      if (!response.error) {
        if (orgTreeData.length === 0) {
          orgTreeData.push({
            key: organizationId,
            title: organizationName,
          });

          yield put({
            type: 'save',
            payload: {
              orgSelectedKeys: [organizationId],
              orgExpandedKeys: [organizationId],
            },
            orgSymbol,
          });
        }

        transformOrgTreeData(response);

        const treeData = updateTreeData(orgTreeData, id, response);

        resolve && resolve();

        yield put({
          type: 'save',
          payload: {
            orgTreeData: treeData,
            orgLoadedLoadedKeys: [...orgLoadedLoadedKeys, id],
          },
          orgSymbol,
        });
      }
    },
    *searchOrgTree({ payload, orgSymbol }, { call, put }) {
      const response = yield call(searchOrgTree, payload);

      if (!response.error) {
        const parentIds = transformOrgTreeData(response);

        yield put({
          type: 'save',
          payload: {
            searchOrgTreeData: response,
            orgExpandedKeys: parentIds,
          },
          orgSymbol,
        });
      }
    },
    *clearSearchData({ orgSymbol }, { put, select }) {
      const { organizationId } = yield select(state => state.user.userInfo);
      yield put({
        type: 'save',
        payload: {
          searchOrgTreeData: null,
          orgExpandedKeys: [organizationId],
        },
        orgSymbol,
      });
    },
  },
  reducers: {
    save(state, { payload, orgSymbol }) {
      const symbolData = { ...state[orgSymbol], ...payload };

      return { ...state, [orgSymbol]: symbolData };
    },
    initTreeData(state, { payload, orgSymbol }) {
      const { value } = payload;
      return {
        ...state,
        [orgSymbol]: {
          orgTreeData: [],
          searchOrgTreeData: null,
          orgLoadedLoadedKeys: [],
          orgSelectedKeys: value ? [value] : [],
          orgExpandedKeys: [],
        },
      };
    },
    destroyTree(state, { orgSymbol }) {
      const stateTemp = state;
      delete stateTemp[orgSymbol];

      return {
        ...stateTemp,
      };
    },
  },
};
export default model;
