import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TableMembersModify from './TableMembersModify';

const MembersModifyModal = ({ dispatch, memberModifyModalVisible, actionRef }) => {
  const [communityId, setCommunityId] = useState('');

  const showModal = id => {
    setCommunityId(id);
    dispatch({
      type: 'branchInformation/save',
      payload: {
        memberModifyModalVisible: true,
      },
    });
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }
    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    dispatch({
      type: 'branchInformation/save',
      payload: {
        memberModifyModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="编辑党费管理成员信息"
      centered
      width="80vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={memberModifyModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[]}
    >
      <TableMembersModify id={communityId} />
    </Modal>
  );
};

export default connect(({ branchInformation, loading }) => ({
  memberModifyModalVisible: branchInformation.memberModifyModalVisible,
  loading: loading.models.branchInformation,
}))(MembersModifyModal);
