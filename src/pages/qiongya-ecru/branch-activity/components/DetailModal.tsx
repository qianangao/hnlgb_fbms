import { Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import DetailForm from './form/DetailForm';

const DetailModal = ({ loading, actionRef }) => {
  const [detailId, setDetailId] = useState('');
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
    setDetailId('');
    setDetailModalVisible(false);
  };

  return (
    <Modal
      title="查看支部活动"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflowX: 'hidden',
      }}
      visible={detailModalVisible}
      footer={null}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflow: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <DetailForm id={detailId} />
      </div>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.branchActivity,
}))(DetailModal);
