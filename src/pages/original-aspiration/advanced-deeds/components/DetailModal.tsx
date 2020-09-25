import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import Detail from './form/Detail';

const DetailModal = ({ dispatch, detailModalVisible, loading, actionRef, deedsType }) => {
  const [detailId, setDetailId] = useState('');
  const showModal = item => {
    setDetailId(item.id);
    dispatch({
      type: 'oaAdvancedDeeds/save',
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
      type: 'oaAdvancedDeeds/save',
      payload: {
        detailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title={deedsType === 'personal' ? '个人先进事迹详情' : '集体先进事迹详情'}
      centered
      destroyOnClose
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
        <Detail id={detailId} deedsType={deedsType} />
      </div>
    </Modal>
  );
};

export default connect(({ oaAdvancedDeeds, loading }) => ({
  detailModalVisible: oaAdvancedDeeds.detailModalVisible,
  loading: loading.models.oaAdvancedDeeds,
}))(DetailModal);
