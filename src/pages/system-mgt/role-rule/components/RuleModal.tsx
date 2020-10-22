import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Tree, Spin } from 'antd';

const ModifyModal = ({ ruleData, dispatch, actionRef, loading, confirmLoading }) => {
  const [roleId, setRoleId] = useState('');
  const [ruleModalVisible, setModalVisible] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);

  const showModal = id => {
    setRoleId(id);

    new Promise(resolve => {
      dispatch({
        type: `smRoleRule/getRuleIds`,
        payload: {
          id,
        },
        resolve,
      });
    }).then(data => {
      setCheckedKeys(data);
    });

    setModalVisible(true);
  };

  useEffect(() => {
    dispatch({
      type: `smRoleRule/getRules`,
    });

    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    setModalVisible(false);
  };

  const onCheckHandler = keys => {
    setCheckedKeys(keys);
  };

  const handleOk = () => {
    new Promise(resolve => {
      dispatch({
        type: `smRoleRule/updateRoleRules`,
        payload: {
          roleId,
        },
        resolve,
      });
    }).then(_ => {
      hideModal();
    });
  };

  return (
    <Modal
      title="配置角色权限"
      centered
      width={500}
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '20px',
      }}
      visible={ruleModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={confirmLoading}
      onCancel={hideModal}
    >
      <Spin spinning={loading}>
        <Tree checkable onCheck={onCheckHandler} checkedKeys={checkedKeys} treeData={ruleData} />
      </Spin>
    </Modal>
  );
};

export default connect(({ smRoleRule, loading }) => ({
  ruleData: smRoleRule.ruleData,
  loading: loading.effects['smRoleRule/getRuleIds'],
  confirmLoading: loading.effects['smRoleRule/updateRoleRules'],
}))(ModifyModal);
