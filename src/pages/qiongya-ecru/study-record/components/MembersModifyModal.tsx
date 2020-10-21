import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TableMembersModify from './TableMembersModify';

const CommunityModifyModal = ({ dispatch, memberModifyModalVisible, actionRef }) => {
  const [studyRecordId, setStudyRecordId] = useState('');

  const showModal = id => {
    setStudyRecordId(id);
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

export default connect(({ studyRecord, loading }) => ({
  memberModifyModalVisible: studyRecord.memberModifyModalVisible,
  loading: loading.models.studyRecord,
}))(CommunityModifyModal);
