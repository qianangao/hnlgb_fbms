import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import Detail from './form/Detail';

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
    setDetailModalVisible(false);
  };

  return (
    <Modal
      title="经验介绍详情"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
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
        <Detail id={detailId} />
      </div>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.oaExperienceIntroduction,
}))(DetailModal);
