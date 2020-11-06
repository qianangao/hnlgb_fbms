import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TableMembersModify from './TableMembersModify';

const CommunityModifyModal = ({ dispatch, actionRef }) => {
  const [communityId, setCommunityId] = useState('');
  const [memberModifyModalVisible, setMemberModifyModalVisible] = useState(false);

  const showModal = id => {
    if (id) {
      dispatch({
        type: 'oaCommunity/getCommunityDetail',
        payload: { id },
      });
    }
    setCommunityId(id);
    setMemberModifyModalVisible(true);
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
    setMemberModifyModalVisible(false);
    setCommunityId('');
  };

  return (
    <Modal
      title="编辑社团成员信息"
      centered
      width="80vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
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

export default connect(({ loading }) => ({
  loading: loading.models.oaCommunity,
}))(CommunityModifyModal);
