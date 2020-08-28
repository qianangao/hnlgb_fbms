import React, { useEffect } from 'react';
import { Tree, Input } from 'antd';
import { connect } from 'umi';
import styles from './index.less';

const OrgTree = ({ onOrgSelect, orgData, dispatch }) => {
  useEffect(() => {
    dispatch({ type: 'orgTree/getOrgTreeById' });
  }, []);

  const searchChangeHander = _ => {
    // const { value } = e.target;
    // searchOrgTree
  };

  const orgSelectHandler = selectedKeys => {
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
      <Input.Search style={{ marginBottom: 8 }} placeholder="查询" onChange={searchChangeHander} />
      <Tree
        blockNode
        treeData={orgData}
        loadData={orgLoadDataHandler}
        onSelect={orgSelectHandler}
      />
    </div>
  );
};

export default connect(({ orgTree }) => ({
  orgData: orgTree.searchOrgTreeData,
}))(OrgTree);
