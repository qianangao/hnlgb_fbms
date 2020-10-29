import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DetailForm from './form/OnlineRegistrationDetailForm';
import TableRegistered from './TableRegistered';

const DetailModal = ({ dispatch, loading, actionRef, detailOnlineRegistrationData }) => {
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
  useEffect(() => {
    if (DetailId) {
      dispatch({
        type: 'onlineRegistration/detailOnlineRegistrationInfo',
        payload: { id: DetailId },
      });
    }
  }, [DetailId]);
  const hideModal = () => {
    setDetailModalVisible(false);
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
      <DetailForm id={DetailId} detailOnlineRegistrationData={detailOnlineRegistrationData} />
      <TableRegistered id={DetailId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.onlineRegistration,
}))(DetailModal);
