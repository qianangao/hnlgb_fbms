import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DetailForm from './form/ActivityCenterDetailForm';

const DetailModal = ({ loading, actionRef }) => {
  const [DetailId, setDetailId] = useState('');
  const [type, setType] = useState();
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const showModal = (id, paramType) => {
    setDetailId(id);
    setType(paramType);
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
    setType('');
  };

  return (
    <Modal
      title={type === '1' ? '活动中心详情' : '剪影详情'}
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
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflow: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <DetailForm id={DetailId} type={type} />
      </div>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.activityCenter,
}))(DetailModal);
