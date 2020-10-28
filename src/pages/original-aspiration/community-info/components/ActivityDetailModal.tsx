import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DetailFormPage from '@/components/DetailFormPage';

const ActivityDetailModal = ({ dispatch, activityDetailData, actionRef }) => {
  const [activityId, setActivityId] = useState('');
  const [activityDetailModalVisible, setActivityDetailModalVisible] = useState(false);
  const showModal = id => {
    setActivityId(id);
    setActivityDetailModalVisible(true);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }
    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }

    if (activityId) {
      dispatch({
        type: 'oaCommunity/getActivityDetail',
        payload: { id: activityId },
      });
    }
  }, [activityId]);

  const hideModal = () => {
    setActivityDetailModalVisible(false);
  };

  return (
    <Modal
      title="活动详情"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={activityDetailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[]}
    >
      <DetailFormPage
        title={activityDetailData.theme}
        orgName={activityDetailData.organizationName}
        releaseTime={activityDetailData.createTime}
        content={activityDetailData.content}
      />
    </Modal>
  );
};

export default connect(({ oaCommunity, loading }) => ({
  activityDetailData: oaCommunity.activityDetailData,
  loading: loading.models.oaCommunity,
}))(ActivityDetailModal);
