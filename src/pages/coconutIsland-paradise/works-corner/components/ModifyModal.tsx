import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import WorksCornerForm from './form/WorksCornerForm';
import CommentTable from './CommentTable';

const ModifyModal = ({ actionRef }) => {
  const [form] = WorksCornerForm.useForm();
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [infoId, setInfoId] = useState();

  const showModal = item => {
    setInfoId(item.id);
    setModifyModalVisible(true);
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
    setModifyModalVisible(false);
  };

  return (
    <Modal
      title="审核评论"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      footer={[]}
      maskClosable={false}
      destroyOnClose
      onCancel={hideModal}
    >
      <CommentTable form={form} id={infoId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.worksCorner,
}))(ModifyModal);
