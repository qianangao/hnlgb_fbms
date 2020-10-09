import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import Detail from './form/Detail';

const DetailModal = ({ dispatch, detailModalVisible, loading, actionRef, deedsType }) => {
  const [detailId, setDetailId] = useState('');
  const showModal = item => {
    setDetailId(item.id);
    dispatch({
      type: 'oaVolunteerTeam/save',
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
      type: 'oaVolunteerTeam/save',
      payload: {
        detailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title={deedsType === 'personal' ? '基本志愿服务详情' : '专项志愿服务详情'}
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

export default connect(({ oaVolunteerTeam, loading }) => ({
  detailModalVisible: oaVolunteerTeam.detailModalVisible,
  loading: loading.models.oaVolunteerTeam,
}))(DetailModal);
