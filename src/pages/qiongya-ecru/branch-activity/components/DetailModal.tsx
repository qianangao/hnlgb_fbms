import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DetailForm from './form/DetailForm';

const DetailModal = ({ dispatch, detailModalVisible, loading, actionRef }) => {
  const [item, setItem] = useState('');
  const showModal = items => {
    setItem(items);
    dispatch({
      type: 'branchActivity/save',
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
      type: 'branchActivity/save',
      payload: {
        detailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="查看支部活动"
      centered
      width="95vw"
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
        <DetailForm item={item} />
      </div>
    </Modal>
  );
};

export default connect(({ branchActivity, loading }) => ({
  detailModalVisible: branchActivity.detailModalVisible,
  loading: loading.models.branchActivity,
}))(DetailModal);
