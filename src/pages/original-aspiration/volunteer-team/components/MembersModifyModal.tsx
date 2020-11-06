import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TableMembers from './TableMembers';

const TeamModifyModal = ({ actionRef }) => {
  const [infoId, setInfoId] = useState('');
  const [memberModifyModalVisible, setMemberModifyModalVisible] = useState(false);

  const showModal = id => {
    setInfoId(id);
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
    setInfoId('');
  };

  return (
    <Modal
      title="查看志愿团队成员"
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
      <TableMembers id={infoId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.oaVolunteerTeam,
}))(TeamModifyModal);
