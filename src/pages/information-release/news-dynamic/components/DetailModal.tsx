import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DetailForm from './form/DetailForm';

const DetailModal = ({ dispatch, detailModalVisible, loading, actionRef }) => {
  const [DetailId, setDetailId] = useState('');
  const showModal = item => {
    setDetailId(item.id);
    dispatch({
      type: 'newsDynamic/save',
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
      type: 'newsDynamic/save',
      payload: {
        detailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="新闻动态详情"
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

export default connect(({ newsDynamic, loading }) => ({
  detailModalVisible: newsDynamic.detailModalVisible,
  loading: loading.models.newsDynamic,
}))(DetailModal);
