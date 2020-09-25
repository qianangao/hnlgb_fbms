import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import Detail from './form/Detail';

const DetailModal = ({ dispatch, detailModalVisible, loading, actionRef }) => {
  const [detailId, setDetailId] = useState('');
  const showModal = item => {
    setDetailId(item.id);
    dispatch({
      type: 'oaExperienceIntroduction/save',
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
      type: 'oaExperienceIntroduction/save',
      payload: {
        detailModalVisible: false,
      },
    });
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

export default connect(({ oaExperienceIntroduction, loading }) => ({
  detailModalVisible: oaExperienceIntroduction.detailModalVisible,
  loading: loading.models.oaExperienceIntroduction,
}))(DetailModal);
