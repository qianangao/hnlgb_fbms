import { Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import ActivityUserTable from './ActivityUserTable';

const MembersModifyModal = ({ actionRef }) => {
  const [partyId, setPartyId] = useState('');
  const [memberModifyModalVisible, setMemberModifyModalVisible] = useState(false);

  const showModal = item => {
    setPartyId(item.partyId);
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
    setPartyId('');
    setMemberModifyModalVisible(false);
  };

  return (
    <Modal
      title="查看支部活动成员"
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
      <ActivityUserTable partyId={partyId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.studyRecord,
}))(MembersModifyModal);
