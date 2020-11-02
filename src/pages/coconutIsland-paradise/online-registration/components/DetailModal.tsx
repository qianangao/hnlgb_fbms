import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DetailForm from './form/OnlineRegistrationDetailForm';
import TableRegistered from './TableRegistered';

const DetailModal = ({ loading, actionRef }) => {
  const [DetailId, setDetailId] = useState('');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const showModal = item => {
    setDetailId(item.id);
    setDetailModalVisible(true);
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
    setDetailModalVisible(false);
    setDetailId('');
  };

  return (
    <Modal
      title="网络报名详情"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={detailModalVisible}
      footer={null}
      destroyOnClose
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <DetailForm id={DetailId} />
      <TableRegistered id={DetailId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.onlineRegistration,
}))(DetailModal);
