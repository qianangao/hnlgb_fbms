import React, { useEffect, useState } from 'react';
import { Tree, Input } from 'antd';
import { connect } from 'umi';
import styles from './index.less';

const OrgTree = ({ onOrgSelect, orgTree, dispatch }) => {
  const [hasSearch, setHasSearch] = useState(false);

  const {
    searchOrgTreeData,
    orgTreeData,
    orgLoadedLoadedKeys,
    orgSelectedKeys,
    orgExpandedKeys,
  } = orgTree;

  useEffect(() => {
    dispatch({ type: 'orgTree/getOrgTreeById' });
  }, []);

  const orgSearchHander = value => {
    if (!value) return;

    setHasSearch(true);

    dispatch({
      type: 'orgTree/searchOrgTree',
      payload: {
        organizationName: value,
      },
    });
  };

  const orgChangeHander = event => {
    if (hasSearch && !event.target.value) {
      dispatch({
        type: 'orgTree/clearSearchData',
      });

      setHasSearch(false);
    }
  };

  const orgExpandHandler = node => {
    dispatch({
      type: 'orgTree/save',
      payload: {
        orgExpandedKeys: node,
      },
    });
  };
  const orgSelectHandler = selectedKeys => {
    dispatch({
      type: 'orgTree/save',
      payload: {
        orgSelectedKeys: selectedKeys,
      },
    });

    onOrgSelect && onOrgSelect(selectedKeys[0]);
  };

  const orgLoadDataHandler = treeNode => {
    return new Promise(resolve => {
      if (treeNode.children) {
        resolve();
        return;
      }

      dispatch({
        type: 'orgTree/getOrgTreeById',
        payload: {
          id: treeNode.id,
        },
        resolve,
      });
    });
  };
  return (
    <div className={styles.treeContent}>
      <Input.Search
        style={{ marginBottom: 8 }}
        placeholder="查询"
        onSearch={orgSearchHander}
        onChange={orgChangeHander}
      />
      <Tree
        treeData={searchOrgTreeData || orgTreeData}
        loadData={orgLoadDataHandler}
        loadedKeys={orgLoadedLoadedKeys}
        onSelect={orgSelectHandler}
        selectedKeys={orgSelectedKeys}
        onExpand={orgExpandHandler}
        expandedKeys={orgExpandedKeys}
      />
    </div>
  );
};

export default connect(({ orgTree }) => ({
  orgTree,
}))(OrgTree);
