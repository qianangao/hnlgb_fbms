import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DetailForm from './form/WorksCornerDetailForm';

const DetailModal = ({ loading, actionRef, dispatch }) => {
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
    dispatch({
      type: 'worksCorner/save',
      payload: {
        detailWorksCornerData: {},
      },
    });
  };

  return (
    <Modal
      title="作品园地详情"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={detailModalVisible}
      destroyOnClose
      footer={null}
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

export default connect(({ loading }) => ({
  loading: loading.models.worksCorner,
}))(DetailModal);
