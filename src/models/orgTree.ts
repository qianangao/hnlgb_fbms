import { getOrgTreeById, searchOrgTree } from '@/services/orgTree';

const transformOrgTreeData = tree => {
  tree.map(node => {
    if (node.children) {
      transformOrgTreeData(node.children);
    }
    node.key = node.id || node.key;
    node.title = node.organizationName || node.title;
    node.isSubunit !== undefined && (node.isLeaf = !!node.isSubunit);
    return node;
  });
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
    searchOrgTreeData: [],
  },
  effects: {
    *getOrgTreeById({ payload = {}, resolve }, { call, put, select }) {
      const { organizationId, organizationName } = yield select(state => state.user.userInfo);
      const searchOrgTreeData = yield select(state => state.orgTree.searchOrgTreeData);
      const id = payload.id || organizationId; // 默认使用user的orgid

      const response = yield call(getOrgTreeById, {
        id,
      });

      if (!response.error) {
        if (searchOrgTreeData.length === 0) {
          searchOrgTreeData.push({
            key: organizationId,
            title: organizationName,
          });
        }

        transformOrgTreeData(response);

        const treeData = updateTreeData(searchOrgTreeData, id, response);

        resolve && resolve();

        yield put({
          type: 'save',
          payload: {
            searchOrgTreeData: treeData,
          },
        });
      }
    },
    *searchOrgTree({ payload }, { call, put }) {
      const response = yield call(searchOrgTree, payload);

      if (!response.error) {
        transformOrgTreeData(response);

        yield put({
          type: 'save',
          payload: {
            searchOrgTreeData: response,
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
export default model;
