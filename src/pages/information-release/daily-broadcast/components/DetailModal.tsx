import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DetailForm from './form/DetailForm';

const DetailModal = ({ dispatch, detailModalVisible, loading, actionRef }) => {
  const [DetailId, setDetailId] = useState('');
  const showModal = item => {
    setDetailId(item.id);
    dispatch({
      type: 'dailyBroadcast/save',
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
      type: 'dailyBroadcast/save',
      payload: {
        detailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="每日播报详情"
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
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <DetailForm id={DetailId} />
      </div>
    </Modal>
  );
};

export default connect(({ dailyBroadcast, loading }) => ({
  detailModalVisible: dailyBroadcast.detailModalVisible,
  loading: loading.models.dailyBroadcast,
}))(DetailModal);