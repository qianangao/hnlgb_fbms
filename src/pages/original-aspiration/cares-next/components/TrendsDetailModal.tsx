import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import DetailFormPage from '@/components/DetailFormPage';

const TrendsDetailModal = ({ dispatch, trendsDetailModalVisible, trendsDetailData, actionRef }) => {
  const [trendsId, setTrendsId] = useState('');
  const showModal = id => {
    setTrendsId(id);
    dispatch({
      type: 'oaCaresNext/save',
      payload: {
        trendsDetailModalVisible: true,
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

    if (trendsId) {
      dispatch({
        type: 'oaCaresNext/getTrendsDetail',
        payload: { id: trendsId },
      });
    }
  }, [trendsId]);

  const hideModal = () => {
    dispatch({
      type: 'oaCaresNext/save',
      payload: {
        trendsDetailModalVisible: false,
      },
    });
  };

  return (
    <Modal
      title="关工动态详情"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={trendsDetailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          确认
        </Button>,
      ]}
    >
      <DetailFormPage
        title={trendsDetailData.theme}
        orgName={trendsDetailData.organizationName}
        releaseTime={trendsDetailData.createTime}
        content={trendsDetailData.content}
      />
    </Modal>
  );
};

export default connect(({ oaCaresNext, loading }) => ({
  trendsDetailModalVisible: oaCaresNext.trendsDetailModalVisible,
  trendsDetailData: oaCaresNext.trendsDetailData,
  loading: loading.models.oaCaresNext,
}))(TrendsDetailModal);
