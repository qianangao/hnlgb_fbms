import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TableMembersModify from './TableMembersModify';

const CommunityModifyModal = ({ actionRef }) => {
  const [studyRecordId, setStudyRecordId] = useState('');
  const [memberModifyModalVisible, setMemberModifyModalVisible] = useState(false);

  const showModal = id => {
    setStudyRecordId(id);
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
    setMemberModifyModalVisible(true);
  };

  return (
    <Modal
      title="编辑学习记录成员信息"
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
      <TableMembersModify id={studyRecordId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.studyRecord,
}))(CommunityModifyModal);
