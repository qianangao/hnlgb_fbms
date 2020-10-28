import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DetailFormPage from '@/components/DetailFormPage';

const TrendsDetailModal = ({ dispatch, trendsDetailData, actionRef, loading }) => {
  const [trendsId, setTrendsId] = useState('');
  const [trendsDetailModalVisible, setTrendsDetailModalVisible] = useState(false);
  const showModal = id => {
    setTrendsId(id);
    setTrendsDetailModalVisible(true);
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
    setTrendsDetailModalVisible(false);
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
      confirmLoading={loading}
      footer={[]}
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
  trendsDetailData: oaCaresNext.trendsDetailData,
  loading: loading.effects['oaCaresNext/getTrendsDetail'],
}))(TrendsDetailModal);
