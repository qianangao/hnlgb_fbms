import { Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import CommentTable from './CommentTable';

const CommentModal = ({ actionRef }) => {
  const [activityId, setActivityId] = useState();
  const [memberModifyModalVisible, setMemberModifyModalVisible] = useState(false);

  const showModal = item => {
    setActivityId(item.id);
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
    setActivityId('');
    setMemberModifyModalVisible(false);
  };

  return (
    <Modal
      title="查看活动评论"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 58px)',
        overflowX: 'hidden',
      }}
      visible={memberModifyModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[]}
    >
      <CommentTable activityId={activityId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.studyRecord,
}))(CommentModal);
