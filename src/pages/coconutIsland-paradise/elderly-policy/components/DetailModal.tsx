import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DetailForm from './form/ElderlyPolicyDetailForm';

const DetailModal = ({ dispatch, detailModalVisible, loading, actionRef }) => {
  const [DetailId, setDetailId] = useState('');
  const showModal = item => {
    setDetailId(item.id);
    dispatch({
      type: 'elderlyPolicy/save',
      payload: {
        detailModalVisible: true,
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
      type: 'elderlyPolicy/save',
      payload: {
        detailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="涉老政策详情"
      centered
      width="70vw"
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
        <DetailForm id={DetailId} />
      </div>
    </Modal>
  );
};

export default connect(({ elderlyPolicy, loading }) => ({
  detailModalVisible: elderlyPolicy.detailModalVisible,
  loading: loading.models.elderlyPolicy,
}))(DetailModal);