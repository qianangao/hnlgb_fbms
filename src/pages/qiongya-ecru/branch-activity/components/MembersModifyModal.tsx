import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ActivityUserTable from './ActivityUserTable';

const CommunityModifyModal = ({ dispatch, memberModifyModalVisible, actionRef }) => {
  const [partyId, setPartyId] = useState('');
  const showModal = item => {
    setPartyId(item.partyId);
    dispatch({
      type: 'studyRecord/save',
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
      type: 'studyRecord/save',
      payload: {
        memberModifyModalVisible: false,
      },
    });
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

export default connect(({ studyRecord, loading }) => ({
  memberModifyModalVisible: studyRecord.memberModifyModalVisible,
  loading: loading.models.studyRecord,
}))(CommunityModifyModal);
